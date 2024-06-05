"use client";

import React, { useEffect, useRef } from "react";

import useModal from "@/hooks/useModal";
import { ModalType } from "@/context/modalContextProvider";

const Settings = () => {

    const deleteBtnRef = useRef<HTMLButtonElement>(null);

    const modal = useModal();
    
    useEffect(() => {

        const handleAccountDelete = () => modal?.renderModal(ModalType.ACCOUNT_DELETE_MODAL);

        if (modal && deleteBtnRef.current) {
            const deleteBtn = deleteBtnRef.current;
            deleteBtn.addEventListener('click', handleAccountDelete);
      
            return () => {
                deleteBtn.removeEventListener('click', handleAccountDelete);
            };
        }
    }, [modal]);

    return(
        <React.Fragment>

            <div className="mb-9">
                <h2 className="mb-2.5 text-xl font-medium text-blue-600 dark:text-blue-400">Settings</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Access device information and keep your account secure.</p>
            </div>

            <div className="">
                <div className="mb-4 py-3 px-0 flex gap-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24">
                        <path className="fill-red-400" d="M11.25 16.27c0-.414.336-.756.75-.756s.75.33.75.745v.01a.75.75 0 0 1-1.5 0Z"/>
                        <path className="stroke-red-400" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.796 20.418h14.482a2.08 2.08 0 0 0 1.819-2.86L13.82 4.824a2.078 2.078 0 0 0-3.64 0L2.905 17.559a2.08 2.08 0 0 0 1.819 2.859m7.267-7.022v-3.1"/>
                    </svg>
                    <h3 className="text-lg text-red-400">Danger Zone</h3>
                </div>

                <div className="p-5 flex justify-between items-center gap-10 rounded-xl bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700/80">
                    <div>
                        <h5 className="mb-3 text-base text-slate-700 dark:text-slate-200">Delete your account</h5>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Once you delete your account, there is no going back. Please be certain.</p>
                    </div>
                    <button ref={deleteBtnRef} className="py-1.5 px-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-300/40 dark:border-red-300/15">
                        <span className="text-xs text-red-600 dark:text-red-300">Delete Account</span>
                    </button>
                </div>
            </div>
                
        </React.Fragment>
    );
}

export default Settings;