import React, { useEffect, useReducer, useRef } from "react";

import useAuth from '@/hooks/useAuth';
import useAuthModal from '@/hooks/useAuthModal';

import { LoginForm } from "@/context/authContextProvider";

import LoadingButton from "../../buttons/LoadingButton";
import PasswordField from "@/components/UI/form/PasswordField";
import InputField from "@/components/UI/form/InputField";

const pwdMinLen = 8;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emailEmptyMsg = "Email is missing.";
const emailInvalidMsg = "Enter a valid email address.";
const pwdEmptyMsg = "Password is missing.";
const pwdInvalidMsg = `Password must have atleast ${pwdMinLen} characters.`;
const invalidCredMsg = "Incorrect Email or Password.";
const serverErrorMSg = "Something went wrong.";
const inactiveMsg = "Your account is inactive."

enum ActionEnum {
    formDataHandle = "FORM_DATA_HANDLE",
    formDataReset = "FORM_DATA_RESET",
    formErrorHandle = "FORM_ERROR_HANDLE",
    btnLoading = "BTN_LOADING",
    btnDefault = "BTN_DEFAULT"
}

interface Action {
    type: ActionEnum;
    data?: object;
}

interface State {
    formData: LoginForm
    errors:{
        email: string;
        password: string;
        operationError: string,
    },
    btnLoading: boolean
}

const initialState: State = {
    formData: {
        email: "",
        password: ""
    },
    errors: {
        email: "",
        password: "",
        operationError: ""
    },
    btnLoading: false
}

const reducer = (state: State, action: Action): any => {
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
            return {...state, formData: {email: "", password: ""}, errors: {operationError: "", email: "", password: ""}, btnLoading: false};
        default: return state;
    }
}

const Login = () => {

    const auth = useAuth();
    const authModal = useAuthModal();

    const { updateAuthStore } = authModal!;

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {dispatch({type: ActionEnum.formDataReset})}, []);

    const focus = (reference: React.RefObject<HTMLInputElement>) => reference.current && reference.current.focus();

    const formMessenger = (key: string, value: string) => dispatch({ type: ActionEnum.formErrorHandle, data: { [key]: value } });

    const validateField = (name: string, value: string) => {
        if(name === "email"){
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

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {

        if(e)e.preventDefault();

        formMessenger("operationError", "");

        const { email = '', password = '' } = state.formData;

        const fields = [
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

        handleLogin({...state.formData});
    }

    const handleLogin = async(formData: LoginForm) => {

        updateAuthStore({operation: true});

        dispatch({ type: ActionEnum.btnLoading });

        try {

            const response = await auth.logIn(formData)! as { data: { success: boolean, message: string }};   

            const { success, message } = response.data;

            if(!success){

                switch (message) {
                    case "INVALID_CREDENTIALS":
                        formMessenger("operationError", invalidCredMsg);
                        break;
                    case "INACTIVE":
                        formMessenger("operationError", inactiveMsg);
                        break;
                    default:
                        formMessenger("operationError", serverErrorMSg);
                        break;
                }
            }

        } catch (error) {
            
            formMessenger("operationError", serverErrorMSg);            

        } finally {
            updateAuthStore({operation: false});

            dispatch({ type: ActionEnum.btnDefault });
        }
    }

    return(
        <React.Fragment>
            <div className="mb-8">
                <div className="mb-2 flex items-center space-x-2">
                    <button 
                        type="button"
                        onClick={() => updateAuthStore({switchTo: ""})}
                        disabled={state.btnLoading}
                        className={state.btnLoading ? "cursor-not-allowed" : "cursor-pointer"}
                    >
                        <svg viewBox="0 0 32 32" width="26" height="26">
                            <path className="fill-slate-700 dark:fill-slate-300" d="M6.1 16.4c.1.1.1.2.2.3l6 6c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L9.4 17H25c.6 0 1-.4 1-1s-.4-1-1-1H9.4l4.3-4.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-6 6c-.1.1-.2.2-.2.3-.1.3-.1.5 0 .8z"></path>
                        </svg>
                    </button>
                    <h3 className="text-2xl font-normal text-slate-700 dark:text-slate-200">Log In</h3>
                </div>
                <div className="flex space-x-2 text-xs text-slate-500 dark:text-slate-400">
                    <p>New to App?</p> 
                    <button 
                        type="button"
                        onClick={() => updateAuthStore({switchTo: "SIGNUP", data: {username: "", email: "", password: ""}})} 
                        disabled={state.btnLoading}
                        className={state.btnLoading ? "cursor-not-allowed" : "cursor-pointer"}
                    >
                        <span className="font-semibold text-blue-600 dark:text-blue-400">Create an account</span>
                    </button>
                </div>
            </div>

            {state.errors.operationError ? <p className="mb-4 py-2.5 px-4 rounded-lg text-sm text-red-700 bg-red-50 dark:text-red-300 dark:bg-red-500/10">{state.errors.operationError}</p> : null}

            <form className="grid gap-5" onSubmit={handleSubmit}>

                <InputField
                    type="email"
                    name={"email"} 
                    title={"Email"}
                    ref={emailRef} 
                    onChange={handleChange} 
                    placeholder={"john@example.com"} 
                    disabled={state.btnLoading}
                    value={state.formData.email}
                    message={state.errors.email}
                />

                <PasswordField 
                    name={"password"} 
                    title={"Password"}
                    ref={passwordRef} 
                    onChange={handleChange} 
                    placeholder={"•••••••••"} 
                    disabled={state.btnLoading}
                    value={state.formData.password}
                    message={state.errors.password} 
                >
                    <button 
                        type="button" 
                        onClick={() => updateAuthStore({switchTo: "FORGOT_PASSWORD"})} 
                        disabled={state.btnLoading}
                        className={`${state.btnLoading ? "cursor-not-allowed" : "cursor-pointer"} mt-3.5 ml-auto block w-fit`}
                    >
                        <span className="text-xs text-blue-600 dark:text-blue-400">Forgot your password?</span>
                    </button>
                </PasswordField>

                <LoadingButton 
                    type={"submit"} 
                    btnText={"Log In"}
                    height="h-12" 
                    onClick={handleSubmit} 
                    loading={state.btnLoading} 
                />
            </form>

        </React.Fragment>
    )
}

export default Login;