import React from "react";

import { Metadata } from "next";

import AccountNavbar from "@/components/account/AccountNavbar";

export const metadata: Metadata = {
    title: 'Authentique | My Account',
    description: 'Manage your profile on Authentique’s ‘My Account’ page. View and edit your profile details, update your avatar, and manage your devices with ease. Perform sensitive operations like account deletion with our user-friendly interface. Take control of your account settings with Authentique.',
}

const Layout = ({ children}: {children: React.ReactNode}) => {

    return (
        <React.Fragment>
            <div className="max-w-screen-lg container mx-auto mt-8 p-2">
                <div className="grid grid-cols-12 gap-5 gap-y-3 pb-14">
                    <AccountNavbar />
                    <main className="col-span-12 sm:col-span-9 p-3.5">
                        {children}
                    </main>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout;