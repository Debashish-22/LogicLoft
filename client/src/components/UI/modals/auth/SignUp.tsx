import React, { useEffect, useReducer, useRef } from "react";

import axiosInstance from "@/utils/axios";

import useAuthModal from '@/hooks/useAuthModal';

import LoadingButton from "../../buttons/LoadingButton";
import InputField from "@/components/UI/form/InputField";
import PasswordField from "@/components/UI/form/PasswordField";

const usernameMinLen = 3;
const pwdMinLen = 8;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const usernameEmptyMsg = "Username is missing";
const usernameInvalidMsg = `Username must have atleast ${usernameMinLen} characters.`;
const emailEmptyMsg = "Email is missing.";
const emailInvalidMsg = "Enter a valid email address.";
const pwdEmptyMsg = "Password is missing.";
const pwdInvalidMsg = `Password must have atleast ${pwdMinLen} characters.`;
const invalidCredMsg = "This email is taken. Please use another one.";
const serverErrorMSg = "Something went wrong.";

enum ActionEnum {
    formDataHandle = "FORM_DATA_HANDLE",
    formDataReset = "FORM_DATA_RESET",
    formErrorHandle = "FORM_ERROR_HANDLE",
    btnLoading = "BTN_LOADING",
    btnDefault = "BTN_DEFAULT",
}

interface Action {
    type: ActionEnum;
    data?: object;
}

interface State {
    formData: {
        username?: string;
        email?: string;
        password?: string;
    },
    errors:{
        username?: string;
        email?: string;
        password?: string;
        operationError?: string,
    },
    btnLoading: boolean
}

const initialState: State = {
    formData: {
        username: "",
        email: "",
        password: ""
    },
    errors: {
        username: "",
        email: "",
        password: "",
        operationError: ""
    },
    btnLoading: false
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case ActionEnum.formErrorHandle:
            if (action.data) {
                return {...state, errors: {...state.errors, ...action.data}};
            }
            return state;
        case ActionEnum.formDataHandle:
            if (action.data) {
                return {...state, formData: action.data};
            }
            return state;
        case ActionEnum.btnLoading:
            return {...state, btnLoading: true};
        case ActionEnum.btnDefault:
            return {...state, btnLoading: false};
        case ActionEnum.formDataReset:
            return {...state, formData: {username: "", email: "", password: ""}, errors: {operationError: "", username: "", email: "", password: ""}, btnLoading: false};
        default: return state;
    }
}

