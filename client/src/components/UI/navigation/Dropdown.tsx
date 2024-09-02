import React, { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

import useModal from "@/hooks/useModal";
import useAuth from "@/hooks/useAuth";

import { User } from "@/context/authContextProvider";
import { ModalType } from "@/context/modalContextProvider";

interface DropdownProps {
  closeDropdown: () => void;
}

const Dropdown: React.FC<DropdownProps> = ({ closeDropdown }) => {
  const modal = useModal();
  const auth = useAuth() as User;
  const logOutBtnRef = useRef<HTMLButtonElement>(null);

  const handleLogout = useCallback(() => {
    if (modal) {
      modal.renderModal(ModalType.LOGOUT_MODAL);
    }
  }, [modal]);

  useEffect(() => {
    const logOutBtn = logOutBtnRef.current;
    if (logOutBtn) {
      logOutBtn.addEventListener("click", handleLogout);
      return () => {
        logOutBtn.removeEventListener("click", handleLogout);
      };
    }
  }, [handleLogout]);

  if (!modal || !auth) return null;

  const userName = auth.user?.username || "";
  const email = auth.user?.email || "";
  const userAvatar = auth.user?.userAvatar?.src || "default-avatar.svg";

  return (
    <div className="absolute top-full right-0 rounded-lg shadow-md bg-white dark:bg-slate-800">
      <div className="p-3.5 space-x-3 flex items-center border-b dark:border-slate-700/80">
        <div className="h-10 w-10 p-0.5 rounded-full ring-2 ring-indigo-600 dark:ring-indigo-600">
          <div className="relative w-full h-full">
            <Image
              src={`/avatars/${userAvatar}`}
              alt={userName}
              fill
              sizes="100%"
              className="rounded-full object-cover"
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
            onClick={closeDropdown}
            prefetch={false}
            href="/account"
            className="inline-block w-full text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 hover:dark:text-slate-200 transition-colors"
          >
            My Profile
          </Link>
        </li>
        <li>
          <Link
            onClick={closeDropdown}
            prefetch={false}
            href="/account/devices"
            className="inline-block w-full text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 hover:dark:text-slate-200 transition-colors"
          >
            My Devices
          </Link>
        </li>
        <li>
          <Link
            onClick={closeDropdown}
            prefetch={false}
            href="/account/subscription"
            className="inline-block w-full text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 hover:dark:text-slate-200 transition-colors"
          >
            My Subscriptions
          </Link>
        </li>
        <li>
          <button
            ref={logOutBtnRef}
            className="w-full text-left text-sm font-medium text-slate-600 hover:text-slate-800 dark:text-slate-400 hover:dark:text-slate-200 transition-colors"
          >
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;
