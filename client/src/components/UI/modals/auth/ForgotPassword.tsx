import React, { useEffect, useReducer, useRef } from "react";

import axiosInstance from "@/utils/axios";

import useAuthModal from '@/hooks/useAuthModal';

import LoadingButton from "../../buttons/LoadingButton";
import InputField from "@/components/UI/form/InputField";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const emailEmptyMsg = "Email is missing.";
const emailInvalidMsg = "Enter a valid email address.";
const invalidCredMsg = "Email is not associated with any user.";
const serverErrorMSg = "Something went wrong.";

interface FormData {
    email: string
}

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
    formData: FormData,
    errors:{
        email: string;
        operationError: string,
    },
    btnLoading: boolean
}

const initialState: State = {
    formData: {
        email: "",
    },
    errors: {
        email: "",
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
            return {...state, formData: {email: ""}, errors: {operationError: "", email: ""}, btnLoading: false};
        default: return state;
    }
}
const ForgotPassword = () => {

    const authModal = useAuthModal();

    const { updateAuthStore } = authModal!;

    const emailRef = useRef<HTMLInputElement>(null);

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

        const { email = '' } = state.formData;

        const fields = [
            { name: 'email', value: email, ref: emailRef },
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

        handleEmail({...state.formData});
    }

    const handleEmail = async(formData: FormData) => {

        updateAuthStore({operation: true});

        dispatch({ type: ActionEnum.btnLoading });

        try {

            const URI = `/auth/email-unique`;

            const response = await axiosInstance.post(URI, { ...formData });

            const { message } = response.data;

            message === "EMAIL_UNIQUE" && formMessenger("operationError", invalidCredMsg);
            
        } catch (error: any) {

            const { message } = (error as { response: { data: { message: string } } }).response.data;

            message === "EMAIL_EXIST" ? updateAuthStore({ switchTo: "OTP", data: {...state.formData}, mode: "RESET_PASSWORD" }) : formMessenger("operationError", serverErrorMSg);

        } finally {
            updateAuthStore({operation: false});

            dispatch({ type: ActionEnum.btnDefault });
        }
    }

    return(
        <React.Fragment>
            <div className="mb-8">
                <div className="mb-3 flex items-center space-x-2">
                    <button 
                        type="button"
                        onClick={() => updateAuthStore({switchTo: "LOGIN"})}
                        disabled={state.btnLoading}
                        className={state.btnLoading ? "cursor-not-allowed" : "cursor-pointer"}
                    >
                        <svg viewBox="0 0 32 32" width="26" height="26">
                            <path className="fill-slate-700 dark:fill-slate-300" d="M6.1 16.4c.1.1.1.2.2.3l6 6c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L9.4 17H25c.6 0 1-.4 1-1s-.4-1-1-1H9.4l4.3-4.3c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-6 6c-.1.1-.2.2-.2.3-.1.3-.1.5 0 .8z"></path>
                        </svg>
                    </button>
                    <h3 className="text-xl font-normal text-slate-700 dark:text-slate-200">Forgot your password?</h3>
                </div>
                <p className="text-sm leading-5 text-slate-600 dark:text-slate-400">No problem! Just enter the email address that you signed up with to reset it.</p>
            </div>

            {state.errors.operationError ? <p className="mb-4 py-2.5 px-4 rounded-lg text-sm text-red-700 bg-red-50 dark:text-red-300 dark:bg-red-500/10">{state.errors.operationError}</p> : null}

            <form className="mb-8 grid gap-5" onSubmit={handleSubmit}>

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
                
            </form>

            <LoadingButton 
                type={"submit"} 
                btnText={"Log In"}
                height="h-12" 
                onClick={handleSubmit} 
                loading={state.btnLoading} 
            />

        </React.Fragment>
    )
}

export default ForgotPassword;