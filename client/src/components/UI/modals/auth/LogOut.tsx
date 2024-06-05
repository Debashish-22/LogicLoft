"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";

import LoadingButton from "../../buttons/LoadingButton";

const LogOut = () => {

    const auth = useAuth();
    const modal = useModal();

    const [rendered, setRendered] = useState(false);

    const [btnLoading, setBtnLoading] = useState(false);

    useEffect(() => setRendered(true), []);

    const handleCloseModal = () => modal?.closeModal();

    const handleLogout = async() => {

        setBtnLoading(true);

        try {

            await auth?.logout();
            
        } catch (error) {

            console.log(error);
            
        } finally{
            setBtnLoading(false);
        }
    }

    return(
        <React.Fragment>
            <div onClick={btnLoading ? undefined : handleCloseModal} className={`${rendered ? "show" : ""} z-30 modal min-h-screen w-screen backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 bg-slate-300/30 dark:bg-slate-900/20`}>
                <div onClick={(e) => e.stopPropagation()} className="modal-child w-2/4 rounded-2xl p-6 relative shaow-lg bg-white dark:bg-slate-800">

                    <div className="flex flex-col justify-center items-center">
                        <Image 
                            src={`/logout.svg`}
                            alt="Logout"
                            height={180}
                            width={180}
                        />
                        <div className="my-4 space-y-3 flex flex-col items-center">
                            <h2 className="text-2xl font-semibold text-slate-600 dark:text-slate-100">Taking a break?</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400">Are you sure you want to log out? You will be asked to log in again.</p>
                        </div>
                        <div className="flex space-x-6 mt-4">
                            <button disabled={btnLoading} onClick={handleCloseModal} className={`${btnLoading ? "cursor-not-allowed" : "cursor-pointer"} h-12 w-32 rounded-lg bg-slate-100 dark:bg-slate-700`}>
                                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Cancel</span>
                            </button>
                            <LoadingButton 
                                btnText={"Log Out"}
                                height="h-12" 
                                width="w-32"
                                onClick={handleLogout} 
                                loading={btnLoading} 
                            />
                        </div>
                    </div>
                        
                    <button disabled={btnLoading} onClick={btnLoading ? undefined : handleCloseModal} className={`${btnLoading ? "cursor-not-allowed" : "cursor-pointer"} absolute top-6 right-6`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="22" height="22"><path className="fill-slate-500" d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/></svg>
                    </button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default LogOut;