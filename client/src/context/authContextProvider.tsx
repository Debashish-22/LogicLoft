"use client";

import React, { useState, useEffect, createContext, useCallback } from "react";
import { serialize } from 'cookie';
import platform from "platform";

import axiosInstance, { setAuthUpdateCallback } from "@/utils/axios";

import useToast from "@/hooks/useToast";
import useModal from "@/hooks/useModal";

import { ToastType } from "./toastContextProvider";
import { useRouter } from "next/navigation";

const SESSION_TIME = 24 * 60 * 60 * 1000;

interface User {
    user: {
        username?: string,
        email?: string,
        userAvatar?: {
            _id: string,
            src: string
        },
        accountType?: string,
        designation?: string, 
        city?: string,
        state?: string, 
        country?: string
    }
    authenticated: boolean
}

interface LoginForm {
    email: string,
    password: string
}

interface AuthContext extends User{ 
    logIn: (formData: LoginForm) => void
    logout: () => void
    googleLogin: () => void
    fetchUser: () => void
    resetAuth: () => void
}

const defaultUserData = { 
    username: "",
    email: "",
    userAvatar: {
        _id: "",
        src: ""
    },
    accountType: "",
    designation: "", 
    city: "",
    state: "", 
    country: ""
}

const AuthContext = createContext<AuthContext>({
    user: defaultUserData,
    authenticated: false,
    logIn: () => {},
    logout: () => {},
    googleLogin: () => {},
    fetchUser: () => {},
    resetAuth: () => {}
});

interface AuthProvider{
    children: React.ReactNode
}

const AuthProvider = ({ children }: AuthProvider) => {

    const router = useRouter();

    const modal = useModal()

    const toast = useToast();

    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState({});

    const [authenticated, setAuthenticated] = useState(false);

    const fetchUser = useCallback(async () => {
        setLoading(true);

        try {
            let newState = { ...defaultUserData };
            const URI = `/auth/auth-user`;
            const response = await axiosInstance.get(URI);
            const { success } = await response.data;
            setAuthenticated(success);

            if (success) {
                const { user } = await response.data;
                newState = { ...user };
            }

            setUser(prevUser => ({ ...prevUser, ...newState }));
        } catch (error) {
            setUser({ ...defaultUserData });
            setAuthenticated(false);
            toast.renderToast("Internal Server Error", ToastType.Error);
        } finally {
            setLoading(false);
        }

    }, []);

    useEffect(() =>{ fetchUser() }, []);

    const logIn = async(formData: LoginForm) => {

        try {
            const URI = `/auth/login`;

            const response = await axiosInstance.post(URI, { ...formData, platform });

            const { success } = response.data;

            if(success){

                modal.closeModal();

                const { token, deviceId }  = response.data.data;
            
                document.cookie = serialize(process.env.AUTH_TOKEN!, token, { maxAge: SESSION_TIME });

                document.cookie = serialize(process.env.DEVICE_TOKEN!, deviceId, { maxAge: SESSION_TIME });

                await fetchUser();

                toast.renderToast("Logged In Successfully", ToastType.Success);
            }
            
            return response;

        } catch (error: any) {

            return error.response;
        }
    }

    const resetAuth = () => {

        router.push("/");

        let newState = {...defaultUserData};

        setAuthenticated(false);
                
        setUser(prevUser => ({...prevUser, ...newState}));

        document.cookie = serialize(process.env.AUTH_TOKEN!, "", { maxAge: 0 });
        document.cookie = serialize(process.env.DEVICE_TOKEN!, "", { maxAge: 0 });
    }

    const logout = async() => {

        try {
            
            const URI = `/auth/logout`;
    
            const response = await axiosInstance.post(URI);

            const { success } = response.data;

            if(success){
            
                document.cookie = serialize(process.env.AUTH_TOKEN!, "", { maxAge: 0 });
                document.cookie = serialize(process.env.DEVICE_TOKEN!, "", { maxAge: 0 });

                router.push("/");

                await fetchUser();
    
                toast.renderToast("Logged Out Successfully", ToastType.Success);
            } else {

                toast.renderToast("Something went wrong", ToastType.Error);
            }

        } catch (error) {
            toast.renderToast("Internal Server Error", ToastType.Error);
        }
    }

    const googleLogin = () => {

        const payload = JSON.stringify({ 
            platform,
            reqOrigin: window.location.href
        });

        const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
        const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT;
        const responseType = 'code';
        const scopes = 'openid email profile';

        const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scopes}&state=${encodeURIComponent(payload)}`;
            
        window.location.href = googleAuthUrl;
    }

    setAuthUpdateCallback(resetAuth);
    
    return(
        <AuthContext.Provider value={{authenticated, user, logIn, logout, googleLogin, fetchUser, resetAuth}}>
            { 
                loading 
                ? 
                <div className={`min-h-screen w-screen fixed top-0 left-0 z-40 flex justify-center items-center bg-slate-900`}>
                    <p className="text-white">Loading...</p>
                </div>
                : 
                children
            }
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider,
};

export type { User, LoginForm };