"use client";

import React, { useEffect, useState } from "react";

import useModal from "@/hooks/useModal";

import VerifyAndDelete from "./VerifyAndDelete";

const AccountDelete = () => {

    const modal = useModal();

    const [rendered, setRendered] = useState(false);

    const [verify, setVerify] = useState(false);

    useEffect(() => setRendered(true), []);

    const handleCloseModal = () => modal?.closeModal();

    return(
        <React.Fragment>
            <div onClick={handleCloseModal} className={`${rendered ? "show" : ""} z-30 modal min-h-screen w-screen backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 bg-slate-300/30 dark:bg-slate-900/20`}>
                <div onClick={(e) => e.stopPropagation()} className="min-h-[370px] modal-child w-11/12 max-w-96 rounded-2xl p-6 relative shaow-lg bg-white dark:bg-slate-800">

                    {
                        verify
                        ?
                        <VerifyAndDelete />
                        :
                        <>
                            <div className="mb-8">
                                <h3 className="mb-5 text-xl font-medium text-slate-600 dark:text-slate-300">Delete Your Account....?</h3>
                                <div className="flex flex-col gap-3">
                                    <p className="text-sm text-slate-600 dark:text-slate-400">We understand that you&apos;re considering deleting your account. It&apos;s important to remember that this action is irreversible and you&apos;ll lose all your data associated with the account.</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400"> If you&apos;re sure about this, please verify your email first to proceed.</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-5">
                                <button onClick={() => setVerify(true)} className="h-11 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600/60 bg-slate-50 dark:bg-slate-700/40">
                                    <span>Yes, Proceed</span>
                                </button>
                                <button onClick={handleCloseModal} className="h-11 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-sm font-medium text-white">
                                    <span>No, I changed my mind</span>
                                </button>
                            </div>                           
                        </>
                    }
                    <button onClick={handleCloseModal} className={`absolute top-6 right-6`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path className="fill-slate-500" d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default AccountDelete;