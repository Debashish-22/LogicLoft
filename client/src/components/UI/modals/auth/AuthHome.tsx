import React, { useState, useRef, useEffect } from "react";

import useModal from "@/hooks/useModal";
import useAuthModal from "@/hooks/useAuthModal";
import useAuth from "@/hooks/useAuth";
import useToast from '@/hooks/useToast';

import Spinner from "@/components/UI/buttons/Spinner";

import { ToastType } from "@/context/toastContextProvider";

const AuthHome = () => {

    const modal = useModal();
    const authModal = useAuthModal();
    const auth = useAuth();
    const toast = useToast();
    const toastRef = useRef(toast);

    const [btnLoading, setBtnLoading] = useState(false);

    const mode = modal?.modalMode;

    const { googleLogin } = auth;
    
    const { updateAuthStore } = authModal;

    const googleLoginBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        toastRef.current = toast;
    }, [toast]);

    useEffect(() => {
        const googleLoginBtn = googleLoginBtnRef.current;

        const handleGoogleAuth = async () => {
            setBtnLoading(true);
            updateAuthStore({operation: true});

            try {
                await googleLogin();
            } catch (error) {
                toastRef.current.renderToast("Something went wrong!", ToastType.Error);
            }
        };

        if(googleLoginBtn){
            googleLoginBtn.addEventListener('click', handleGoogleAuth);
      
            return () => {
                googleLoginBtn.removeEventListener('click', handleGoogleAuth);
            };
        }
    }, [googleLogin, updateAuthStore]);

    if (!modal || !authModal || !auth || !toast) {
        return <>{toast.renderToast("Something went wrong!", ToastType.Error)}</>;
    }

    return(
        <React.Fragment>
            <h3 className="text-2xl font-normal mb-10 text-slate-700 dark:text-slate-200">Welcome Back!</h3>

            <div className="flex-col space-y-6">
                <button ref={googleLoginBtnRef} className="w-full py-3 px-6 rounded-lg flex justify-center items-center gap-x-2.5 border border-slate-300/50 bg-slate-200/50 dark:border-slate-600/50 dark:bg-slate-700/50">
                    {
                        btnLoading
                        ?
                        <Spinner fill={"stroke-slate-600 dark:stroke-slate-50"} />
                        :
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 256 262">
                                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/>
                                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/>
                                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"/>
                                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/>
                            </svg>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Continue with Google</span>
                        </>
                    }
                </button>
                
                <button onClick={() => mode === "SIGNUP" ? updateAuthStore({switchTo: "SIGNUP", data: {username: "", email: "", password: ""}}) : updateAuthStore({switchTo: "LOGIN", data: {username: "", email: "", password: ""}})} className="w-full py-3 px-6 rounded-lg flex justify-center items-center gap-x-2.5 border border-slate-300/50 bg-slate-200/50 dark:border-slate-600/50 dark:bg-slate-700/50">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" height="19" width="19">
                        <path className="fill-slate-700 dark:fill-slate-300" d="M53.42 53.32H10.58a8.51 8.51 0 0 1-8.5-8.5V19.18a8.51 8.51 0 0 1 8.5-8.5h42.84a8.51 8.51 0 0 1 8.5 8.5v25.64a8.51 8.51 0 0 1-8.5 8.5ZM10.58 13.68a5.5 5.5 0 0 0-5.5 5.5v25.64a5.5 5.5 0 0 0 5.5 5.5h42.84a5.5 5.5 0 0 0 5.5-5.5V19.18a5.5 5.5 0 0 0-5.5-5.5Z"></path>
                        <path className="fill-slate-700 dark:fill-slate-300" d="M32 38.08a8.51 8.51 0 0 1-5.13-1.71L3.52 18.71a1.5 1.5 0 1 1 1.81-2.39L28.68 34a5.55 5.55 0 0 0 6.64 0l23.35-17.68a1.5 1.5 0 1 1 1.81 2.39L37.13 36.37A8.51 8.51 0 0 1 32 38.08Z"></path>
                        <path className="fill-slate-700 dark:fill-slate-300" d="M4.17 49.14a1.5 1.5 0 0 1-1-2.62l18.4-16.41a1.5 1.5 0 0 1 2 2.24L5.17 48.76a1.46 1.46 0 0 1-1 .38zm55.66 0a1.46 1.46 0 0 1-1-.38l-18.4-16.41a1.5 1.5 0 1 1 2-2.24l18.39 16.41a1.5 1.5 0 0 1-1 2.62z"></path>
                    </svg>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Continue with Email</span>
                </button>
            </div>
        </React.Fragment>
    )
}

export default AuthHome;