"use client";

import { useState, useEffect, useRef } from "react";

import axiosInstance from "@/utils/axios";
import useToast from "@/hooks/useToast";
import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";

import { ModalType } from "@/context/modalContextProvider";
import { ToastType } from "@/context/toastContextProvider";
import Script from "next/script";
import { useRouter } from "next/navigation";

interface Plan {
    _id: string;
    name: string;
    description: string;
    planType: string;
    amount: string;
    currency: string;
    duration: string;
    featurePoints: string[];
    isPopular: boolean;
}

const Pricing = () => {

    const auth = useAuth();

    if (!auth) return null;

    const isAuthentic = auth.authenticated;

    const { username, email, accountType } = auth.user;    

    const modal = useModal();
    const toast = useToast();
    const toastRef = useRef(toast);
    const router = useRouter();

    const [pageLoading, setPageLoading] = useState(true);
    const [plans, setPlans] = useState<Plan[]>([]);

    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        toastRef.current = toast;
    }, [toast]);

    const fetchPlans = async() => {
        try {

            const URI = `/plans/`;
            
            const response = await axiosInstance.get(URI);

            const { success, plans } = await response.data;

            success && setPlans(plans);
            
        } catch (error) {

            toast.renderToast("Something went wrong", ToastType.Error);
        } finally {
            setPageLoading(false);
        }
    }

    useEffect(() => { fetchPlans() }, []);

    const handleAuth = (mode?: string) => modal?.renderModal(ModalType.AUTH_MODAL, mode);

    const selectPlan = async (planId: string) => {

        setIsProcessing(true);
        await initiateOrder(planId);
        setIsProcessing(false);
    };

    const initiateOrder = async(planId: string) => {

        try {
            
            const URI = `/order/initialise-order`;
            
            const response = await axiosInstance.post(URI, { planId });

            const { order, subscriptionId } = response.data;            

            order && initiatePayment(order, subscriptionId);

        } catch (error) {
            console.log(error)
            toast.renderToast("Something went wrong", ToastType.Error);
        }
    }

    const initiatePayment = async(order: any, subscriptionId: string) => {

        const { id, amount, currency } = order;

        try {
          
            const options  = {
                key: process.env.RAZORPAY_KEY_ID,
                amount: amount,
                currency: currency,
                name: process.env.APP_NAME,
                description: 'Test Payment',
                order_id: id,
                handler: async function (response: any) {

                    const data = {
                        orderCreationId: id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                        subscriptionId
                    };

                    const URI = `/order/verify-payment`;

                    const res = await axiosInstance.post(URI, data);

                    const { success } = res.data;

                    if (success){

                        await auth.fetchUser();

                        router.push("/account/subscription");
                    }
                    else {
                        toast.renderToast("Something went wrong", ToastType.Error);
                    }
                },
                prefill: {
                    name: username,
                    email
                },
                theme: {
                    color: '#3399cc',
                },
            };
            
            const paymentObject = new window.Razorpay(options);

            paymentObject.on('payment.failed', function (response: any) {
                toast.renderToast("Something went wrong", ToastType.Error);
            });

            paymentObject.open();

        } catch (error) {

            console.log(error);
            toast.renderToast("Something went wrong", ToastType.Error);
        }
    }

    const handlePlanUpgrade = () => {
        console.log("this feature coming soon");
    }

    return (
        <>
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:px-12">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-2 text-xl font-medium text-[#b3712c] dark:text-[#e0c67c]">Plans & Pricing</h2>
                    <p className="mb-5 text-sm text-slate-600 dark:text-slate-400">Simple pricing. No hidden fees. Advance your business.</p>
                </div>

                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                    {
                        pageLoading
                        ?
                        <>
                            <div className="animate-pulse h-72 w-[365px] bg-slate-300 dark:bg-slate-800 rounded-xl"></div>
                            <div className="animate-pulse h-72 w-[365px] bg-slate-300 dark:bg-slate-800 rounded-xl"></div>
                            <div className="animate-pulse h-72 w-[365px] bg-slate-300 dark:bg-slate-800 rounded-xl"></div>
                        </>
                        :
                        <>
                            <div className={`${accountType !== "FREE" ? "opacity-70" : ""} rounded-xl p-px bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800`}>

                                <div className="rounded-xl bg-white dark:bg-slate-900 p-4 text-left">
                                    <div className="mb-5">
                                        <p className="text-lg text-slate-700 dark:text-slate-200">Free Plan</p>
                                        <span className="text-xs text-slate-600 dark:text-slate-400">Explore our default Free Plan for immediate access!</span>
                                    </div>
                                    <h3 className="mb-6 text-3xl font-medium text-slate-700 dark:text-slate-50">&#8377;0.00 <span className="ml-1.5 text-xs font-normal text-slate-600 dark:text-slate-400">Forever</span></h3>
                                    <ul role="list" className="mb-8 space-y-3">
                                        <li className="flex items-center space-x-2.5">
                                            <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 144 143">
                                                <path className="fill-slate-500 dark:fill-slate-300" d="M142.504 72c-38.9 0-70.5 31.6-70.5 70.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-38.9-31.6-70.5-70.5-70.5-.3 0-.5-.2-.5-.5s.2-.5.5-.5c38.9 0 70.5-31.6 70.5-70.5 0-.3.2-.5.5-.5s.5.2.5.5c0 38.9 31.6 70.5 70.5 70.5.3 0 .5.2.5.5s-.2.5-.5.5Z"/>
                                            </svg>
                                            <span className="text-xs text-slate-600 dark:text-slate-300">Access on 3 supported devices at a time.</span>
                                        </li>
                                        <li className="flex items-center space-x-2.5">
                                            <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 144 143">
                                                <path className="fill-slate-500 dark:fill-slate-300" d="M142.504 72c-38.9 0-70.5 31.6-70.5 70.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-38.9-31.6-70.5-70.5-70.5-.3 0-.5-.2-.5-.5s.2-.5.5-.5c38.9 0 70.5-31.6 70.5-70.5 0-.3.2-.5.5-.5s.5.2.5.5c0 38.9 31.6 70.5 70.5 70.5.3 0 .5.2.5.5s-.2.5-.5.5Z"/>
                                            </svg>
                                            <span className="text-xs text-slate-600 dark:text-slate-300">No setup, or hidden fees</span>
                                        </li>
                                    </ul>
                                    <div className="h-12 w-full rounded-lg bg-slate-800 flex justify-center items-center">
                                        <span className="text-sm font-normal text-slate-50">Active Forever</span>
                                    </div>
                                </div>
                            </div>
                            {
                                plans.length > 0 && plans.map((data) => {

                                    const { _id, name, planType, description, amount, currency, duration, featurePoints, isPopular } = data;

                                    return (
                                        <div key={_id} className={ `${isPopular ? "rounded-xl p-px bg-gradient-to-b from-[#e0c67c] to-[#7B5C0A]" : "rounded-xl p-px bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800"} ${(accountType === "PREMIUM" && planType !== "PREMIUM") ? "opacity-70" : ""}`}>
                                            <div className="rounded-xl bg-white dark:bg-slate-900 p-4 text-left relative">
                                                {isPopular ? <span className="absolute top-4 right-4 bg-[#e0c67c] text-slate-950 text-xs font-medium me-2 px-2 py-0.5 rounded">Popular</span> : null}
                                                <div className="mb-5">
                                                    <p className="text-lg text-slate-700 dark:text-slate-200">{name}</p>
                                                    <span className="text-xs text-slate-600 dark:text-slate-400">{description}</span>
                                                </div>
                                                <h3 className="mb-6 text-3xl font-medium text-slate-700 dark:text-slate-50">&#8377;{amount}<span className="ml-1.5 text-xs font-normal text-slate-600 dark:text-slate-400">/ {duration} Months</span></h3>
                                                <ul role="list" className="mb-8 space-y-3">
                                                    {featurePoints.length> 0 && featurePoints.map((feature, index) => (
                                                        <li key={index} className="flex items-center space-x-2.5">
                                                            <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 144 143">
                                                                <path className="fill-slate-500 dark:fill-slate-300" d="M142.504 72c-38.9 0-70.5 31.6-70.5 70.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-38.9-31.6-70.5-70.5-70.5-.3 0-.5-.2-.5-.5s.2-.5.5-.5c38.9 0 70.5-31.6 70.5-70.5 0-.3.2-.5.5-.5s.5.2.5.5c0 38.9 31.6 70.5 70.5 70.5.3 0 .5.2.5.5s-.2.5-.5.5Z"/>
                                                            </svg>
                                                            <span className="text-xs text-slate-600 dark:text-slate-300">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <button 
                                                    disabled={isProcessing} 
                                                    onClick={() => {
                                                        if(isProcessing) return;

                                                        if(!isAuthentic){
                                                            handleAuth("LOGIN");
                                                        } else {

                                                            if(accountType === "FREE"){
                                                                selectPlan(_id);
                                                            } else if(accountType === "BASIC" && (planType === "PREMIUM")){
                                                                handlePlanUpgrade();
                                                            }
                                                        }
                                                    }}
                                                    className={`${isPopular ? "h-12 w-full rounded-lg bg-[#e0c67c]" : "h-12 w-full rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800"}`}
                                                >
                                                    <span className={`${isPopular ? "text-sm font-bold text-slate-900" : "text-sm font-medium text-white"}`}>{(accountType === planType) ? 'Current Plan' : `Upgrade to ${name}`}</span>
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </>
                    }
                </div>
            </div>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
        </>
    )
}

export default Pricing;