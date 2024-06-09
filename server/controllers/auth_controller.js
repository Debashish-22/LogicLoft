const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');

const User = require("../models/user_model");
const Session = require("../models/session_model");

const genRandomString = require("../utils/gen_random_string");

const { OAuth2Client } = require('google-auth-library');

const { otpVerify } = require('./otp_controller'); 

const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_AUTH_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET, 
    process.env.GOOGLE_OAUTH_REDIRECT, 
);

const { saltRounds, emailRegex, usernameMinLen, pwdMinLen } = require("../config/validation");

const SESSION_TIME = 24 * 60 * 60 * 1000;

const isUserExist = async(email) => {

    const user = await User.findOne({ email });

    return user;
}

const emailUnique = async (req, res) => {
    try {

        const { email } = req.body;

        if(!email || !emailRegex.test(email)){
            return res.status(400).json({ success: false, message: 'INVALID_BODY' });
        }

        const userExist = await isUserExist(email);

        if(userExist){
            return res.status(409).json({ success: false, message: 'EMAIL_EXIST' });
        }

        return res.status(200).json({ success: true, message: 'EMAIL_UNIQUE' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const createUser = async ({ username, email, password, authMode }) => {

    // for social auth we will generate a password
    if(!password){
        password = genRandomString(12);
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        authMode
    });

    return user;
}

const localSignup = async(req, res) => {

    try {

        const { username, email, password, otpCode } = req.body;
    
        if(!otpCode || !username || username.trim().length < usernameMinLen || !email || !emailRegex.test(email) || !password || password.trim().length < pwdMinLen){
            return res.status(400).json({ success: false, message: 'INVALID_BODY' });
        }
    
        const userExist = await isUserExist(email);
    
        if(userExist) return res.status(409).json({ success: false, message: 'USER_EXIST' });

        const emailVerified = await otpVerify(email, otpCode);

        if(!emailVerified) return res.status(409).json({ success: false, message: 'VERIFICATION_FAILED' });
    
        const user = await createUser({
            username,
            email,
            password,
            authMode: "LOCAL"
        });
    
        if(!user){
            return res.status(500).json({ success: false, message: 'SOMETHING_WENT_WRONG' });
        }
    
        return res.status(200).json({ success: true, message: 'USER_CREATED' });
        
    } catch (error) {

        return res.status(500).json({ success: false, message: error.message });
    }
}

const initiateSession = async({ userId, screenLimit, platform }) => {
    
    try {
        
        if(!userId || !screenLimit) return null;

        const sessions = await Session.find({ userId });

        if(sessions.length === screenLimit){

            const oldestSession = await Session.find({ userId }).sort({ login : 1 }).limit(1);
           
            const deleteOldestSession = await Session.findByIdAndDelete(oldestSession[0].id);
           
            if(!deleteOldestSession) return null;
        }

        const session = await Session.create({
            userId,
            deviceId: uuidv4(),
            platform: JSON.stringify(platform),
            login: Date.now()
        })

        if(!session) return null;

        const updateUser = await User.findByIdAndUpdate(userId,{
            $set:{
                "lastSession.login": session.login,
                "lastSession.platform": JSON.stringify(session.platform)
            }
        });

        if(!updateUser) return null;

        const encryptedSessionId = CryptoJS.AES.encrypt(session.id, process.env.SESSION_SECRET_KEY).toString();

        const token = jwt.sign({ APSID: encryptedSessionId }, process.env.JWT_SECRET_KEY, { expiresIn: SESSION_TIME });

        return { sessionId: encryptedSessionId, deviceId: session.deviceId, token };
        
    } catch (error) {
        return null;
    }
}

const login = async(req, res) => {
    try {

        const { email, password, platform } = req.body;

        if(!email || !emailRegex.test(email) || !password || password.trim().length < pwdMinLen){
            return res.status(400).json({ success: false, message: 'INVALID_BODY' });
        }

        const user = await User.findOne({ email });

        if(!user) return res.status(409).json({ success: false, message: "INVALID_CREDENTIALS" });
        
        if(!user.activeStatus) return res.status(409).json({ success: false, message: "INACTIVE" });
        
        const match = await bcrypt.compare(password, user.password);

        if(!match) return res.status(409).json({ success: false, message: "INVALID_CREDENTIALS" });
        
        const { sessionId, deviceId, token } = await initiateSession({
            userId: user.id,
            screenLimit: user.screenLimit,
            platform
        });

        if(!sessionId || !deviceId || !token) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        return res.status(200).json({ success: true, message: 'USER_LOGGED_IN', data: { token, deviceId }});

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const googleLogin = async(req, res) => {
    try {

        const { code, state } = req.query;

        const payloadData = await JSON.parse(decodeURIComponent(state));

        let { platform, reqOrigin } = {...payloadData};

        reqOrigin = reqOrigin || process.env.CLIENT_URI;

        if(!code) return res.redirect(reqOrigin);

        const { tokens } = await oAuth2Client.getToken(code);

        const idToken = tokens["id_token"];
    
        const ticket = await oAuth2Client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_AUTH_CLIENT_ID
        });

        const { email, email_verified, name } = ticket.payload;

        if(!email_verified) return res.redirect(reqOrigin);

        const user = await User.findOne({ email });

        let userId;
        let screenLimit;

        if(!user){

            const newUser = await createUser({
                username: name,
                email,
                authMode: "GOOGLE"
            });

            if(!newUser) return res.redirect(reqOrigin);

            userId = newUser.id;
            screenLimit = newUser.screenLimit;

        } else {

            if(!user.activeStatus) return res.redirect(reqOrigin);

            userId = user.id;
            screenLimit = user.screenLimit;
        }

        const { sessionId, deviceId, token } = await initiateSession({
            userId,
            screenLimit,
            platform
        });

        if(!sessionId || !deviceId || !token) return res.redirect(reqOrigin);

        res.cookie(process.env.AUTH_TOKEN, token, {
            maxAge: SESSION_TIME,
            domain: 'www.logicloft.online'
        });

        res.cookie(process.env.DEVICE_TOKEN, deviceId, {
            maxAge: SESSION_TIME,
            domain: 'www.logicloft.online'
        });

        return res.redirect(reqOrigin);
        
    } catch (error) {
        return res.redirect(process.env.CLIENT_URI);
    }
}

const googleOneTap = async(req, res) => {

    try {

        const { credential, platform } = req.body;

        if(!credential) return res.status(400).json({ success: false, message: "CREDENTIAL_MISSING" });

        // unicode text JWT parser
        const ticket = JSON.parse(Buffer.from(credential.split('.')[1], 'base64').toString());

        const { email, email_verified, name } = ticket;

        if(!email_verified) return res.status(409).json({ success: false, message: "EMAIL_UN_VERIFIED" });

        const user = await User.findOne({email});

        let userId;
        let screenLimit;
        
        if(!user){

            const newUser = await createUser({
                username: name,
                email,
                authMode: "GOOGLE"
            });

            if(!newUser) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

            userId = newUser.id;
            screenLimit = newUser.screenLimit;

        } else {

            if(!user.activeStatus) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

            userId = user.id;
            screenLimit = user.screenLimit;
        }

        const { sessionId, deviceId, token } = await initiateSession({
            userId,
            screenLimit,
            platform
        });

        if(!sessionId || !deviceId || !token) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        return res.status(200).json({ success: true, message: 'USER_LOGGED_IN', data: { token, deviceId }});
        
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const logout = async(req, res) => {
    try {

        const { sessionId } = req;

        const deleteSession = await Session.findByIdAndDelete(sessionId);
        
        if(!deleteSession) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        res.status(200).json({ success: true, message: 'LOGGED_OUT' });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const resetPassword = async(req, res) => {
    try {
 
        const { email, newPassword, otpCode } = req.body;

        if(!email || !newPassword || !otpCode) return res.status(400).json({ success: false, message: 'INVALID_BODY' });

        const emailVerified = await otpVerify(email, otpCode);

        if(!emailVerified) return res.status(409).json({ success: false, message: 'VERIFICATION_FAILED' });

        const user = await User.findOne({ email });

        if(!user) return res.status(409).json({ success: false, message: "INVALID_CREDENTIALS" });

        if(!user.activeStatus) return res.status(409).json({ success: false, message: "INACTIVE" });

        const match = await bcrypt.compare(newPassword, user.password);

        if(match) return res.status(409).json({success: false, message: "PASSWORD_SAME_AS_PREVIOUS" });

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        const updatePassword = await User.findByIdAndUpdate(user.id, { password: hashedPassword });

        if(!updatePassword) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });

        const revokeAllSessions = await Session.deleteMany({ userId: user.id });

        if(!revokeAllSessions) return res.status(500).json({ success: false, message: "SOMETHING_WENT_WRONG" });
        
        res.status(200).json({ success: true, message: 'PASSWORD_UPDATED'});

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

const authUser = async(req, res) => {
    try {

        const { userId } = req;

        if(!userId) return res.status(400).json({ success: false, message: "CREDENTIALS_MISSING" });
        
        const fetchedUser = await User.findById(userId).populate("userAvatar");

        if(!fetchedUser) return res.status(404).json({ success: false, message: "USER_NOT_FOUND" });
        
        const userAvatar = fetchedUser.userAvatar;

        const { username, email, accountType, designation, city, state, country } = fetchedUser;

        const user = {
            username,
            email,
            userAvatar,
            accountType,
            designation, 
            city,
            state, 
            country
        }        

        res.status(200).json({ success: true, message: 'FETCHED', user });

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = {
    emailUnique,
    localSignup,
    login,
    resetPassword,
    logout,
    authUser,
    googleLogin,
    googleOneTap
}