"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountNavbar = () => {

    const pathName = usePathname();
    
    return(
        <nav className="col-span-12 sm:col-span-3 h-fit py-5 rounded-lg border border-slate-200 dark:border-slate-800">
            <div className="space-y-3">
                <Link href="/account" className={`${pathName === "/account" ? "border-blue-600 text-blue-600 fill-blue-600 dark:border-blue-400 dark:text-blue-400 dark:fill-blue-400" : 'border-transparent text-slate-600 fill-slate-600 dark:text-slate-300 dark:fill-slate-300' } border-l-4 w-full flex items-center space-x-2.5 py-1 pl-5 pr-1 transition-colors hover:text-blue-600 hover:fill-blue-600 hover:dark:text-blue-400 hover:dark:fill-blue-400`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M15.71 12.71a6 6 0 1 0-7.42 0 10 10 0 0 0-6.22 8.18 1 1 0 0 0 2 .22 8 8 0 0 1 15.9 0 1 1 0 0 0 1 .89h.11a1 1 0 0 0 .88-1.1 10 10 0 0 0-6.25-8.19ZM12 12a4 4 0 1 1 4-4 4 4 0 0 1-4 4Z"/></svg>
                    <span className="text-sm font-medium">Profile</span>
                </Link>
                <Link href="/account/devices" className={`${pathName === "/account/devices" ? "border-blue-600 text-blue-600 fill-blue-600 dark:border-blue-400 dark:text-blue-400 dark:fill-blue-400" : 'border-transparent text-slate-600 fill-slate-600 dark:text-slate-300 dark:fill-slate-300' } border-l-4 w-full flex items-center space-x-2.5 py-1 pl-5 pr-1 transition-colors hover:text-blue-600 hover:fill-blue-600 hover:dark:text-blue-400 hover:dark:fill-blue-400`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path d="M19,3H5A3,3,0,0,0,2,6v8a3,3,0,0,0,3,3h6v2H7a1,1,0,0,0,0,2H17a1,1,0,0,0,0-2H13V17h6a3,3,0,0,0,3-3V6A3,3,0,0,0,19,3Zm1,11a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V6A1,1,0,0,1,5,5H19a1,1,0,0,1,1,1Z"></path></svg>
                    <span className="text-sm font-medium">My Devices</span>
                </Link>
                <Link href="/account/settings" className={`${pathName === "/account/settings" ? "border-blue-600 text-blue-600 fill-blue-600 dark:border-blue-400 dark:text-blue-400 dark:fill-blue-400" : 'border-transparent text-slate-600 fill-slate-600 dark:text-slate-300 dark:fill-slate-300' } border-l-4 w-full flex items-center space-x-2.5 py-1 pl-5 pr-1 transition-colors hover:text-blue-600 hover:fill-blue-600 hover:dark:text-blue-400 hover:dark:fill-blue-400`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="18" height="18"><path d="m30 13.2-3-.9c-.1-.4-.3-.8-.5-1.2l1.8-2.7c.3-.4.2-.9-.1-1.2L25 4c-.3-.3-.8-.4-1.1-.2l-2.8 1.5c-.4-.2-.8-.4-1.2-.5l-.6-3.2c-.1-.3-.5-.6-.9-.6h-4.6c-.4 0-.8.3-.9.7l-.9 3c-.4.1-.8.3-1.2.5L8.2 3.4c-.4-.3-.9-.2-1.2.1L3.8 6.7c-.3.3-.4.8-.2 1.2l1.5 2.8c-.1.3-.3.7-.5 1.1l-3.2.6c-.4.1-.8.5-.8.9v4.6c0 .4.3.8.7.9l3 .9c.1.4.3.8.5 1.2L3 23.6c-.3.4-.2.9.1 1.2L6.5 28c.2.2.4.3.7.3.2 0 .3 0 .5-.1l2.8-1.5c.4.2.8.4 1.2.5l.6 3.2c.1.4.5.8.9.8h4.6c.4 0 .8-.3.9-.7l.9-3c.4-.1.8-.3 1.2-.5l2.7 1.8c.2.1.3.2.5.2s.5-.1.7-.3l3.2-3.2c.3-.3.4-.8.2-1.1l-1.5-2.8c.2-.4.4-.8.5-1.2l3.2-.6c.4-.1.8-.5.8-.9v-4.6c-.4-.6-.7-1-1.1-1.1zm-1.2 4.7-1.5.3-1.3.2c-.1 0-.2.1-.3.1-.3 1.1-.7 2.1-1.4 3.1 0 .1.1.2.1.3l.7 1.3.7 1.2-2.2 2.2-1.2-.8-1.2-.8c-.1-.1-.2-.1-.3-.1-1 .6-2 1-3.1 1.2-.1.1-.1.2-.1.3l-.4 1.4-.4 1.4h-3.1l-.3-1.5-.3-1.4c0-.1-.1-.2-.1-.3-1.1-.3-2.1-.8-3.1-1.4-.1 0-.2.1-.3.1l-1.3.7-1.2.7L5 23.9l.8-1.2.8-1.2c.1-.1.1-.2.1-.3-.6-1-1-2-1.2-3.1.1-.1 0-.1-.1-.1L4 17.6l-1.4-.4v-3.1l1.5-.3 1.4-.3c.1 0 .2-.1.3-.1.3-1.1.7-2.1 1.4-3.1 0-.1-.1-.2-.1-.3l-.8-1.2-.7-1.2 2.2-2.2 1.2.8 1.2.8c.1.1.2.1.3.1 1-.6 2-1 3.1-1.2.1-.1.1-.2.1-.3l.4-1.4.4-1.4h3.1l.3 1.5.3 1.4c0 .1.1.2.1.3 1.1.3 2.1.7 3.1 1.4.1 0 .2-.1.3-.1l1.3-.7 1.2-.7 2.2 2.2-.8 1.2-.8 1.2c-.1.1-.1.2-.1.3.6 1 1 2 1.2 3.1 0 .1.1.1.1.1l1.4.4 1.4.4v3.1z"/><path d="M15.7 9.5c-3.6 0-6.5 2.9-6.5 6.5s2.9 6.5 6.5 6.5 6.5-2.9 6.5-6.5c.1-3.6-2.9-6.5-6.5-6.5zm0 11.2c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7-2.1 4.7-4.7 4.7z"/></svg>
                    <span className="text-sm font-medium">Settings</span>
                </Link>
            </div>
        </nav>
    )
}

export default AccountNavbar;