"use client";

import React, { useState, createContext } from 'react';
import { createPortal } from 'react-dom';

import Toast from '@/components/UI/notifications/Toast';

enum ToastType {
    Success = 'success',
    Error = 'error',
    Info = 'info',
}

interface ToastInterface {
    id: string;
    type: ToastType;
    message: string;
    duration: number;
}

interface ToastProviderProps {
    children: React.ReactNode;
}

interface ToastContextInterface {
    renderToast: (message: string, type?: ToastType, duration?: number) => void;
    closeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextInterface>({
    renderToast: () => {},
    closeToast: () => {},
});

const toastLimit = 4;

const generateUID = () => `toast-${Math.floor(100000 + Math.random() * 900000)}`;

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastInterface[]>([]);

    const renderToast = (message = '', type = ToastType.Success, duration = 5000) => {
        const newToast = { id: generateUID(), type, message, duration };
        setToasts((prevState) => [...prevState, newToast].slice(-toastLimit));
    };

    const closeToast = (id: string) => {
        setToasts((prevState) => prevState.filter((toast) => toast.id !== id));
    };

    return (
        <ToastContext.Provider value={{ renderToast, closeToast }}>
            {children}
            {
                (toasts.length > 0 && document.body)
                ?
                createPortal(
                    <div role="alert" aria-live="assertive" className="fixed bottom-0 right-6 mb-6 z-40 flex flex-col justify-end gap-4 bg-slate-white dark:bg-slate-900">
                        {
                            toasts.map(({ id, type, message, duration }) => (
                                <Toast key={id} type={type} message={message} duration={duration} close={() => closeToast(id)} />
                            ))
                        }
                    </div>, document.body)
                :
                null 
            }
        </ToastContext.Provider>
    );
};

export { ToastContext, ToastProvider, ToastType };