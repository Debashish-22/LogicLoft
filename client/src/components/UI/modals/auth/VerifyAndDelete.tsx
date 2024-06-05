import React, { useEffect, useRef, useReducer, useCallback } from "react";
import { useRouter } from 'next/navigation';

import axiosInstance from "@/utils/axios";

import useAuth from '@/hooks/useAuth'
import useToast from '@/hooks/useToast';
import { ToastType } from '@/context/toastContextProvider';

import LoadingButton from "../../buttons/LoadingButton";

const otpLength = 4;
const otpRegex = /[^0-9]/g;

const inValidOtpMsg = "Please enter a valid verification code.";
const submitErrorMsg = "The OTP you entered is invalid. Please enter the correct OTP.";
const serverErrorMsg = "Something went wrong. Please try again later.";

enum ActionEnum {
    pushDigit = "PUSH_DIGIT",
    formDataReset = "FORM_DATA_RESET",
    btnLoading = "BTN_LOADING",
    btnDefault = "BTN_DEFAULT",
    pageDefault = "PAGE_DEFAULT",
    formErrorHandle = "FORM_ERROR_HANDLE",
}

interface Action {
    type: ActionEnum;
    data?: object;
}

type Otp = Array<number>;

interface State {
    formData: {
        otp: Otp;
    },
    errors: {
        otp: string
        submissionError: string
        otpSendError: boolean
    }
    pageLoading: boolean
    btnLoading: boolean
}

const initialState: State = {
    formData: {
        otp: []
    },
    errors: {
        otp: "",
        submissionError: "",
        otpSendError: false,
    },
    pageLoading: true,
    btnLoading: false
}

const reducer = (state: State, action: Action): any => {
    switch (action.type) {
        case ActionEnum.formErrorHandle:
            return {...state, errors: {...state.errors, ...action.data}};
        case ActionEnum.pageDefault:
            return {...state, pageLoading: false};
        case ActionEnum.btnLoading:
            return {...state, btnLoading: true};
        case ActionEnum.btnDefault:
            return {...state, btnLoading: false};
        case ActionEnum.pushDigit:
            return {...state, formData: {otp: action.data}};
        case ActionEnum.formDataReset:           
            return {...state, formData: {otp: []}, errors: {otp: "", submissionError: "", otpSendError: false}, pageLoading: true, btnLoading: false};
        default: return state;
    }
}

