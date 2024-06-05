"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

import axiosInstance from "@/utils/axios";

import useToast from "@/hooks/useToast";

import { ToastType } from "@/context/toastContextProvider";
import Spinner from "@/components/UI/buttons/Spinner";

const Devices = () => {

    const toast = useToast();
    const toastRef = useRef(toast);

    const [pageLoading, setPageLoading] = useState(true);
    const [devices, setDevices] = useState([]);
    const [selectedDevices, setSelectedDevices] = useState<string[]>([]);

    useEffect(() => {
        toastRef.current = toast;
    }, [toast]);

    const fetchDevices = useCallback(async () => {

        setPageLoading(true);

        try {

            const URI = `/profile/devices`;

            const response = await axiosInstance.get(URI);

            const { success, data } = await response.data;

            success && setDevices(data);

        } catch (error) {
            toastRef.current.renderToast("Something went wrong", ToastType.Error);
        } finally {
            setPageLoading(false);
        }
    }, []);

    useEffect(() => { fetchDevices() }, [fetchDevices]);

    const handleDevice = async(deviceId: string) => {

        setSelectedDevices(prevDevices => [...prevDevices, deviceId]);

        try {

            const URI = `/profile/revoke-device`;

            const response = await axiosInstance.post(URI, { deviceId });

            const { success } = await response.data;

            if(success){
                toast.renderToast("Device Logged Out Successfully", ToastType.Success);
                fetchDevices();
            }

        } catch (error) {
            toast.renderToast("Something went wrong", ToastType.Error);
        }
    }

    return(
        <React.Fragment>

        <div className="mb-9">
            <h2 className="mb-2.5 text-xl font-medium text-blue-600 dark:text-blue-400">Manage Your Devices</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">Access device information and keep your account secure.</p>
        </div>

        {
            pageLoading
            ?
            <div className="animate-pulse">
                <div className="py-5 flex items-center justify-between border-b border-slate-300 dark:border-slate-800/60">
                    <div className="flex space-x-4 items-center">
                        <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                        <div className="space-y-3">
                            <div className="h-3 w-32 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
                            <div className="h-2 w-64 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
                        </div>
                    </div>
                    <div className="h-10 w-28 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
                </div>

                <div className="py-5 flex items-center justify-between border-b border-slate-300 dark:border-slate-800/60">
                    <div className="flex space-x-4 items-center">
                        <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                        <div className="space-y-3">
                            <div className="h-3 w-32 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
                            <div className="h-2 w-64 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
                        </div>
                    </div>
                    <div className="h-10 w-28 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
                </div>

                <div className="py-5 flex items-center justify-between border-b border-slate-300 dark:border-slate-800/60">
                    <div className="flex space-x-4 items-center">
                        <div className="h-10 w-10 rounded-full bg-slate-300 dark:bg-slate-700"></div>
                        <div className="space-y-3">
                            <div className="h-3 w-32 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
                            <div className="h-2 w-64 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
                        </div>
                    </div>
                    <div className="h-10 w-28 bg-slate-300 dark:bg-slate-700 rounded-lg"></div>
                </div>
            </div>
            :
            <div>
                {
                    devices.map((device) => { 

                        const { deviceId, platform, login, currentDevice } = device;

                        const platformData = JSON.parse(platform);

                        const deviceInfo = `${platformData.name} on ${platformData.os.family}`;

                        const loginDate = new Date(login);
                        const today = new Date();

                        // const lastLogin = (loginDate.getDate() === today.getDate() && loginDate.getMonth() === today.getMonth() && loginDate.getFullYear() === today.getFullYear()) ? "Today" : loginDate.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'}) ;

                        const lastLogin = loginDate.toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'});

                        return (
                            <div key={deviceId} className="py-5 flex items-center justify-between border-b border-slate-200 dark:border-slate-800/60">
                                <div className="flex space-x-4 items-center">
                                    <Image
                                        height={40}
                                        width={40}
                                        src={`/devices/${platformData.name.trim().toLowerCase().replace(" ", "-")}.svg`}
                                        alt={deviceInfo}
                                    />
                                    <div className="space-y-1">
                                        <h3 className="text-sm text-slate-700 dark:text-slate-200">{deviceInfo}</h3>
                                        <p className="text-xs text-slate-600 dark:text-slate-400">Last accessed on: {lastLogin}</p>
                                    </div>
                                </div>
                                {
                                    currentDevice
                                    ?
                                    <div className="h-11 w-28 flex items-center justify-center">
                                        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Current Device</span>
                                    </div>
                                    :
                                    <button 
                                        aria-label="Revoke device"
                                        onClick={() => handleDevice(deviceId)}
                                        type="button" 
                                        className="h-11 w-28 rounded-lg bg-slate-100 dark:bg-slate-800/50"
                                    >
                                        {selectedDevices.includes(deviceId) ? <Spinner fill={"stroke-slate-600 dark:stroke-slate-50"} /> : <span className="text-xs font-medium ex-slate-600 dark:text-slate-200">Log Out</span>}
                                    </button>
                                       
                                }
                            </div>
                        )
                    })
                }
            </div>
        }
                
        </React.Fragment>
    );
}

export default Devices;