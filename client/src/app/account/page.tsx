"use client";

import React, { useCallback, useEffect, useReducer, useRef } from "react";
import Image from "next/image";

import axiosInstance from "@/utils/axios";

import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import { ToastType } from "@/context/toastContextProvider";
import { ModalType } from "@/context/modalContextProvider";

import LoadingButton from "@/components/UI/buttons/LoadingButton";

const usernameMinLen = 3;

const usernameEmptyMsg = "Username is missing";
const usernameInvalidMsg = `Username must have atleast ${usernameMinLen} characters.`;
const serverErrorMSg = "Something went wrong.";

enum ActionEnum {
    formDataHandle = "FORM_DATA_HANDLE",
    formDataReset = "FORM_DATA_RESET",
    formErrorHandle = "FORM_ERROR_HANDLE",
    btnLoading = "BTN_LOADING",
    btnDefault = "BTN_DEFAULT",
    pageDefault = "PAGE_DEFAULT",
    btnEnable = "BTN_ENAbLE"
}

interface Action {
    type: ActionEnum;
    data?: object;
}

interface State {
    formData: {
        userAvatar: string | null;
        username: string | null;
        designation: string | null;
        city: string | null;
        state: string | null;
        country: string | null;
    },
    errors:{
        username: string;
        designation: string;
        city: string;
        state: string;
        country: string;
    },
    btnLoading: boolean,
    pageLoading: boolean,
    btnDisable: boolean
}

const initialState: State = {
    formData: {
        userAvatar: null,
        username: null,
        designation: null,
        city: null,
        state: null,
        country: null
    },
    errors: {
        username: "",
        designation: "",
        city: "",
        state: "",
        country: ""
    },
    btnLoading: false,
    pageLoading: true,
    btnDisable: true
}

const reducer = (state: State, action: Action): any => {
    switch (action.type) {
        case ActionEnum.formErrorHandle:
            if (action.data) {
                return {...state, errors: {...state.errors, ...action.data}};
            }
            return state;
        case ActionEnum.formDataHandle:
            if (action.data) {
                return {...state, formData: action.data};
            }
            return state;
        case ActionEnum.formDataReset:
            return {...state, formData: { username: null, designation: null, city: null, state: null, country: null }, errors: { username: "", designation: "", state: "", country: "" }, btnLoading: false, pageLoading: true, btnDisable: true };
        case ActionEnum.pageDefault:
            return {...state, pageLoading: false};
        case ActionEnum.btnLoading:
            return {...state, btnLoading: true};
        case ActionEnum.btnDefault:
            return {...state, btnLoading: false};
        case ActionEnum.btnEnable:
            return {...state, btnDisable: false};
        default: return state;
    }
}

