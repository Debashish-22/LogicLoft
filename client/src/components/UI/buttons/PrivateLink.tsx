import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import axios from 'axios';

axios.defaults.baseURL = process.env.SERVER_API;
axios.defaults.withCredentials = true;

interface PrivateLinkProps {
    href: string;
    children: React.ReactNode;
}

const PrivateLink: React.FC<PrivateLinkProps> = ({ href, children }) => {
    const btnRef = useRef<HTMLButtonElement>(null);
    const router = useRouter();

    const handleBtn = useCallback(async () => {
        try {
            const response = await axios.get(`${process.env.SERVER_API}/auth/auth-user`);
            if (response && response.data && response.data.success) {
                router.push(href);
            } else {
                // Handle authentication failure
            }
        } catch (error) {
            console.error("Error:", error);
            // Handle error gracefully
        } finally {
            console.log("Either page is redirected or loading ended");
        }
    }, [router, href]);

    useEffect(() => {
        const btn = btnRef.current;
        if (btn) {
            const clickHandler = () => handleBtn();
            btn.addEventListener("click", clickHandler);
            return () => {
                btn.removeEventListener("click", clickHandler);
            };
        }
    }, [btnRef, handleBtn]);

    return (
        <button ref={btnRef}>
            {children}
        </button>
    );
};

export default PrivateLink;
