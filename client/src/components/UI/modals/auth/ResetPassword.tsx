import React, { useEffect, useReducer, useRef } from "react";

import axiosInstance from "@/utils/axios";

import useAuthModal from '@/hooks/useAuthModal';
import useToast from "@/hooks/useToast";
import { ToastType } from "@/context/toastContextProvider";

import LoadingButton from "../../buttons/LoadingButton";
import PasswordField from "@/components/UI/form/PasswordField";

const pwdMinLen = 8;

const pwdEmptyMsg = "Password is missing.";
const pwdInvalidMsg = `Password must have atleast ${pwdMinLen} characters.`;
const confPwdInvalidMsg = "Password and Confirm password must be same.";
const invalidCredMsg = "New password can't be same as previous one.";
const serverErrorMSg = "Something went wrong.";
const successMsg = "Password Reset Succesfully";

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

interface FormData {
    email: string;
    newPassword: string;
    confPassword: string;
}

interface State {
    formData: FormData,
    errors:{
        newPassword: string;
        confPassword: string,
        operationError: string,
    },
    btnLoading: boolean
}

const initialState: State = {
    formData: {
        email: "",
        newPassword: "",
        confPassword: ""
    },
    errors: {
        newPassword: "",
        confPassword: "",
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
            return {...state, formData: {email: "", newPassword: "", confPassword: ""}, errors: {operationError: "", password: "", confPassword: ""}, btnLoading: false};
        default: return state;
    }
}

const ResetPassword = () => {

    const toast = useToast();
    const authModal = useAuthModal();

    const { updateAuthStore } = authModal!;

    const { email, otpCode } = authModal!.authStore.data!;

    const newPasswordRef = useRef<HTMLInputElement>(null);
    const confPasswordRef = useRef<HTMLInputElement>(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (email) {
            let data = { ...state.formData, email };
            dispatch({ type: ActionEnum.formDataHandle, data });
        }
    }, [email]);
    
    useEffect(() => {
        if (!email) {
            formMessenger("operationError", "");
            dispatch({ type: ActionEnum.formDataReset });
        }
    }, [email]);    

    const focus = (reference: React.RefObject<HTMLInputElement>) => reference.current && reference.current.focus();

    const formMessenger = (key: string, value: string) => dispatch({ type: ActionEnum.formErrorHandle, data: { [key]: value } });

    const handleFocus = () => state.formData.newPassword.trim().length < pwdMinLen && newPasswordRef.current!.focus();

    const validateField = (name: string, value: string) => {

        if(name === "newPassword"){
            if(value.length === 0){
                return pwdEmptyMsg;                
            } else if(value.length < pwdMinLen){
                return pwdInvalidMsg;
            }
        } else if(name === "confPassword") {

            if(state.formData.newPassword !== value){
                return confPwdInvalidMsg;
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

        const { newPassword = '', confPassword = '' } = state.formData;

        const fields = [
            { name: 'newPassword', value: newPassword, ref: newPasswordRef },
            { name: 'confPassword', value: confPassword, ref: confPasswordRef },
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

        resetPassword();
    }

    const resetPassword = async() => {

        updateAuthStore({operation: true});

        dispatch({ type: ActionEnum.btnLoading });

        try {

            const { email, newPassword } = state.formData;

            const URI = `/auth/reset-password`;
    
            const response = await axiosInstance.post(URI, { email, newPassword, otpCode });

            const { success } = response.data;

            success ? toast.renderToast(successMsg, ToastType.Success) : toast.renderToast(serverErrorMSg, ToastType.Error);

            updateAuthStore({ switchTo: "LOGIN" });
            
        } catch (error: any) {

            const { message } = (error as { response: { data: { message: string } } }).response.data;

            message === "PASSWORD_SAME_AS_PREVIOUS" ? formMessenger("operationError", invalidCredMsg) : formMessenger("operationError", serverErrorMSg);
        }
        finally{

            updateAuthStore({operation: false});

            dispatch({ type: ActionEnum.btnDefault });
        }
    }

    return(
        <React.Fragment>
            <div className="mb-8">     
                <h3 className="text-xl text-slate-900 dark:text-slate-100">Reset your Password</h3>
                <p className="text-sm leading-5 text-slate-400 dark:text-slate-300"></p>
            </div>

            {state.errors.operationError ? <p className="mb-4 py-2.5 px-4 rounded-lg text-sm text-red-700 bg-red-50 dark:text-red-300 dark:bg-red-500/10">{state.errors.operationError}</p> : null}

            <form className="grid gap-5" onSubmit={handleSubmit}>

                <PasswordField 
                    name={"newPassword"} 
                    title={"New Password"}
                    ref={newPasswordRef} 
                    onChange={handleChange} 
                    placeholder={"•••••••••"} 
                    disabled={state.btnLoading}
                    value={state.formData.newPassword}
                    message={state.errors.newPassword} 
                />

                <PasswordField 
                    name={"confPassword"} 
                    title={"Confirm New Password"}
                    ref={confPasswordRef} 
                    onChange={handleChange} 
                    onFocus={handleFocus}
                    placeholder={"•••••••••"} 
                    disabled={state.btnLoading}
                    value={state.formData.confPassword}
                    message={state.errors.confPassword} 
                />

                <LoadingButton 
                    type={"submit"} 
                    btnText={"Reset Password"}
                    height="h-12" 
                    onClick={handleSubmit} 
                    loading={state.btnLoading} 
                />

            </form>
            
        </React.Fragment>
    )
}

export default ResetPassword;