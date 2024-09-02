"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import axiosInstance from "@/utils/axios";
import useToast from "@/hooks/useToast";

import { ToastType } from "@/context/toastContextProvider";

interface Plan {
    name: string;
    description: string;
    planType: string;
}

interface Subscription {
    plan: Plan;
    startDate: string;
    endDate: string;
    status: string;
}

interface Payment{
    _id: string;
    amount: number;
    currency: string;
    status: string;
    method: string;
    orderId: string;
    transactionId: string;
    subscription: Subscription,
}

const Subscription = () => {

    const toast = useToast();
    const toastRef = useRef(toast);

    const [subscriptionLoading, setSubscriptionLoading] = useState(true);
    const [subscription, setSubscription] = useState<Subscription | null>(null);

    const [paymentsLoading, setPaymentsLoading] = useState(true);
    const [payments, setPayments] = useState<Payment[]>([]);

    useEffect(() => {
        toastRef.current = toast;
    }, [toast]);

    const fetchSubscriptions = async() => {
        try {

            const URI = `/profile/subscription`;
            
            const response = await axiosInstance.get(URI);

            const { subscription } = await response.data;

           setSubscription(subscription);
            
        } catch (error) {

            toast.renderToast("Something went wrong", ToastType.Error);
        } finally {
            setSubscriptionLoading(false);
        }
    }

    const fetchPayments = async() => {
        try {

            const URI = `/profile/payments`;
            
            const response = await axiosInstance.get(URI);

            const { payments } = await response.data;

           setPayments(payments);
            
        } catch (error) {

            toast.renderToast("Something went wrong", ToastType.Error);
        } finally {
            setPaymentsLoading(false);
        }
    }

    useEffect(() => { 
        fetchSubscriptions();
        fetchPayments();
    }, []);

    return(

        <div>

            <div className="mb-8">
                <div className="mb-8">
                    <h2 className="mb-2.5 text-xl font-medium text-blue-600 dark:text-blue-400">Manage Subscriptions</h2>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Manage your subscription preferences and payment details right here.</p>
                </div>
                {
                    subscriptionLoading
                    ?
                    <div className="min-h-[150px] p-4 flex justify-between items-center gap-10 rounded-xl bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700/80">
                        <div className="flex flex-col items-start">
                            <div className="animate-pulse h-[10px] w-[100px] mb-7 bg-slate-300 dark:bg-slate-800 rounded-xl"></div>
                            <div className="animate-pulse h-[10px] w-[200px] mb-2 bg-slate-300 dark:bg-slate-800 rounded-xl"></div>
                            <div className="animate-pulse h-[10px] w-[100px] mb-4 bg-slate-300 dark:bg-slate-800 rounded-xl"></div>
                            <div className="animate-pulse h-[10px] w-[80px] bg-slate-300 dark:bg-slate-800 rounded-xl"></div>
                        </div>
                        <div className="animate-pulse h-[30px] w-[70px] bg-slate-300 dark:bg-slate-800 rounded-lg"></div>
                    </div>
                    :
                    <div className="p-4 flex justify-between items-center gap-10 rounded-xl bg-slate-50 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700/80">
                        {
                            subscription
                            ?
                            <>
                                <div>
                                    <p className="mb-3.5 text-xs font-medium text-slate-500 dark:text-slate-400">CURRENT PLAN</p>
                                    <p className="text-lg font-medium text-[#b3712c] dark:text-[#e0c67c]">{subscription.plan.name}</p>
                                    <span className="text-xs text-slate-600 dark:text-slate-400">Next Billing Cycle: <span>{new Date(subscription.endDate).toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'})}</span></span>
                                    {
                                        subscription.plan.planType !== "PREMIUM"
                                        &&
                                        <Link href="/pricing" className="block w-fit mt-3">
                                            <span className="text-xs text-blue-600 dark:text-blue-300">Upgrade Plan</span>
                                        </Link>
                                    }
                                </div>
                                <div className="px-3 py-1 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-300/80 dark:border-teal-300/15">
                                    <span className="text-xs text-teal-600 dark:text-teal-300">{subscription.status}</span>
                                </div>
                            </>
                            :
                            <>
                                <div>
                                    <p className="mb-3.5 text-xs font-medium text-slate-500 dark:text-slate-400">CURRENT PLAN</p>
                                    <p className="text-lg font-medium text-[#b3712c] dark:text-[#e0c67c]">Free Plan</p>
                                    <span className="text-xs text-slate-600 dark:text-slate-400">Next Billing Cycle: <span>Forever</span></span>
                                    <Link href="/pricing" className="block w-fit mt-3">
                                        <span className="text-xs text-blue-600 dark:text-blue-300">Upgrade Plan</span>
                                    </Link>
                                </div>
                                <div className="px-3 py-1 rounded-lg bg-teal-50 dark:bg-teal-500/10 border border-teal-300/80 dark:border-teal-300/15">
                                    <span className="text-xs text-teal-600 dark:text-teal-300">ACTIVE</span>
                                </div>
                            </>
                        }
                    </div>
                }
            </div>

            <div>
                <p className="mb-6 text-lg font-medium text-slate-700 dark:text-slate-300">Payment Details</p>
                {
                    paymentsLoading
                    ?
                    <>
                        <div className="animate-pulse h-[10px] mb-5 w-full bg-slate-300 dark:bg-slate-800 rounded-lg"></div>
                        <div className="animate-pulse h-[10px] mb-5 w-4/5 bg-slate-300 dark:bg-slate-800 rounded-lg"></div>
                        <div className="animate-pulse h-[10px] w-3/5 bg-slate-300 dark:bg-slate-800 rounded-lg"></div>
                    </>
                    :
                    <>
                        {
                            payments.length > 0
                            ?
                            <div className="relative overflow-x-auto">
                                <table className="w-full text-sm text-left rtl:text-right text-slate-500 dark:text-slate-400">
                                    <thead className="text-sm font-normal text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Plan Details</th>
                                            <th scope="col" className="px-6 py-3">Amount</th>
                                            <th scope="col" className="px-6 py-3">Subscription Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-xs">
                                        {
                                            payments.map((payment) => {

                                                const { amount, currency, method, orderId, status, transactionId, subscription } = payment;

                                                const planName = subscription.plan.name;
                                                const startDate = new Date(subscription.startDate).toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'});
                                                const endDate = new Date(subscription.endDate).toLocaleString('en-GB', {day:'numeric', month: 'long', year:'numeric'});

                                                const currencySymbol = currency === 'INR' ? '₹' :currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '';
                                                
                                                return(
                                                    <tr key={payment._id}>
                                                        <td className="px-6 py-5">
                                                            <span aria-hidden="false" className="block text-sm mb-2 text-slate-700 dark:text-white">{planName}</span>
                                                            <span aria-hidden="false" className="block mb-1">{startDate} to {endDate}</span>
                                                            <span aria-hidden="false" className="block">Order ID: {orderId}</span>
                                                            <span aria-hidden="false" className="block">Transaction ID: {transactionId}</span>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <span aria-hidden="false" className="block text-sm mb-1 text-slate-700 dark:text-slate-300">
                                                                {currencySymbol}{amount}
                                                            </span>
                                                            <span aria-hidden="false" className="block">Via {method}</span>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <span aria-hidden="false" className={`${status !== "SUCCESS" ? "text-red-600 dark:text-red-300" : ""}  block`} >{status === "SUCCESS" ?` Next payment on ${endDate}` : status}</span>
                                                        </td>
                                                    </tr>    
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className="h-20 flex justify-center items-center">
                                <span className="text-xs text-yellow-700 dark:text-yellow-500">You haven't made any payments yet.</span>
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default Subscription;