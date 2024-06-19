"use client";

const Pricing = () => {

    const handlePlan = (selectedPlanId: string) => {

        console.log(selectedPlanId)
    }

    return (
        <section>
            <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
                <div className="mx-auto max-w-screen-md text-center mb-8 lg:mb-12">
                    <h2 className="mb-2 text-xl font-medium text-[#b3712c] dark:text-[#e0c67c]">Plans & Pricing</h2>
                    <p className="mb-5 text-sm text-slate-600 dark:text-slate-400">Simple pricing. No hidden fees. Advance your business.</p>
                </div>

                <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">

                    <div className="rounded-xl p-px bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800">
                        <div className="rounded-xl bg-white dark:bg-slate-900 p-4 text-left">
                            <div className="mb-5">
                                <p className="text-lg text-slate-700 dark:text-slate-200">Free Plan</p>
                                <span className="text-xs text-slate-600 dark:text-slate-400">Explore our default Free Plan for immediate access!</span>
                            </div>
                            <h3 className="mb-6 text-3xl font-medium text-slate-700 dark:text-slate-50">$0.00 <span className="ml-1.5 text-xs font-normal text-slate-600 dark:text-slate-400">Forever</span></h3>
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

                    <div className="rounded-xl p-px bg-gradient-to-b from-[#e0c67c] to-[#7B5C0A]">
                        <div className="rounded-xl bg-white dark:bg-slate-900 p-4 text-left relative">
                            <span className="absolute top-4 right-4 bg-[#e0c67c] text-slate-950 text-xs font-medium me-2 px-2 py-0.5 rounded">Popular</span>
                            <div className="mb-5">
                                <p className="text-lg text-slate-700 dark:text-slate-200">Pro Plan</p>
                                <span className="text-xs text-slate-600 dark:text-slate-400">Unlock premium features with our Pro Plan today!</span>
                            </div>
                            <h3 className="mb-6 text-3xl font-medium text-slate-700 dark:text-slate-50">$02.99 <span className="ml-1.5 text-xs font-normal text-slate-600 dark:text-slate-400">/3 Months</span></h3>
                            <ul role="list" className="mb-8 space-y-3">
                                <li className="flex items-center space-x-2.5">
                                    <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 144 143">
                                        <path className="fill-slate-500 dark:fill-slate-300" d="M142.504 72c-38.9 0-70.5 31.6-70.5 70.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-38.9-31.6-70.5-70.5-70.5-.3 0-.5-.2-.5-.5s.2-.5.5-.5c38.9 0 70.5-31.6 70.5-70.5 0-.3.2-.5.5-.5s.5.2.5.5c0 38.9 31.6 70.5 70.5 70.5.3 0 .5.2.5.5s-.2.5-.5.5Z"/>
                                    </svg>
                                    <span className="text-xs text-slate-600 dark:text-slate-300">Access on 4 supported devices at a time.</span>
                                </li>
                                <li className="flex items-center space-x-2.5">
                                    <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 144 143">
                                        <path className="fill-slate-500 dark:fill-slate-300" d="M142.504 72c-38.9 0-70.5 31.6-70.5 70.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-38.9-31.6-70.5-70.5-70.5-.3 0-.5-.2-.5-.5s.2-.5.5-.5c38.9 0 70.5-31.6 70.5-70.5 0-.3.2-.5.5-.5s.5.2.5.5c0 38.9 31.6 70.5 70.5 70.5.3 0 .5.2.5.5s-.2.5-.5.5Z"/>
                                    </svg>
                                    <span className="text-xs text-slate-600 dark:text-slate-300">No setup, or hidden fees</span>
                                </li>
                            </ul>
                            <button onClick={() => handlePlan("65e0ad5e7d0554fa94d4cb73")} className="h-12 w-full rounded-lg bg-[#e0c67c]">
                                <span className="text-sm font-bold text-slate-900">Upgrade to Pro</span>
                            </button>
                        </div>
                    </div>

                    <div className="rounded-xl p-px bg-gradient-to-b from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800">
                        <div className="rounded-xl bg-white dark:bg-slate-900 p-4 text-left">
                            <div className="mb-5">
                                <p className="text-lg text-slate-700 dark:text-slate-200">Premium Plan</p>
                                <span className="text-xs text-slate-600 dark:text-slate-400">Upgrade to our Premium Plan for exclusive benefits!</span>
                            </div>
                            <h3 className="mb-6 text-3xl font-medium text-slate-700 dark:text-slate-50">$05.99 <span className="ml-1.5 text-xs font-normal text-slate-600 dark:text-slate-400">/6 Months</span></h3>
                            <ul role="list" className="mb-8 space-y-3">
                                <li className="flex items-center space-x-2.5">
                                    <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 144 143">
                                        <path className="fill-slate-500 dark:fill-slate-300" d="M142.504 72c-38.9 0-70.5 31.6-70.5 70.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-38.9-31.6-70.5-70.5-70.5-.3 0-.5-.2-.5-.5s.2-.5.5-.5c38.9 0 70.5-31.6 70.5-70.5 0-.3.2-.5.5-.5s.5.2.5.5c0 38.9 31.6 70.5 70.5 70.5.3 0 .5.2.5.5s-.2.5-.5.5Z"/>
                                    </svg>
                                    <span className="text-xs text-slate-600 dark:text-slate-300">Access on 5 supported devices at a time.</span>
                                </li>
                                <li className="flex items-center space-x-2.5">
                                    <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 144 143">
                                        <path className="fill-slate-500 dark:fill-slate-300" d="M142.504 72c-38.9 0-70.5 31.6-70.5 70.5 0 .3-.2.5-.5.5s-.5-.2-.5-.5c0-38.9-31.6-70.5-70.5-70.5-.3 0-.5-.2-.5-.5s.2-.5.5-.5c38.9 0 70.5-31.6 70.5-70.5 0-.3.2-.5.5-.5s.5.2.5.5c0 38.9 31.6 70.5 70.5 70.5.3 0 .5.2.5.5s-.2.5-.5.5Z"/>
                                    </svg>
                                    <span className="text-xs text-slate-600 dark:text-slate-300">No setup, or hidden fees</span>
                                </li>
                            </ul>
                            <button onClick={() => handlePlan("65e0ad5e7d0554fa94d4cb89")} className="h-12 w-full rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800">
                                <span className="text-sm font-medium text-white">Upgrade to Premium</span>
                            </button>
                        </div>
                    </div>
                 
                </div>
            </div>
        </section>
    )
}

export default Pricing;