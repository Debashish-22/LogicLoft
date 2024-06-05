import React, { useEffect, useRef, useReducer, useCallback } from "react";
import axiosInstance from "@/utils/axios";
import useAuthModal from '@/hooks/useAuthModal';
import LoadingButton from "../../buttons/LoadingButton";
import useAuth from '@/hooks/useAuth';

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
            return {...initialState}; // Reset to initial state
        default: return state;
    }
}

const Otp = () => {

    const auth = useAuth();
    const authModal = useAuthModal();
    const { updateAuthStore } = authModal!;
    const { username, email, password } = authModal!.authStore.data!;
    const currentAuthMode = authModal?.authStore.mode;

    useEffect(() => {
        if (!authModal) return;
        
        if (currentAuthMode === "CREATE_ACCOUNT" && (!username || !email || !password)) {
            updateAuthStore({ mode: "" });
        } else if (currentAuthMode === "RESET_PASSWORD" && !email) {
            updateAuthStore({ mode: "" });
        }
    }, [authModal, currentAuthMode, email, password, updateAuthStore, username]);

    const otpFieldsRef = useRef<HTMLInputElement>(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    const handleResendOtp = () => sendOtp();

    const formMessenger = useCallback((key: string, value: string | boolean) => dispatch({ type: ActionEnum.formErrorHandle, data: { [key]: value } }), []);

    const sendOtp = useCallback(async () => {
        dispatch({type: ActionEnum.formDataReset});
        updateAuthStore({operation: true});
        try {
            const URI = `/otp/send-otp`;
            const response = await axiosInstance.post(URI, { email });
            const { success } = response.data;
            success ? formMessenger("otpSendError", false) : formMessenger("submissionError", serverErrorMsg);
        } catch (error) {
            formMessenger("otpSendError", true);
        } finally {
            dispatch({ type: ActionEnum.pageDefault });
            updateAuthStore({operation: false});
        }
    }, [email, formMessenger, updateAuthStore]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        formMessenger("submissionError", "");
        let values:Otp = [];
        if(e.target.value.length > 1) e.target.value = e.target.value.substring(1, 2);
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
            children.forEach((node) => values.push(Number(node.value)));
            dispatch({type: ActionEnum.pushDigit, data: values});
        }
    }

    const verifyOtp = useCallback(async (otpCode: string) => {
        updateAuthStore({ operation: true });
        dispatch({type: ActionEnum.btnLoading});
        try {
            const URI = `/otp/verify-otp`; 
            const response = await axiosInstance.post(URI, { email, otpCode });
            const { success } = response.data;
            if(success && currentAuthMode === "RESET_PASSWORD"){
                updateAuthStore({ operation: false, switchTo: "RESET_PASSWORD", data: {username: "", email, password: "", otpCode }, mode: ""});
            }
        } catch (error: any){
            const { message } = (error as { response: { data: { message: string } } }).response.data;
            message === "VERIFICATION_FAILED" ? formMessenger("submissionError", submitErrorMsg) : formMessenger("submissionError", serverErrorMsg);
        } finally {
            dispatch({ type: ActionEnum.btnDefault });
            updateAuthStore({ operation: false });
        }
    }, [currentAuthMode, email, formMessenger, updateAuthStore]);

    const createSession = useCallback(async () => {
        updateAuthStore({operation: true});
        dispatch({type: ActionEnum.btnLoading});
        try {
            if(email && password){
                await auth.logIn({ email, password })!;
            }
        } catch (error) {
            formMessenger("submissionError", serverErrorMsg);
        } finally {
            updateAuthStore({operation: false});
            dispatch({ type: ActionEnum.btnDefault });
        }
    }, [auth, email, formMessenger, password, updateAuthStore]);

    const createAccount = useCallback(async (otpCode: string) => {
        updateAuthStore({operation: true});
        dispatch({type: ActionEnum.btnLoading});
        try {
            const URI = `/auth/local-sign-up`;
            const response = await axiosInstance.post(URI, {
                username,
                email,
                password,
                otpCode
            });
            const { success } = response.data;
            if(!success) return formMessenger("submissionError", serverErrorMsg);
            createSession();
        } catch (error) {
            const { message } = (error as { response: { data: { message: string } } }).response.data;
            message === "VERIFICATION_FAILED" ? formMessenger("submissionError", submitErrorMsg) : formMessenger("submissionError", serverErrorMsg);
        } finally {
            updateAuthStore({operation: false});
            dispatch({ type: ActionEnum.btnDefault });
        }
    }, [createSession, email, formMessenger, password, updateAuthStore, username]);

    const handleSubmit = useCallback((e?: React.FormEvent<HTMLFormElement>) => {
        if(e) e.preventDefault();
        let otp = state.formData.otp.join("");
        if(otp.length !== otpLength || otpRegex.test(otp)) return formMessenger("otp", inValidOtpMsg);
        formMessenger("otp", "");
        if(currentAuthMode === "CREATE_ACCOUNT"){
            createAccount(otp);
        } else if(currentAuthMode === "RESET_PASSWORD"){
            verifyOtp(otp);
        }
    }, [createAccount, currentAuthMode, formMessenger, state.formData.otp, verifyOtp]);

    const sendOtpRef = useRef(sendOtp);
    const pageLoadingRef = useRef(state.pageLoading);

    useEffect(() => {
        sendOtp();
    }, [sendOtpRef]);

    useEffect(() => {
        if(!state.pageLoading){
            if(otpFieldsRef && otpFieldsRef.current){
                const children = Array.prototype.slice.call(otpFieldsRef.current.children);
                children.forEach((node) => node.value = "");
                children[0].focus();
                otpFieldsRef.current.addEventListener("keyup", (e) => {
                    if(e.key === "Backspace"){
                        let values: Otp = []
                        let ele = (e.target as HTMLInputElement).previousSibling;
                        if(ele) (ele as HTMLInputElement)?.focus();
                        children.forEach((node) => values.push(Number(node.value)));
                        dispatch({type: ActionEnum.pushDigit, data: values});
                    }
                })
            }
        }
    }, [otpFieldsRef, pageLoadingRef]);

    return(
        <React.Fragment>
            <div className="mb-8">
                <div className="mb-6 flex items-center space-x-2">
                    <h3 className="text-xl font-normal text-slate-700 dark:text-slate-200">Verify Your Email</h3>
                </div>
                {
                    state.pageLoading
                    ?
                    <div className="h-3 rounded-lg bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
                    :
                    (
                        state.errors.otpSendError
                        ?
                        null
                        :
                        <p className="text-sm leading-5 text-slate-500 dark:text-slate-400">Enter OTP sent to <span className="text-slate-700 dark:text-slate-200">{email}</span></p>
                    )
                }
            </div>
            
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
                            onClick={() => state.btnLoading ? null : updateAuthStore({switchTo: "SIGNUP"})} 
                            disabled={state.btnLoading}
                            className={`${state.btnLoading ? "cursor-not-allowed" : "cursor-pointer"} flex items-center space-x-2`}
                        >
                            <svg className="fill-blue-600 dark:fill-blue-400" viewBox="0 0 24 24" width="18" height="18">
                                <path d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"></path>
                            </svg>
                            <span className="text-sm text-blue-600 dark:text-blue-400">Edit Email</span>
                        </button>
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
                        btnText={"Continue"}
                        height="h-12" 
                        onClick={handleSubmit} 
                        loading={state.btnLoading} 
                    />
                </form>
                )
            }
        </React.Fragment>
    )
}

export default Otp;