const SignUp = () => {

    const authModal = useAuthModal();
    
    const { username, email, password } = authModal!.authStore.data!;
    const { updateAuthStore } = authModal!;

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if(username && email && password){
            let data = {...state.formData, username, email, password};
            dispatch({type: ActionEnum.formDataHandle, data});
        } 
        else {
            formMessenger("operationError", "");       
            dispatch({type: ActionEnum.formDataReset});
        }
    }, [username, email, password]);

    const focus = (reference: React.RefObject<HTMLInputElement>) => reference.current && reference.current.focus();

    const formMessenger = (key: string, value: string) => dispatch({ type: ActionEnum.formErrorHandle, data: { [key]: value } });

    const validateField = (name: string, value: string) => {
        if(name === "username"){
            if(value.length === 0){
                return usernameEmptyMsg;
            } else if(value.length < usernameMinLen){
                return usernameInvalidMsg;
            }
        } else if(name === "email"){
            if(value.length === 0){
                return emailEmptyMsg;
            } else if(!emailRegex.test(value)){
                return emailInvalidMsg;
            }
        } else if(name === "password"){
            if(value.length === 0){
                return pwdEmptyMsg;                
            } else if(value.length < pwdMinLen){
                return pwdInvalidMsg;
            }
        }
    
        return "";
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        formMessenger("operationError", "");   

        const {name, value} = e.target;

        const updatedData = {
            ...state.formData,
            [name]: value.trim().length === 0 ? value.replace(" ", "") : value
        };

        const errorMessage = validateField(name, value);

        errorMessage ? formMessenger(name, errorMessage) : formMessenger(name, "");

        dispatch({type: ActionEnum.formDataHandle, data: updatedData});
    }

    const isEmailUnique = async(email: string) => {

        updateAuthStore({operation: true});
        
        dispatch({ type: ActionEnum.btnLoading });
    
        try {

            const URI = `/auth/email-unique`;

            const response = await axiosInstance.post(URI, { email });

            const { success } = response.data;

            success ? updateAuthStore({switchTo: "OTP", data: {...state.formData}, mode: "CREATE_ACCOUNT"}) : formMessenger("operationError", serverErrorMSg);
            
        } catch (error: any) {

            const { message } = (error as { response: { data: { message: string } } }).response.data;

            message === "EMAIL_EXIST" ? formMessenger("operationError", invalidCredMsg) : formMessenger("operationError", serverErrorMSg);

        } finally {
            updateAuthStore({ operation: false });
            dispatch({ type: ActionEnum.btnDefault });
        }
    } 

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {

        if(e)e.preventDefault();

        formMessenger("operationError", "");

        const { username = '', email = '', password = '' } = state.formData;

        const fields = [
            { name: 'username', value: username, ref: usernameRef },
            { name: 'email', value: email, ref: emailRef },
            { name: 'password', value: password, ref: passwordRef }
        ];

        for (let field of fields) {
            const errorMessage = validateField(field.name, field.value);
            if(errorMessage){
                formMessenger(field.name, errorMessage);
                focus(field.ref);
                return;
            } else {
                formMessenger(field.name, "");
            }
        }

        const stateEmail = state.formData.email;

        if(stateEmail) isEmailUnique(stateEmail);
    }

    return(
        <React.Fragment>
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-2">
                    <h3 className="text-2xl font-normal text-slate-700 dark:text-slate-200">Create an account</h3>
                </div>
                <div className="flex space-x-2 text-xs text-slate-500 dark:text-slate-400">
                    <p>Already have an account?</p> 
                    <button 
                        disabled={state.btnLoading}
                        onClick={() => state.btnLoading ? null : authModal?.updateAuthStore({switchTo: "LOGIN", data: {username: "", email: "", password: ""}})} 
                        className={state.btnLoading ? "cursor-not-allowed" : "cursor-pointer"}
                    >
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Log In</span>
                    </button>
                </div>
            </div>

            {state.errors.operationError ? <p className="mb-4 py-2.5 px-4 rounded-lg text-sm text-red-700 bg-red-50 dark:text-red-300 dark:bg-red-500/10">{state.errors.operationError}</p> : null}

            <form className="grid gap-5" onSubmit={handleSubmit}>

                <InputField
                    name={"username"} 
                    title={"Username"}
                    ref={usernameRef} 
                    onChange={handleChange} 
                    placeholder={"john"} 
                    disabled={state.btnLoading}
                    value={state.formData.username || ""}
                    message={state.errors.username}
                />

                <InputField
                    type="email"
                    name={"email"} 
                    title={"Email"}
                    ref={emailRef} 
                    onChange={handleChange} 
                    placeholder={"john@example.com"} 
                    disabled={state.btnLoading}
                    value={state.formData.email || ""}
                    message={state.errors.email}
                />

                <PasswordField 
                    name={"password"} 
                    title={"Password"}
                    ref={passwordRef} 
                    onChange={handleChange} 
                    placeholder={"•••••••••"} 
                    disabled={state.btnLoading}
                    value={state.formData.password || ""}
                    message={state.errors.password} 
                />

                <LoadingButton 
                    type={"submit"} 
                    btnText={"Create account"}
                    height="h-12" 
                    onClick={handleSubmit} 
                    loading={state.btnLoading} 
                />
                
            </form>

        </React.Fragment>
    )
}

export default SignUp;