import React, { useEffect, useRef } from "react";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/context/modalContextProvider";

const NavNoAuth = () => {
    const modal = useModal();

    const loginRef = useRef<HTMLButtonElement>(null);
    const signUpRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleAuth = (mode?: string) => modal?.renderModal(ModalType.AUTH_MODAL, mode);

        const loginBtn = loginRef.current;
        const signUpBtn = signUpRef.current;

        const handleLoginClick = () => handleAuth("");
        const handleSignUpClick = () => handleAuth("SIGNUP");

        if (loginBtn && signUpBtn) {
            loginBtn.addEventListener('click', handleLoginClick);
            signUpBtn.addEventListener('click', handleSignUpClick);

            return () => {
                loginBtn.removeEventListener('click', handleLoginClick);
                signUpBtn.removeEventListener('click', handleSignUpClick);
            };
        }
    }, [modal]);

    return (
        <React.Fragment>
            <button ref={loginRef} aria-label="Log In">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-300 dark:hover:text-blue-300 transition-colors">Log In</span>
            </button>
            <button 
                ref={signUpRef}
                className="h-10 w-24 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-sm font-medium text-white"
                aria-label="Sign Up"
            >
                <span className="text-sm font-medium text-white">Sign Up</span>
            </button>
        </React.Fragment>
    );
}

export default NavNoAuth;