const VerifyAndDelete = () => {

    const auth= useAuth();
    const toast = useToast();
    const router = useRouter();

    const { email } = auth.user

    const otpFieldsRef = useRef<HTMLInputElement>(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleResendOtp = () => sendOtp();

    useEffect(() => {

        if(!state.pageLoading){

            if(otpFieldsRef && otpFieldsRef.current){

                // Element.children is not an array. It is an object called an HTMLCollection. 
                // These do not have an array’s methods (though they do have the length property).
                // To loop through it, you'll have to convert it into an array, which you can do using Array.prototype.slice:
                const children = Array.prototype.slice.call(otpFieldsRef.current.children);

                children.forEach((node) => node.value = "");
    
                children[0].focus();
    
                otpFieldsRef.current.addEventListener("keyup", (e) => {
                    if(e.key === "Backspace"){

                        let values: Otp = []
                        
                        let ele = (e.target as HTMLInputElement).previousSibling;

                        if(ele)(ele as HTMLInputElement)?.focus();

                        children.forEach((node) => values.push(node.value));

                        dispatch({type: ActionEnum.pushDigit, data: values});
                    }
                })
            }
        }
    }, [state.pageLoading]);

    const formMessenger = useCallback((key: string, value: string | boolean) => {
        dispatch({ type: ActionEnum.formErrorHandle, data: { [key]: value } });
    }, [dispatch]);

    const sendOtp = useCallback(async () => {
        dispatch({type: ActionEnum.formDataReset});
        
        try {
            const URI = `/otp/send-otp`;
            const response = await axiosInstance.post(URI, { email });
            const { success } = response.data;
            success ? formMessenger("otpSendError", false) : formMessenger("otpSendError", true);
        } catch (error) {
            formMessenger("otpSendError", true);
        } finally {
            dispatch({ type: ActionEnum.pageDefault });
        }
    }, [dispatch, formMessenger, email]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        formMessenger("submissionError", "");

        let values:Otp = [];
      
        if(e.target.value.length > 1)e.target.value = e.target.value.substring(1, 2);

        if(otpFieldsRef && otpFieldsRef.current){

            const children = Array.prototype.slice.call(otpFieldsRef.current.children);

            for(let i = 0; i < otpLength; i++){

                let elem = children[i];

                let value = elem.value;

                if(!value || value.match(otpRegex)){
                    elem.value = "";
                    children[i].focus();
                    return;
                }
            }

            children.forEach((node) => values.push(node.value));

            dispatch({type: ActionEnum.pushDigit, data: values});
        }
    }

    const deleteAccount = async(otpCode: string) => {

        dispatch({type: ActionEnum.btnLoading});

        try {

            const URI = `/profile/delete-account`;
    
            const response = await axiosInstance.delete(URI, { data: { otpCode } });

            if(response && response.data){

                const { success } = response.data;

                if(success) await auth.fetchUser();

                if(success){
                    router.push("/");

                    await auth.fetchUser();

                    toast.renderToast("Account Deleted Successfully", ToastType.Success);

                    return;
                }

                formMessenger("submissionError", serverErrorMsg);
            }

        } catch (error: any) {

            const { message } = (error as { response: { data: { message: string } } }).response.data;

            message === "VERIFICATION_FAILED" ? formMessenger("submissionError", submitErrorMsg) : formMessenger("submissionError", serverErrorMsg);

        } finally {

            dispatch({ type: ActionEnum.btnDefault });
        }
    }

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {

        if(e)e.preventDefault();

        let otp = state.formData.otp.join("");

        if(otp.length !== otpLength || otpRegex.test(otp))return formMessenger("otp", inValidOtpMsg);

        formMessenger("otp", "");

        deleteAccount(otp);
    }

    useEffect(() => {
        if (email) {
            sendOtp();
        }
    }, [email, sendOtp]);

    return(
        <React.Fragment>

        <div className="flex flex-col justify-between">

            <div className="mb-6">
                <h3 className="mb-5 text-xl font-medium text-slate-600 dark:text-slate-300">Verify and Delete Your Account</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, quaerat?</p>
            </div>

            <div>
                {
                    state.pageLoading
                    ?
                    <div className="h-3 mb-6 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                    :
                    (
                        state.errors.otpSendError
                        ?
                        null
                        :
                        <p className="mb-6 text-sm leading-5 text-slate-500 dark:text-slate-400">Enter OTP sent to <span className="text-slate-700 dark:text-slate-200">{email}</span></p>
                    )
                }
                
                {state.errors.submissionError ? <p className="mb-4 py-2.5 px-4 rounded-lg text-xs text-red-700 bg-red-50 dark:text-red-300 dark:bg-red-500/10">{state.errors.submissionError}</p> : null}
                
                {
                    state.pageLoading 
                    ?
                    <div className="animate-pulse">
                        <div className="h-10 w-44 mb-6 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                        <div className="h-3 mb-8 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                        <div className="h-12 rounded-lg bg-slate-200 dark:bg-slate-700"></div>
                    </div>
                    :
                    (state.errors.otpSendError
                    ?
                    <div className="h-36 flex flex-col justify-center items-center">
                        <h2 className="mb-5 text-md text-slate-700 dark:text-slate-400">Something Went Wrong!</h2>
                        <button onClick={handleResendOtp}>
                            <span className="text-sm text-blue-600 dark:text-blue-400">Try Again</span>
                        </button>
                    </div>
                    :
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6 flex flex-col">
                            <div ref={otpFieldsRef} className="flex space-x-3">
                                {new Array(otpLength).fill(null).map((field, index) => {
                                    return <input 
                                        key={index}
                                        type="text" 
                                        autoComplete="off"
                                        onChange={(e) => handleChange(e)}
                                        className="text-sm rounded-lg block w-10 p-2.5 focus:outline-none text-slate-700 dark:text-white bg-slate-50 border border-slate-300/50 bg-slate-200/50 dark:border-slate-600/50 dark:bg-slate-700/50" 
                                    />;
                                })}
                            </div>
                            {state.errors.otp && <p className="mt-3 text-xs font-light tracking-wide text-red-700 dark:text-red-300 ">{state.errors.otp}</p>}
                        </div>
                
                        <div className="mb-8 flex justify-between items-center">
                            <button 
                                type="button" 
                                disabled={state.btnLoading}
                                onClick={() => state.btnLoading ? null : handleResendOtp()}
                                className={`${state.btnLoading ? "cursor-not-allowed" : "cursor-pointer"} flex items-center space-x-2`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="18" width="18">
                                    <path className="fill-blue-600 dark:fill-blue-400" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"></path>
                                    <path className="fill-blue-600 dark:fill-blue-400" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"></path>
                                    <path className="fill-blue-600 dark:fill-blue-400" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"></path>
                                </svg>
                                <span className="text-sm text-blue-600 dark:text-blue-400">Resend OTP</span>
                            </button>
                        </div>
                
                        <LoadingButton 
                            type={"submit"} 
                            btnText={"Verify & Delete Account"}
                            height="h-12" 
                            onClick={handleSubmit} 
                            loading={state.btnLoading} 
                        />
                    </form>
                    )
                }
            </div>
        </div>
        </React.Fragment>
    )
}

export default VerifyAndDelete;