"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface NoInternet{
    children: React.ReactNode
}

const NoInternet = (props: NoInternet) => {

    const [isOnLine, setIsOnline] = useState(true);

    useEffect(() => { 
        setIsOnline(navigator.onLine); 
    }, []);

    useEffect(() => {
        
        const goOnline = () => setIsOnline(true);
        const goOffline = () => setIsOnline(false);
    
        window.addEventListener('online', goOnline);
        window.addEventListener('offline', goOffline);
    
        return () => {
            window.removeEventListener('online', goOnline);
            window.removeEventListener('offline', goOffline);
        };
    }, []);
    
    if(isOnLine){
        return props.children;
    } else {
        return(
            <React.Fragment>
                <div className={`min-h-screen w-screen flex flex-col justify-center items-center fixed top-0 left-0 bg-[#030e2c]`}>
                    <Image
                        src="/no-internet.jpg"
                        width={250}
                        height={250}
                        alt="Internet Unavailable!"
                    />
                    <h3 className="mt-8 mb-5 text-xl font-medium text-slate-100">Internet Unavailable!</h3>
                    <p className="text-slate-400 text-center">&quot;Oops! It seems like you&apos;ve traveled back to the Stone Age. We couldn&apos;t connect to the internet. Please check your connection and try again.&quot;</p>
                </div>
            </React.Fragment>
        )
    }
}

export default NoInternet;