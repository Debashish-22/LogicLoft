import React, { useCallback, useEffect, useReducer, useRef } from "react";

import Image from "next/image";

import axiosInstance from "@/utils/axios";

import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";

import { ToastType } from "@/context/toastContextProvider";

import LoadingButton from "../UI/buttons/LoadingButton";

interface Avatar {
    _id: string,
    src: string
}

type Action = 
  | { type: 'SET_RENDERED', payload: boolean }
  | { type: 'SET_BTN_LOADING', payload: boolean }
  | { type: 'SET_PAGE_LOADING', payload: boolean }
  | { type: 'SET_NEXT', payload: boolean }
  | { type: 'SET_PREV', payload: boolean }
  | { type: 'SET_ITEM_PER_SIDE', payload: number }
  | { type: 'SET_AVATARS', payload: Avatar[] }
  | { type: 'SET_AVATAR_ID', payload: string };

interface State {
    rendered: boolean,
    btnLoading: boolean,
    pageLoading: boolean,
    next: boolean,
    prev: boolean,
    itemPerSide: number,
    avatars: Avatar[],
    avatarId: string
}

const initialState: State = {
    rendered: false,
    btnLoading: false,
    pageLoading: true,
    next: false,
    prev: false,
    itemPerSide: 0,
    avatars: [],
    avatarId: ""
}

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_RENDERED":
            return { ...state, rendered: action.payload };
        case 'SET_BTN_LOADING':
            return { ...state, btnLoading: action.payload };
        case 'SET_PAGE_LOADING':
            return { ...state, pageLoading: action.payload };
        case 'SET_NEXT':
            return { ...state, next: action.payload };
        case 'SET_PREV':
            return { ...state, prev: action.payload };
        case 'SET_ITEM_PER_SIDE':
            return { ...state, itemPerSide: action.payload };
        case 'SET_AVATARS':
            return { ...state, avatars: [...state.avatars, ...action.payload] };
        case 'SET_AVATAR_ID':
            return { ...state, avatarId: action.payload };
        default: return state;
    }
}

