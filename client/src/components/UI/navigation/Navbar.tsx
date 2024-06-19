"use client";

import React from "react";
import Link from "next/link";

import useAuth from "@/hooks/useAuth";

import ThemeSwitch from "./ThemeSwitch";
import NavAuth from "./NavAuth";
import NavNoAuth from "./NavNoAuth";

export const Navbar = () => {

    const auth = useAuth();

    if (!auth) return null;

    const isAuthentic = auth.authenticated;
    
    return(
        <React.Fragment>
            <div className="w-full sticky z-20 top-0 left-0 bg-white border-b border-solid border-slate-900/10 dark:backdrop-blur dark:bg-slate-900/40 dark:border-slate-300/10">

                <div className="w-full max-w-[90rem] mx-auto py-3 px-4 md:px-6 lg:px-8 flex justify-between items-center">
                    <Link href="/" aria-label="Home" className="flex items-center space-x-2.5">
                        <svg xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" clipRule="evenodd" viewBox="0 0 20 20" width="32" height="32">
                            <path fill="url(#a)" d="m 11,17 c 0,0.552 -0.448,1 -1,1 -0.552,0 -1,-0.448 -1,-1 0,-0.552 0.448,-1 1,-1 0.552,0 1,0.448 1,1 z M 10,15 C 8,15 7.839,16.622 7.803,16.68 7.51,17.147 6.892,17.288 6.425,16.995 3.592,15.216 2.389,11.366 2.014,9.168 1.977,8.951 1.952,8.743 1.936,8.547 1.936,8.544 1.935,8.541 1.935,8.538 1.844,7.291 2.572,6.13 3.733,5.667 3.736,5.666 3.738,5.665 3.74,5.664 4.948,5.193 5.913,4.705 6.583,3.641 6.586,3.636 6.588,3.632 6.591,3.628 7.235,2.637 8.332,2.035 9.506,2.023 9.817,2.001 10.141,2 10.451,2 c 0,0 0,0 0,0 1.202,0 2.322,0.608 2.977,1.616 0.005,0.008 0.01,0.017 0.015,0.025 0.651,1.07 1.614,1.554 2.817,2.022 0.002,0 0.005,10e-4 0.007,0.002 1.162,0.463 1.89,1.626 1.799,2.873 0,0.006 -10e-4,0.012 -10e-4,0.018 -0.018,0.193 -0.043,0.397 -0.079,0.612 -0.375,2.198 -1.578,6.048 -4.411,7.827 C 13.108,17.288 12.49,17.147 12.197,16.68 12.161,16.622 12,15 10,15 Z"/>
                            <defs>
                                <linearGradient id="a" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(7 -13 13 7 7 17)" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#2563eb"/>
                                    <stop offset="1" stopColor="#60a5fa"/>
                                </linearGradient>
                                <linearGradient id="b" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(3 -6 6 3 13 14)" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#60a5fa"/>
                                    <stop offset="1" stopColor="#93c5fd"/>
                                </linearGradient>
                            </defs>
                        </svg>
                        <h2 className="text-xl font-medium text-slate-900 dark:text-white">LogicLoft</h2>
                    </Link>
                    <div className="flex items-center gap-4 md:gap-6">
                        <ThemeSwitch />
                        <Link href="/pricing">
                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-300 dark:hover:text-blue-300 transition-colors">Pricing</span>
                        </Link>
                        {isAuthentic ? <NavAuth /> : <NavNoAuth />}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Navbar;