import React, { useEffect, useRef, useState } from "react";
import Image from 'next/image';

import useAuth from "@/hooks/useAuth";

import Dropdown from "./Dropdown";
import Sidebar from "./Sidebar";

const NavAuth = () => {
    const auth = useAuth();
    const navBtnRef = useRef<HTMLDivElement>(null);
    const [dropDown, setDropDown] = useState(false);
    const [sidebar, setSidebar] = useState(false);

    useEffect(() => {

        const navBtn = navBtnRef.current;

        const handleResize = () => {

            if (typeof window !== 'undefined') {
                if (window.innerWidth < 768) {
                    navBtn?.addEventListener('click', toggleSidebar);
                    navBtn?.removeEventListener('mouseenter', handleMouseEnter);
                    navBtn?.removeEventListener('mouseleave', handleMouseLeave);
                } else {
                    navBtn?.removeEventListener('click', toggleSidebar);
                    navBtn?.addEventListener('mouseenter', handleMouseEnter);
                    navBtn?.addEventListener('mouseleave', handleMouseLeave);
                }
            }
        };

        const toggleSidebar = () => setSidebar(prevState => !prevState);
        const handleMouseEnter = () => setDropDown(true);
        const handleMouseLeave = () => setDropDown(false);

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            navBtn?.removeEventListener('click', toggleSidebar);
            navBtn?.removeEventListener('mouseenter', handleMouseEnter);
            navBtn?.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, []);

    if (!auth || !auth.user) return null;

    const userName = auth.user?.username || "";
    const userAvatar = auth.user.userAvatar?.src || "default-avatar.svg";

    return (
        <React.Fragment>
            <div aria-label="User menu" ref={navBtnRef} className="relative">
                <div className="w-10 h-10 p-0.5 rounded-full ring-2 ring-indigo-600 dark:ring-indigo-600 cursor-pointer">
                    <div className="relative w-full h-full">
                        <Image 
                            src={`/avatars/${userAvatar}`}
                            alt={userName} 
                            fill     
                            sizes="100%"
                            className='rounded-full object-cover' 
                        />
                    </div>
                </div>
                { dropDown && <Dropdown closeDropdown={() => setDropDown(false)}/> }
            </div> 
            { sidebar && <Sidebar closeSidebar={() => setSidebar(false)}/> }
        </React.Fragment>
    );
}

export default NavAuth;