const Profile = () => {

    const modal = useModal();
    const toast = useToast();
    const auth = useAuth();
    const toastRef = useRef(toast);

    const handleAvatar = () => modal?.renderModal(ModalType.AVATAR_MODAL);

    const [state, dispatch] = useReducer(reducer, initialState);

    const usernameRef = useRef<HTMLInputElement>(null);
    const designationRef = useRef<HTMLInputElement>(null);
    const cityRef = useRef<HTMLInputElement>(null);
    const stateRef = useRef<HTMLInputElement>(null);
    const countryRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        toastRef.current = toast;
    }, [toast]);

    const formDataRef = useRef(state.formData);
    formDataRef.current = state.formData;

    const fetchProfile = useCallback(async () => {
        
        dispatch({ type: ActionEnum.formDataReset });

        try {
            const URI = `/auth/auth-user`;

            const response = await axiosInstance.get(URI);

            if (response && response.data) {
                const { success, user } = await response.data;

                if (success) {
                    const { username, designation, city, state, country } = user;
                    const userAvatar = (user.userAvatar && user.userAvatar.src) ? user.userAvatar.src : "default-avatar.svg";

                    dispatch({ type: ActionEnum.formDataHandle, data: { ...formDataRef.current, userAvatar, username, designation, city, state, country } });
                }
            }
        } catch (error) {
            toastRef.current.renderToast(serverErrorMSg, ToastType.Error);
        } finally {
            dispatch({ type: ActionEnum.pageDefault });
        }
    }, [toastRef]);

    useEffect(() => { fetchProfile() }, [fetchProfile]);

    const focus = (reference: React.RefObject<HTMLInputElement>) => reference.current && reference.current.focus();

    const formMessenger = (key: string, value: string) => dispatch({ type: ActionEnum.formErrorHandle, data: { [key]: value } });

    const validateField = (name: string, value: string) => {

        if(name === "username"){
            if(value.length === 0){
                return usernameEmptyMsg;
            } else if(value.length < usernameMinLen){
                return usernameInvalidMsg;
            }
        }
    
        return "";
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        dispatch({type: ActionEnum.btnEnable});

        const {name, value} = e.target;

        const updatedData = {
            ...state.formData,
            [name]: value.trim().length === 0 ? value.replace(" ", "") : value
        };

        const errorMessage = validateField(name, value);

        errorMessage ? formMessenger(name, errorMessage) : formMessenger(name, "");

        dispatch({type: ActionEnum.formDataHandle, data: updatedData});
    }

    const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {

        if(e)e.preventDefault();

        const { username = '', } = state.formData;

        const fields = [
            { name: 'username', value: username, ref: usernameRef }
        ];

        for (let field of fields) {
            const errorMessage = validateField(field.name, field.value);
            if(errorMessage){
                formMessenger(field.name, errorMessage);
                focus(field.ref);
                return;
            } else {
                formMessenger(field.name, "");
            }
        }

        updateProfile();
    }

    const updateProfile = async() => {

        dispatch({ type: ActionEnum.btnLoading });

        const { userAvatar, ...profileData} = state.formData;

        try {

            const URI = `/profile/update`;
    
            const response = await axiosInstance.post(URI, profileData);

            if(response && response.data){

                const { success } = await response.data;

                if(success){

                    // updating context
                    await auth.fetchUser();

                    //  re rendering profile
                    await fetchProfile();

                    toast.renderToast("Profile Updated", ToastType.Success);
                }
            }
            
        } catch (error) {
            toast.renderToast(serverErrorMSg, ToastType.Error);
        } finally {
            dispatch({ type: ActionEnum.btnDefault });
        }
    }

    return(
        <React.Fragment>

            <div className="mb-9">
                <h2 className="mb-2.5 text-xl font-medium text-blue-600 dark:text-blue-400">Profile</h2>
                <p className="text-sm text-slate-700 dark:text-slate-400">This information will be displayed on your public profile.</p>
            </div>

            {
                state.pageLoading
                ?
                <div className="flex flex-col space-y-8 px-2 pb-8 animate-pulse">
                    <div className="grid grid-cols-12 gap-5 items-center">
                        <div className="col-span-3 h-2 rounded-md bg-slate-300 dark:bg-slate-700"></div>
                        <div className="col-span-9">
                            <div className="h-14 w-14 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-5 items-center">
                        <div className="col-span-3 h-2 rounded-md bg-slate-300 dark:bg-slate-700"></div>
                        <div className="col-span-9 h-2 rounded-md bg-slate-300 dark:bg-slate-700"></div>
                    </div>
                    <div className="grid grid-cols-12 gap-5 items-center">
                        <div className="col-span-3 h-2 rounded-md bg-slate-300 dark:bg-slate-700"></div>
                        <div className="col-span-9 h-2 rounded-md bg-slate-300 dark:bg-slate-700"></div>
                    </div>
                    <div className="grid grid-cols-12 gap-5 items-center">
                        <div className="col-span-3 h-2 rounded-md bg-slate-300 dark:bg-slate-700"></div>
                        <div className="col-span-9 h-2 rounded-md bg-slate-300 dark:bg-slate-700"></div>
                    </div>
                </div>
                :
                <form className="relative">

                    <div className="flex flex-col space-y-8 px-2 pb-8">
                        <div className="grid grid-cols-12 gap-5 items-center">
                            <p className="col-span-3 text-sm font-normal text-slate-700 dark:text-slate-300">Avatar</p>
                            <div className="col-span-9 flex items-center flex-wrap gap-6">
                                <div className="h-20 w-20 rounded-full overflow-hidden">
                                    <Image 
                                        height={80}
                                        width={80}
                                        priority={true}
                                        src={state.formData.userAvatar ? `/avatars/${state.formData.userAvatar}` : `/avatars/default-avatar.svg`}
                                        alt={state.formData.username || "Username"} 
                                        className='rounded-full object-center object-cover' 
                                    />
                                </div>
                                <button onClick={handleAvatar} type="button" className="h-11 w-28 rounded-lg bg-slate-200 dark:bg-slate-800/50 ">
                                    <span className="text-xs font-medium text-slate-700 dark:text-slate-400">Change</span>
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5 items-center">
                            <label className="col-span-3 text-sm font-normal text-slate-700 dark:text-slate-300" htmlFor="username">Username</label>
                            <div className="col-span-9 relative">
                                <input 
                                    name="username"
                                    value={state.formData.username || ""}
                                    ref={usernameRef}
                                    type="text"
                                    onChange={handleChange}
                                    className="text-sm w-full py-3 px-3.5 focus:outline-none rounded-lg text-slate-700 dark:text-white border border-slate-300/50 bg-slate-200 dark:border-slate-700/50 dark:bg-slate-800/50" 
                                />
                                <span className="absolute left-0 top-full text-xs p-1 text-red-700 dark:text-red-300">{state.errors.username}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5 items-center">
                            <label className="col-span-3 text-sm font-normal text-slate-700 dark:text-slate-300" htmlFor="designation">Designation</label>
                            <div className="col-span-9 relative">
                                <input 
                                    type="text"
                                    name="designation"
                                    ref={designationRef}
                                    value={state.formData.designation || ""}
                                    onChange={handleChange}
                                    className="text-sm w-full py-3 px-3.5 focus:outline-none rounded-lg text-slate-700 dark:text-white border border-slate-300/50 bg-slate-200 dark:border-slate-700/50 dark:bg-slate-800/50" 
                                />
                                <span className="absolute left-0 top-full text-xs p-1 text-red-700 dark:text-red-300">{state.errors.designation}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5 items-center">
                            <label className="col-span-3 text-sm font-normal text-slate-700 dark:text-slate-300" htmlFor="city">City</label>
                            <div className="col-span-9 relative">
                                <input 
                                    type="text"
                                    name="city"
                                    ref={cityRef}
                                    value={state.formData.city || ""}
                                    onChange={handleChange}
                                    className="text-sm w-full py-3 px-3.5 focus:outline-none rounded-lg text-slate-700 dark:text-white border border-slate-300/50 bg-slate-200 dark:border-slate-700/50 dark:bg-slate-800/50" 
                                />
                                <span className="absolute left-0 top-full text-xs p-1 text-red-700 dark:text-red-300">{state.errors.city}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5 items-center">
                            <label className="col-span-3 text-sm font-normal text-slate-700 dark:text-slate-300" htmlFor="state">State</label>
                            <div className="col-span-9 relative">
                                <input 
                                    type="text"
                                    name="state"
                                    ref={stateRef}
                                    value={state.formData.state || ""}
                                    onChange={handleChange}
                                    className="text-sm w-full py-3 px-3.5 focus:outline-none rounded-lg text-slate-700 dark:text-white border border-slate-300/50 bg-slate-200 dark:border-slate-700/50 dark:bg-slate-800/50" 
                                />
                                <span className="absolute left-0 top-full text-xs p-1 text-red-700 dark:text-red-300">{state.errors.state}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-12 gap-5 items-center">
                            <label className="col-span-3 text-sm font-normal text-slate-700 dark:text-slate-300" htmlFor="country">Country</label>
                            <div className="col-span-9 relative">
                                <input 
                                    type="text"
                                    name="country"
                                    ref={countryRef}
                                    value={state.formData.country || ""}
                                    onChange={handleChange}
                                    className="text-sm w-full py-3 px-3.5 focus:outline-none rounded-lg text-slate-700 dark:text-white border border-slate-300/50 bg-slate-200 dark:border-slate-700/50 dark:bg-slate-800/50" 
                                />
                                <span className="absolute left-0 top-full text-xs p-1 text-red-700 dark:text-red-300">{state.errors.country}</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-5 sticky z-10 bottom-0 text-center border-t border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900">
                        <LoadingButton 
                            type={"submit"} 
                            btnText={"Save Changes"}
                            height="h-12" 
                            width="w-32"
                            onClick={handleSubmit} 
                            loading={state.btnLoading} 
                            disable={state.btnDisable}
                        />
                    </div>
                </form>
            }
                
        </React.Fragment>
    );
}

export default Profile;