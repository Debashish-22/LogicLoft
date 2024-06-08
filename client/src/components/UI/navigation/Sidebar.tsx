"use client";

import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from 'next/image';

import useModal from "@/hooks/useModal";
import useAuth from "@/hooks/useAuth";

import { User } from "@/context/authContextProvider";
import { ModalType } from "@/context/modalContextProvider";

interface Sidebar {
    closeSidebar: () => void
}

export const Sidebar = ({ closeSidebar }: Sidebar) => {

    const modal = useModal();
    const auth = useAuth() as User;

    const closeBtnRef = useRef<HTMLButtonElement>(null);
    const logOutBtnRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLAnchorElement>(null);
    
    useEffect(() => {
        const handleDropdown = () => closeSidebar();
        const handleLogout = () => modal?.renderModal(ModalType.LOGOUT_MODAL);
    
        const closeBtn = closeBtnRef.current;
        const logOutBtn = logOutBtnRef.current;
    
        if (closeBtn && logOutBtn) {
            logOutBtn.addEventListener('click', handleLogout);
            closeBtn.addEventListener('click', handleDropdown);
    
            return () => {
                logOutBtn.removeEventListener('click', handleLogout);
                closeBtn.removeEventListener('click', handleDropdown);
            };
        }
    }, [closeSidebar, modal]);

    if (!modal || !auth) return null;

    const userName = auth.user?.username || "";
    const email = auth.user?.email || "";
    const userAvatar = auth.user?.userAvatar?.src || "default-avatar.svg";

    return(
        <React.Fragment>
           <div className="h-screen w-screen backdrop-blur-sm fixed top-0 left-0 bg-slate-900/80 flex justify-end">

                <div className="h-full w-72 rounded-tl-lg rounded-bl-lg shadow-md bg-white dark:bg-slate-800">

                    <div className="p-3.5 flex justify-between items-center border-b dark:border-slate-700/80">

                        <Link href="/" className="flex items-center space-x-2">
                            <svg fill="none" viewBox="10.017380714416504 7.744319915771484 43.964752197265625 48.20688247680664" width="24" height="24" role="img" aria-labelledby="shieldIconTitle shieldIconDesc"  aria-label="Shield Icon">
                                <title id="shieldIconTitle">Shield Icon</title>
                                <desc id="shieldIconDesc">A 3D shield icon with different shades of blue.</desc>
                                <path fill="url(#a)" d="M53.9817 17.7503C53.5088 40.3663 43.8607 53.0825 32.349 55.899C32.0645 55.9686 31.7681 55.9686 31.4837 55.899C19.9759 53.0824 10.4829 40.3661 10.0178 17.7503C9.99719 16.7506 10.7383 15.9019 11.7269 15.752C18.0244 14.7969 24.6037 13.166 30.5038 8.25296C31.3181 7.57493 32.5146 7.57499 33.3299 8.25184C39.2495 13.1665 45.9535 14.7973 52.2729 15.7524C53.2616 15.9019 54.0026 16.7506 53.9817 17.7503Z"/>
                                <path fill="url(#b)" d="M47.9689 22.0035C47.4536 38.4468 40.5845 47.7426 32.3841 49.8908C32.0922 49.9672 31.7862 49.9672 31.4943 49.8907C23.2978 47.7424 16.5374 38.4467 16.0305 22.0035C15.9964 20.8994 16.8947 20.0023 17.9956 19.9133C21.5228 19.6284 26.6477 18.5846 30.0123 15.964C31.086 15.1278 32.7935 15.1272 33.8695 15.9606C37.2583 18.5854 42.454 19.6297 46.0044 19.9139C47.1054 20.002 48.0035 20.8995 47.9689 22.0035Z"/>
                                <path fill="url(#c)" d="M16.0305 22.0035C16.5374 38.4467 23.2978 47.7424 31.4943 49.8907C31.7576 49.9597 32 49.7547 32 49.4825V15.3367C31.2845 15.3248 30.5645 15.5339 30.0123 15.964C26.6477 18.5846 21.5228 19.6284 17.9956 19.9133C16.8947 20.0023 15.9964 20.8994 16.0305 22.0035Z"/>
                                <defs>
                                    <linearGradient id="a" x1="32" x2="32" y1="7.744" y2="55.951" gradientUnits="userSpaceOnUse"><stop stopColor="#3b82f6" stopOpacity=".5"/><stop offset="1" stopColor="#3b82f6" stopOpacity="0.5"/></linearGradient>
                                    <linearGradient id="b" x1="32" x2="32" y1="15.336" y2="49.948" gradientUnits="userSpaceOnUse"><stop stopColor="#60a5fa" stopOpacity=".5"/><stop offset="1" stopColor="#60a5fa" stopOpacity="0.5"/></linearGradient>
                                    <linearGradient id="c" x1="24.015" x2="24.015" y1="15.336" y2="49.904" gradientUnits="userSpaceOnUse"><stop stopColor="#3b82f6" stopOpacity=".5"/><stop offset="1" stopColor="#3b82f6" stopOpacity="0.5"/></linearGradient>
                                </defs>
                            </svg>
                            <h2 className="text-lg font-medium text-slate-900 dark:text-white">LogicLoft</h2>
                        </Link>

                        <button ref={closeBtnRef}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                <title>Close Icon</title>
                                <desc>A close or &quot;x&quot; icon, often used in user interfaces to represent a close or exit button.</desc>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M13.41,12l6.3-6.29a1,1,0,1,0-1.42-1.42L12,10.59,5.71,4.29A1,1,0,0,0,4.29,5.71L10.59,12l-6.3,6.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l6.29,6.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"/>
                            </svg>
                        </button>
                    </div>

                    <div className="p-3.5 space-x-3 flex items-center border-b dark:border-slate-700/80">
                        <div className="h-10 w-10 p-0.5 rounded-full ring-2 ring-indigo-600 dark:ring-indigo-600">
                            <div className="relative w-full h-full">
                                <Image 
                                    src={`/avatars/${userAvatar}`}
                                    alt='' 
                                    fill     
                                    sizes="100%"
                                    className='rounded-full object-cover' 
                                />
                            </div>
                        </div>
                        <div className="space-y-1">
                            <h3 className="text-sm font-medium text-slate-800 dark:text-slate-50">{userName}</h3>
                            <p className="text-xs text-slate-700 dark:text-slate-300">{email}</p>
                        </div>
                    </div>
                    <ul className="space-y-3 py-4 px-3.5">
                        <li>
                            <Link 
                                ref={dropdownRef}
                                // onClick={handleDropdown} 
                                prefetch={false} 
                                href="/account"
                                className="inline-block w-full text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 hover:dark:text-slate-200 transition-colors"
                            >
                            My Profile
                            </Link>
                        </li>
                        <li>
                            <Link 
                                ref={dropdownRef}

                                // onClick={handleDropdown} 
                                prefetch={false} 
                                href="/account/devices"
                                className="inline-block w-full text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 hover:dark:text-slate-200 transition-colors"
                            >
                            My Devices
                            </Link>
                        </li>
                        <li>
                            <button ref={logOutBtnRef} className="w-full text-left text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 hover:dark:text-slate-200 transition-colors">
                                Log Out
                            </button>
                        </li>
                    </ul>
                </div>
           </div>
        </React.Fragment>
    )
}

export default Sidebar;