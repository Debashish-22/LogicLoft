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
                    <span className="text-sm font-medium">Devices</span>
                </Link>
                <Link href="/account/subscription" className={`${pathName === "/account/subscription" ? "border-blue-600 text-blue-600 stroke-blue-400 dark:border-blue-400 dark:text-blue-400 dark:fill-blue-400" : 'border-transparent text-slate-600 stroke-slate-600 dark:text-slate-300 dark:stroke-slate-300' } border-l-4 w-full flex items-center space-x-2.5 py-1 pl-5 pr-1 transition-colors hover:text-blue-600 hover:stroke-blue-600 hover:dark:text-blue-400 hover:dark:stroke-blue-400`}>
                    <svg width="18" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.609 13.5616L21.8382 11.1263C22.0182 9.2137 22.1082 8.25739 21.781 7.86207C21.604 7.64823 21.3633 7.5172 21.106 7.4946C20.6303 7.45282 20.0329 8.1329 18.8381 9.49307C18.2202 10.1965 17.9113 10.5482 17.5666 10.6027C17.3757 10.6328 17.1811 10.6018 17.0047 10.5131C16.6865 10.3529 16.4743 9.91812 16.0499 9.04851L13.8131 4.46485C13.0112 2.82162 12.6102 2 12 2C11.3898 2 10.9888 2.82162 10.1869 4.46486L7.95007 9.04852C7.5257 9.91812 7.31351 10.3529 6.99526 10.5131C6.81892 10.6018 6.62434 10.6328 6.43337 10.6027C6.08872 10.5482 5.77977 10.1965 5.16187 9.49307C3.96708 8.1329 3.36968 7.45282 2.89399 7.4946C2.63666 7.5172 2.39598 7.64823 2.21899 7.86207C1.8918 8.25739 1.9818 9.2137 2.16181 11.1263L2.391 13.5616C2.76865 17.5742 2.95748 19.5805 4.14009 20.7902C5.32271 22 7.09517 22 10.6401 22H13.3599C16.9048 22 18.6773 22 19.8599 20.7902C21.0425 19.5805 21.2313 17.5742 21.609 13.5616Z" strokeWidth="2"/>
                        <path d="M9 18H15" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <span className="text-sm font-medium">Subscriptions</span>
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