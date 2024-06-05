import React, { useEffect, useState, useCallback } from "react";

import useModal from "@/hooks/useModal";
import useAuthModal from "@/hooks/useAuthModal";

import Login from "./Login";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import Otp from "./Otp";
import AuthHome from "./AuthHome";

const AuthModal = () => {

    const authModal = useAuthModal();

    const { operation, switchTo } = authModal?.authStore || {};

    const [rendered, setRendered] = useState(false);

    useEffect(() => setRendered(true), []);

    const modal = useModal();

    const handleCloseModal = () => modal?.closeModal();

    // useCallback is used to memoize the authPageManager function. The second argument to useCallback is an array of dependencies. When any of these dependencies change, the function will be recreated. In this case, there are no dependencies, so the function is only created once when the component is first rendered.
    const authPageManager = useCallback((type?: string):React.ReactNode => {

        switch(type) {
            case "SIGNUP": return <SignUp />
            case "OTP": return <Otp />
            case "LOGIN": return <Login />
            case "FORGOT_PASSWORD": return <ForgotPassword />
            case "RESET_PASSWORD": return <ResetPassword />
            default: return <AuthHome />
        }
    }, []);

    return(
        <React.Fragment>
            <div className={` ${rendered ? "show" : ""} z-30 modal min-h-screen w-screen backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 bg-slate-300/30 dark:bg-slate-900/20`}>
                <div onClick={(e) => e.stopPropagation()} className="modal-child w-96 p-6 relative bg-white dark:bg-slate-800 rounded-2xl shadow-lg">

                    {rendered && authPageManager(switchTo)}

                    <button onClick={operation ? undefined : handleCloseModal} className="absolute top-6 right-6">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path className="fill-slate-500" d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AuthModal;