const Avatar = () => {

    const frameDim = 144;
    const itemDim = 80;
    const gap = 40;

    const auth = useAuth();
    const modal = useModal();
    const toast = useToast();
    const toastRef = useRef(toast);

    const sliderRef = useRef<HTMLDivElement>(null);

    const [state, dispatch] = useReducer(reducer, initialState);

    const handleCloseModal = () => modal?.closeModal();

    useEffect(() => {
        toastRef.current = toast;
    }, [toast]);

    const fetchAvatars = async() => {

        dispatch({ type: "SET_PAGE_LOADING", payload: true})

        try {
            const URI = `/avatars`;

            const res = await axiosInstance.get(URI);

            let {success, avatars} = await res.data;

            if(success){

                avatars.unshift({
                    _id: "default",
                    src: "default-avatar.svg"
                });
    
                dispatch({ type: "SET_AVATARS", payload: avatars});
                dispatch({ type: "SET_RENDERED", payload: true});
            }

        } catch (error) {
            toast.renderToast("Something went wrong!", ToastType.Error);
        } finally {
            dispatch({ type: "SET_PAGE_LOADING", payload: false});
        }
    }

    const fetchAvatarsCallback = useCallback(fetchAvatars, [toastRef]);

    useEffect(() => {

        fetchAvatarsCallback();

        if(auth.user.userAvatar){
            dispatch({ type: "SET_AVATAR_ID", payload: auth.user.userAvatar['_id']});
        } else {
            dispatch({ type: "SET_AVATAR_ID", payload: "default"});
        }
    }, [fetchAvatarsCallback, auth.user.userAvatar]);

    useEffect(() => {
       
        if (state.rendered && sliderRef.current) {
            const sliderXDim = sliderRef.current.clientWidth;
            const perSide = Math.floor((((sliderXDim / 2) - (frameDim / 2)) - gap) / (itemDim + gap));
            dispatch({ type: "SET_ITEM_PER_SIDE", payload: perSide });
        }
    }, [state.rendered]);
    
    useEffect(() => {
        if (state.rendered && sliderRef.current) {
            slideTo(state.avatarId);
            const children = Array.from(sliderRef.current.children);
            let index = children.findIndex((child) => child.getAttribute('data-avatar-id') === state.avatarId);
            index = index === -1 ? 0 : index;
            children[(index + 1) + state.itemPerSide] ? dispatch({ type: "SET_NEXT", payload: true }) : dispatch({ type: "SET_NEXT", payload: false });
            children[(index - 1) - state.itemPerSide] ? dispatch({ type: "SET_PREV", payload: true }) : dispatch({ type: "SET_PREV", payload: false });
        }
    }, [state.rendered, state.itemPerSide, state.avatarId]);
    
    const handleSliderTools = (direction: boolean = false) => {

        if(sliderRef.current){

            const children = Array.from(sliderRef.current.children);

            let index = children.findIndex((child) => child.getAttribute('data-avatar-id') == state.avatarId);

            index = index === -1 ? 0 : index;

            const element = direction ? children[(index - 1) - (state.itemPerSide)] : children[(index + 1) + (state.itemPerSide)];

            if(element){

                const avatarId = direction ? children[(index - 1) - state.itemPerSide].getAttribute('data-avatar-id') : children[(index + 1) + (state.itemPerSide)].getAttribute('data-avatar-id');

                avatarId && dispatch({ type: "SET_AVATAR_ID", payload: avatarId});
            }

        }
    };

    const slideTo = (element: string) => {

        if(sliderRef.current){

            const children = Array.from(sliderRef.current.children);
    
            let index = children.findIndex((child) => child.getAttribute('data-avatar-id') === element);
    
            index = index === -1 ? 0 : index;
    
            const initial = ((children.length) - 1) * 60;
    
            const val = (initial - (12*10*(index)))/16;
    
            sliderRef.current.style.transform  = `translateX(${val}rem)`;
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        
        if (event !== null && event.currentTarget instanceof HTMLElement){
            
            const avatarId = event.currentTarget.dataset.avatarId;

            avatarId && dispatch({ type: "SET_AVATAR_ID", payload: avatarId});
        }
    }

    const handleSubmit = async() => {

        dispatch({ type: "SET_BTN_LOADING", payload: true});

        const newAvatarId = state.avatarId === "default" ? null : state.avatarId;

        try {

            const URI = `/profile/update-avatar`;
    
            const response = await axiosInstance.post(URI, { newAvatarId });

            const data = await response.data;

            if(data.success){

                auth?.fetchUser()!;
    
                toast.renderToast("Successfully updated Avatar!", ToastType.Success);
            }
            
        } catch (error) {
            toast.renderToast("Something went wrong!", ToastType.Error);
        } finally {
            dispatch({ type: "SET_BTN_LOADING", payload: false});
        }
    };

    return (
        <React.Fragment>
            <div className={`${state.rendered ? "show" : ""} z-30 modal min-h-screen w-screen backdrop-blur-sm flex justify-center items-center fixed top-0 left-0 bg-slate-200/30 dark:bg-slate-900/20`}>

                <div className="modal-child flex flex-col justify-center items-center h-screen w-full px-6">
                    <h3 className="mb-16 text-xl font-semibold text-slate-700 dark:text-slate-50">Update Avatar</h3>

                    <div className="relative h-44 w-full mb-16 overflow-hidden">
                        {
                            state.prev
                            &&
                            <div className="flex justify-center items-center absolute left-0 top-0 z-20 h-full w-16">
                                <button onClick={() => handleSliderTools(true)} className="flex justify-center items-center h-full w-16 bg-gradient-to-r from-slate-100 dark:from-slate-900">
                                    <svg className="fill-slate-700 dark:fill-slate-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                                        <path d="M7.758 12.742a1.05 1.05 0 0 1 0-1.484l6-6a1.05 1.05 0 1 1 1.484 1.484L9.985 12l5.257 5.258a1.05 1.05 0 1 1-1.484 1.484l-6-6Z"/>
                                    </svg>
                                </button>
                            </div>
                        }
                        {
                            state.next 
                            &&
                            <div className="flex justify-center items-center absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-slate-100 dark:from-slate-900">
                                <button onClick={() => handleSliderTools()} className="flex justify-center items-center h-full w-16">
                                    <svg className="fill-slate-700 dark:fill-slate-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                                        <path d="m16.242 12.742-6 6a1.05 1.05 0 0 1-1.484-1.484L14.015 12 8.758 6.742a1.05 1.05 0 0 1 1.484-1.484l6 6c.41.41.41 1.074 0 1.484Z"/>
                                    </svg>
                                </button>
                            </div>
                        }

                        <div className="z-20 cursor-pointer absolute top-1/2 left-1/2 h-[144px] w-[144px] -translate-x-1/2 -translate-y-1/2 border-2 border-slate-300 rounded-full">
                            <div className="absolute right-0 bottom-0 rounded-full h-10 w-10 bg-slate-300 flex justify-center items-center">
                                <svg className="fill-slate-900" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                    <path d="m21.71 6.71-12 12a1 1 0 0 1-1.41 0l-6-6a1 1 0 0 1 1.41-1.41L9 16.59l11.29-11.3A1 1 0 0 1 21.7 6.7Z"/>
                                </svg>
                            </div>
                        </div>

                        <div className="h-full w-full">
                            {
                                <div ref={sliderRef} className="h-full flex justify-center items-center gap-10 transition-transform ease-out duration-500">
                                    {
                                        state.pageLoading
                                        ?
                                        <div className="h-full flex justify-center items-center gap-10 animate-pulse">
                                            <div className="h-20 w-20 min-w-[80px] rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                            <div className="h-20 w-20 min-w-[80px] rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                            <div className="h-20 w-20 min-w-[80px] rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                            <div className="h-20 w-20 min-w-[80px] rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                            <div className="h-[136px] w-[136px] min-w-[136px] rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                            <div className="h-20 w-20 min-w-[80px] rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                            <div className="h-20 w-20 min-w-[80px] rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                            <div className="h-20 w-20 min-w-[80px] rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                            <div className="h-20 w-20 min-w-[80px] rounded-full bg-slate-300 dark:bg-slate-700"></div>
                                        </div>
                                        :
                                        state.avatars.map((data, index) => {
                                                return (
                                                    <div 
                                                        key={index} 
                                                        data-avatar-id={data['_id']}
                                                        onClick={(e) => handleClick(e)}
                                                        onMouseOver={(e) => (e.target as HTMLDivElement).style.transform = 'scale(1.4)'}
                                                        onMouseOut={(e) => (e.target as HTMLDivElement).style.transform = 'scale(1)'}
                                                        className={`${state.avatarId === data['_id'] ? `h-[136px] w-[136px] min-w-[136px] pointer-events-none` : 'h-20 w-20 min-w-[80px] cursor-pointer'} relative rounded-full duration-700`}
                                                    >
                                                        <Image 
                                                            src={`/avatars/${data.src}`}
                                                            fill
                                                            style={{
                                                                objectFit: 'cover',
                                                                objectPosition: 'center'
                                                            }}
                                                            alt="avatar"
                                                            className="absolute -top-[0.4%] -left-[0.4%] transition-transform rounded-full"
                                                        />
                                                    </div>
                                                )
                                            })
                                        }
                                </div>
                            }
                        </div>

                    </div>
                    {
                        state.pageLoading
                        ?
                        <div className="flex space-x-9 animate-pulse">
                            <div className="h-12 w-32 rounded-lg bg-slate-300 dark:bg-slate-700"></div>
                            <div className="h-12 w-32 rounded-lg bg-slate-300 dark:bg-slate-700"></div>
                        </div>
                        :
                        <div className="flex items-center space-x-9">

                            <button onClick={handleCloseModal} className="h-12 w-32 rounded-lg shadow-md bg-slate-200 dark:bg-slate-800/70">
                                <span className="text-sm font-medium text-slate-700 dark:text-slate-100">Cancel</span>
                            </button>

                            <LoadingButton 
                                btnText={"Update"}
                                height="h-12" 
                                width="w-32"
                                onClick={handleSubmit} 
                                loading={state.btnLoading} 
                            />
                        </div>
                    }

                </div>

            </div>
        </React.Fragment>
    )
}

export default Avatar;