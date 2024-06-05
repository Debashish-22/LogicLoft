"use client";

import React, { useState, createContext } from "react";

type UpdateAuthStore = (updatedData?: {switchTo?: string, data?: {username?: string, email?: string, password?: string, otpCode?: string}, operation?: boolean, mode?: string}) => void;

interface AuthStore{
    operation: boolean,
    switchTo: string,
    data?: {
        username?: string,
        email?: string,
        password?: string,
        otpCode?: string
    },
    mode: string,
}

interface AuthModalContext {
    authStore: AuthStore
    updateAuthStore: UpdateAuthStore
}

interface AuthModalProvider {
    children: React.ReactNode;
}
  
const AuthModalContext = createContext<AuthModalContext>({
    authStore: {
        operation: false,
        switchTo: "",
        data: {
            username: "",
            email: "",
            password: "",
            otpCode: ""
        },
        mode: "",
    },
    updateAuthStore: () => {}
});

const AuthModalProvider = (props: AuthModalProvider) => {

    const [authStore, setAuthStore] = useState<AuthStore>({
        operation: false,
        switchTo: "",
        data: {
            username: "",
            email: "",
            password: ""
        },
        mode: "",
    });

    const updateAuthStore:UpdateAuthStore = (updatedData) => setAuthStore(prevState => ({...prevState, ...updatedData}));

    return(
        <AuthModalContext.Provider value={{ authStore, updateAuthStore }}>
            {props.children}
        </AuthModalContext.Provider>
    )
}

export {
    AuthModalContext,
    AuthModalProvider
}