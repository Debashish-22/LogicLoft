"use client";

import React, { useState, useEffect, useRef } from "react";

import { ToastType } from "@/context/toastContextProvider";

interface Toast {
    message: string
    type?: ToastType
    duration: number
    close: () => void
}

const Toast = (props: Toast) => {

    const toastRef = useRef<HTMLDivElement>(null);

    const [show, setShow] = useState(false)

    const { close, duration } = props;

    useEffect(() => {
        setTimeout(() => {
            if (toastRef.current) {
                setShow(true);
            }
        }, 0);
    
        setTimeout(() => {
            if (toastRef.current) {
                setShow(false);
                setTimeout(() => close(), 500);
            };
        }, duration);
    }, []);

    return (
        <React.Fragment>
            <div ref={toastRef} className={`${show ? 'translate-x-0' : 'translate-x-[calc(100%+24px)]'} min-w-[280px] py-4 px-5 flex items-center space-x-4 rounded-xl dark:bg-slate-800/50 transition-transform shadow-md`}>
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex justify-center items-center">
                {props.type === 'success' ? (
                    <svg className="fill-white stroke-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" height="20" width="20"><path d="M15.5 29a1 1 0 0 1-.7-.28l-7.5-7.28A1 1 0 1 1 8.7 20l6.8 6.6 15.8-15.32a1 1 0 1 1 1.4 1.44l-16.5 16a1 1 0 0 1-.7.28Z"/></svg>
                ) : (
                    <svg className="fill-white" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path d="M10.05 23.95a1 1 0 0 0 1.414 0L17 18.414l5.536 5.536a1 1 0 0 0 1.414-1.414L18.414 17l5.536-5.536a1 1 0 0 0-1.414-1.414L17 15.586l-5.536-5.536a1 1 0 0 0-1.414 1.414L15.586 17l-5.536 5.536a1 1 0 0 0 0 1.414z"/></svg>
                )}
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-50">{props.message}</p>
            </div>
        </React.Fragment>
    )
}

export default Toast;