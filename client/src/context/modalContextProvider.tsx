"use client";

import React, { useState, createContext } from "react";
import { createPortal } from "react-dom";

import AuthModal from "@/components/UI/modals/auth/AuthModal";

import { AuthModalProvider } from "./authModalContextProvider";
import LogOut from "@/components/UI/modals/auth/LogOut";
import Avatar from "@/components/avatar/Avatar";
import AccountDelete from "@/components/UI/modals/auth/AccountDelete";

enum ModalType {
    AUTH_MODAL = 'AUTH_MODAL',
    LOGOUT_MODAL = 'LOGOUT_MODAL',
    AVATAR_MODAL = 'AVATAR_MODAL',
    ACCOUNT_DELETE_MODAL = 'ACCOUNT_DELETE_MODAL'
}

type RenderModal = (type: ModalType, mode?: string) => void;

interface ModalContext {
    renderModal: RenderModal
    closeModal: () => void
    modalMode?: string
}

interface ModalProvider{
    children: React.ReactNode
}

const ModalContext = createContext<ModalContext>({
    renderModal: () => {},
    closeModal: () => {},
    modalMode: ""
});

const ModalProvider = (props: ModalProvider) => {

    const [modal, setModal] = useState(false);

    const [modalType, setModalType] = useState<ModalType | null>(null);

    const [modalMode, setModalMode] = useState("");

    const modalManager = (type: ModalType | null) => {

        switch(type) {
          case ModalType.AUTH_MODAL: return <AuthModalProvider><AuthModal /></AuthModalProvider>;
          case ModalType.LOGOUT_MODAL: return <LogOut />;
          case ModalType.AVATAR_MODAL: return <Avatar />;
          case ModalType.ACCOUNT_DELETE_MODAL: return <AccountDelete />;
          default: return null;
        }
    };

    const renderModal:RenderModal = (type, mode) => {
        setModal(true);
        setModalType(type);
        setModalMode(mode || "");
    };

    const closeModal = () => {
        setModal(false);
        setModalType(null);
    };

    return(
        <ModalContext.Provider value={{renderModal, closeModal, modalMode}}>
            {props.children}
            {modal && document.body ? createPortal(modalManager(modalType), document.body) : null}
        </ModalContext.Provider>
    )
}

export {
    ModalType,
    ModalContext,
    ModalProvider
}