import Image from "next/image";

const Features = () => {
    return (
        <div>
            <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-12">
                    
                <h3 className="w-fit mx-auto text-xl font-medium text-blue-500 dark:text-blue-300">Feature Fiesta</h3>

                <div className="mt-12 flex flex-wrap gap-6">

                    <div className="p-4 flex w-full max-w-[24rem] flex-col rounded-xl dark:bg-slate-800/50 shadow-lg">
                        <div className="mb-5">
                            <svg className="mb-5 h-8 w-8" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
                                <path className="fill-slate-500 dark:fill-slate-400" d="M19.6,3.6c-0.2-0.2-0.5-0.3-0.8-0.2c-2.2,0.5-4.4,0-6.2-1.3c-0.3-0.2-0.8-0.2-1.1,0C9.6,3.4,7.4,3.9,5.2,3.4	C4.7,3.3,4.1,3.7,4,4.2c0,0.1,0,0.1,0,0.2v7.5c0,2.9,1.4,5.6,3.8,7.3l3.7,2.6c0.3,0.2,0.8,0.2,1.2,0l3.7-2.6
                                    c2.4-1.7,3.8-4.4,3.8-7.3V4.4C20,4.1,19.9,3.8,19.6,3.6z M15,11C15,11,15,11,15,11l-3.4,3.4c-0.4,0.4-1,0.4-1.4,0l0,0l-1.6-1.6
                                    c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l0.9,0.9l2.7-2.7c0.4-0.4,1-0.4,1.4,0S15.4,10.6,15,11z"/>
                            </svg>
                            <h4 className="mb-4 text-xl font-medium text-slate-600 dark:text-slate-100">Authentication & Authorization</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore voluptate dignissimos eos, velit eaque iste.</p>
                        </div>
                        <Image 
                            width={384}
                            height={216}
                            src="/home/app-scr.png"
                            alt=""
                            className="rounded-xl object-center object-contain"
                        />
                    </div> 

                    <div className="p-4 flex w-full max-w-[24rem] flex-col rounded-xl dark:bg-slate-800/50 shadow-lg">
                        <div className="mb-5">
                            <svg className="mb-5 h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                                <path className="fill-slate-500 dark:fill-slate-400" d="M59.3,24a9.5,9.5,0,0,0-3.41-1.3H43.15l2-12a1,1,0,0,0-.67-1.12L32.33,5.43a.91.91,0,0,0-.65,0L19.51,9.58a1,1,0,0,0-.66,1.12l2,12H8.11A5.12,5.12,0,0,0,3,27.81V53.52a5.17,5.17,0,0,0,1.55,3.67,5.1,5.1,0,0,0,3.56,1.44H55.89a5.11,5.11,0,0,0,3.57-1.45A5.16,5.16,0,0,0,61,53.52V27.81A5.15,5.15,0,0,0,59.3,24Zm-22-9.21a1,1,0,0,1,0,1.41L31.06,23a1,1,0,0,1-1.47,0l-2.95-3.18a1,1,0,0,1,1.47-1.36l2.22,2.39,5.56-6A1,1,0,0,1,37.31,14.79ZM8.11,24.7h13.1l.41,2.43a1,1,0,0,0,.36.61l9.41,7.48a1,1,0,0,0,1.24,0L42,27.74a1,1,0,0,0,.36-.61l.41-2.43H55.89a3.27,3.27,0,0,1,.7.09L32,39.6,7.41,24.79A3.27,3.27,0,0,1,8.11,24.7ZM55.89,56.63H8.11a3.1,3.1,0,0,1-1.28-.28l19.27-18,5.38,3.24a1,1,0,0,0,1,0l5.38-3.24,19.27,18A3.1,3.1,0,0,1,55.89,56.63Z"/>
                            </svg>
                            <h4 className="mb-4 text-xl font-medium text-slate-600 dark:text-slate-100">Email OTP Verification</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore voluptate dignissimos eos, velit eaque iste.</p>
                        </div>
                        <Image 
                            width={384}
                            height={216}
                            src="/home/app-scr.png"
                            alt=""
                            className="rounded-xl object-center object-contain"
                        />
                    </div>  

                    <div className="p-4 flex w-full max-w-[24rem] flex-col rounded-xl dark:bg-slate-800/50 shadow-lg">
                        <div className="mb-5">
                            <svg className="mb-5 h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path className="fill-slate-500 dark:fill-slate-400" d="m29.974 24.997-2.195-4.824a.501.501 0 0 0-.122-.195l-2.132-2.124-.71-.706v-.001a1.514 1.514 0 0 0-2.133 0c-.446.444-.586 1.223-.356 1.77-.03.044-.012-.045-.016-.017l-.34-.338c-.587-.585-1.544-.585-2.132 0s-.588 1.538 0 2.123l-3.198-3.184-1.067-1.062c-.588-.585-1.544-.585-2.132 0s-.588 1.538 0 2.123l1.066 1.062 2.487 2.374v2.999c0 .132.053.26.147.354l2.843 2.83a.501.501 0 0 0 .285.142l5.711 1.672a.504.504 0 0 0 .427-.141l3.446-4.345a.5.5 0 0 0 .121-.512z"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M12.735 19.27A2.476 2.476 0 0 1 12 17.5c0-.67.262-1.298.736-1.77a2.494 2.494 0 0 1 1.772-.73c.669 0 1.298.26 1.771.731l.648.645A13.948 13.948 0 0 0 18 11a1 1 0 0 0-.726-.962L15 9.388V7c0-2.757-2.243-5-5-5S5 4.243 5 7a1 1 0 1 0 2 0c0-1.654 1.346-3 3-3s3 1.346 3 3v1.817l-2.726-.779a1.009 1.009 0 0 0-.548 0l-7 2A1 1 0 0 0 2 11c0 4.484 1.99 8.453 5.751 11.476l1.622 1.303a.999.999 0 0 0 1.254 0l1.622-1.303a17.323 17.323 0 0 0 1.905-1.806l-.338-.322-1.08-1.077zM11 15a1 1 0 1 1-2 0v-1a1 1 0 1 1 2 0v1z"/>
                            </svg>
                            <h4 className="mb-4 text-xl font-medium text-slate-600 dark:text-slate-100">Seamless Google OAuth</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore voluptate dignissimos eos, velit eaque iste.</p>
                        </div>
                        <Image 
                            width={384}
                            height={216}
                            src="/home/app-scr.png"
                            alt=""
                            className="rounded-xl object-center object-contain"
                        />
                    </div> 

                    <div className="p-4 flex w-full max-w-[24rem] flex-col rounded-xl dark:bg-slate-800/50 shadow-lg">
                        <div className="mb-5">
                            <svg className="mb-5 h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29">
                                <path className="fill-slate-500 dark:fill-slate-400" d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z"></path>
                            </svg>
                            <h4 className="mb-4 text-xl font-medium text-slate-600 dark:text-slate-100">Profile Management</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore voluptate dignissimos eos, velit eaque iste.</p>
                        </div>
                        <Image 
                            width={384}
                            height={216}
                            src="/home/app-scr.png"
                            alt=""
                            className="rounded-xl object-center object-contain"
                        />
                    </div> 

                    <div className="p-4 flex w-full max-w-[24rem] flex-col rounded-xl dark:bg-slate-800/50 shadow-lg">
                        <div className="mb-5">
                            <svg className="mb-5 h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="fill-slate-500 dark:fill-slate-400" d="M20 6V6.24H14.87C11.9 6.24 10.52 7.62 10.52 10.59V15.7H9.75V19.25H10.52V20.75H4.95C4.54 20.75 4.2 20.41 4.2 20C4.2 19.59 4.54 19.25 4.95 19.25H8.25V15.7H6C2.87 15.7 2.03 14.93 2 11.9V6C2 2.8 2.8 2 6 2H16C19.2 2 20 2.8 20 6Z" fill="#292D32"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M19.9995 7.78828C19.7495 7.75828 19.4595 7.73828 19.1495 7.73828H14.8695C12.7295 7.73828 12.0195 8.44828 12.0195 10.5883V19.2483C12.0295 19.8683 12.0995 20.3583 12.2495 20.7483C12.5995 21.6583 13.3895 21.9983 14.8695 21.9983H19.1495C21.2895 21.9983 21.9995 21.2883 21.9995 19.1483V10.5883C21.9995 8.75828 21.4795 7.97828 19.9995 7.78828ZM17.0095 10.0883C17.8795 10.0883 18.5795 10.7883 18.5795 11.6583C18.5795 12.5283 17.8795 13.2283 17.0095 13.2283C16.1395 13.2283 15.4395 12.5283 15.4395 11.6583C15.4395 10.7883 16.1395 10.0883 17.0095 10.0883ZM17.0095 19.1483C15.8295 19.1483 14.8695 18.1883 14.8695 17.0083C14.8695 16.5183 15.0395 16.0583 15.3195 15.6983C15.7095 15.1983 16.3195 14.8683 17.0095 14.8683C17.5495 14.8683 18.0395 15.0683 18.4095 15.3883C18.8595 15.7883 19.1495 16.3683 19.1495 17.0083C19.1495 18.1883 18.1895 19.1483 17.0095 19.1483Z"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M19.9995 7.78828C19.7495 7.75828 19.4595 7.73828 19.1495 7.73828H14.8695C12.7295 7.73828 12.0195 8.44828 12.0195 10.5883V19.2483C12.0295 19.8683 12.0995 20.3583 12.2495 20.7483C12.5995 21.6583 13.3895 21.9983 14.8695 21.9983H19.1495C21.2895 21.9983 21.9995 21.2883 21.9995 19.1483V10.5883C21.9995 8.75828 21.4795 7.97828 19.9995 7.78828ZM17.0095 10.0883C17.8795 10.0883 18.5795 10.7883 18.5795 11.6583C18.5795 12.5283 17.8795 13.2283 17.0095 13.2283C16.1395 13.2283 15.4395 12.5283 15.4395 11.6583C15.4395 10.7883 16.1395 10.0883 17.0095 10.0883ZM17.0095 19.1483C15.8295 19.1483 14.8695 18.1883 14.8695 17.0083C14.8695 16.5183 15.0395 16.0583 15.3195 15.6983C15.7095 15.1983 16.3195 14.8683 17.0095 14.8683C17.5495 14.8683 18.0395 15.0683 18.4095 15.3883C18.8595 15.7883 19.1495 16.3683 19.1495 17.0083C19.1495 18.1883 18.1895 19.1483 17.0095 19.1483Z"/>
                            </svg>
                            <h4 className="mb-4 text-xl font-medium text-slate-600 dark:text-slate-100">Device&apos;s Management</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore voluptate dignissimos eos, velit eaque iste.</p>
                        </div>
                        <Image 
                            width={384}
                            height={216}
                            src="/home/app-scr.png"
                            alt=""
                            className="rounded-xl object-center object-contain"
                        />
                    </div> 

                    <div className="p-4 flex w-full max-w-[24rem] flex-col rounded-xl dark:bg-slate-800/50 shadow-lg">
                        <div className="mb-5">
                            <svg className="mb-5 h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="fill-slate-500 dark:fill-slate-400" d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M18 16.5C18 18.433 15.3137 20 12 20C8.68629 20 6 18.433 6 16.5C6 14.567 8.68629 13 12 13C15.3137 13 18 14.567 18 16.5Z"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M7.12205 5C7.29951 5 7.47276 5.01741 7.64005 5.05056C7.23249 5.77446 7 6.61008 7 7.5C7 8.36825 7.22131 9.18482 7.61059 9.89636C7.45245 9.92583 7.28912 9.94126 7.12205 9.94126C5.70763 9.94126 4.56102 8.83512 4.56102 7.47063C4.56102 6.10614 5.70763 5 7.12205 5Z"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M5.44734 18.986C4.87942 18.3071 4.5 17.474 4.5 16.5C4.5 15.5558 4.85657 14.744 5.39578 14.0767C3.4911 14.2245 2 15.2662 2 16.5294C2 17.8044 3.5173 18.8538 5.44734 18.986Z"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M16.9999 7.5C16.9999 8.36825 16.7786 9.18482 16.3893 9.89636C16.5475 9.92583 16.7108 9.94126 16.8779 9.94126C18.2923 9.94126 19.4389 8.83512 19.4389 7.47063C19.4389 6.10614 18.2923 5 16.8779 5C16.7004 5 16.5272 5.01741 16.3599 5.05056C16.7674 5.77446 16.9999 6.61008 16.9999 7.5Z"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M18.5526 18.986C20.4826 18.8538 21.9999 17.8044 21.9999 16.5294C21.9999 15.2662 20.5088 14.2245 18.6041 14.0767C19.1433 14.744 19.4999 15.5558 19.4999 16.5C19.4999 17.474 19.1205 18.3071 18.5526 18.986Z"/>
                            </svg>
                            <h4 className="mb-4 text-xl font-medium text-slate-600 dark:text-slate-100">Avatar Management</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore voluptate dignissimos eos, velit eaque iste.</p>
                        </div>
                        <Image 
                            width={384}
                            height={216}
                            src="/home/app-scr.png"
                            alt=""
                            className="rounded-xl object-center object-contain"
                        />
                    </div> 

                    <div className="p-4 flex w-full max-w-[24rem] flex-col rounded-xl dark:bg-slate-800/50 shadow-lg">
                        <div className="mb-5">
                            <svg className="mb-5 h-8 w-8" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 110 110">
                                <path className="fill-slate-500 dark:fill-slate-400" d="M57.09 12.435a1 1 0 0 1 1.74-1l3.04 5.28a1 1 0 0 1-.36 1.37 1.013 1.013 0 0 1-1.37-.37zm34.83 13.8a1.01 1.01 0 0 1 .37-1.37l5.28-3.05a1 1 0 1 1 1 1.73L93.29 26.6a.993.993 0 0 1-1.37-.36zm-8.51-9.52 3.05-5.28a1 1 0 0 1 1.36-.37 1.01 1.01 0 0 1 .37 1.37l-3.05 5.28a1 1 0 1 1-1.73-1zm-37.06 5.47a.988.988 0 0 1 1.36-.37l5.28 3.05a1 1 0 0 1-.5 1.87 1.022 1.022 0 0 1-.5-.14l-5.28-3.05a.985.985 0 0 1-.36-1.36zm15.16 34.46a1 1 0 0 1 .36 1.37L58.83 63.3a.993.993 0 0 1-1.37.36 1 1 0 0 1-.37-1.36l3.05-5.28a1 1 0 0 1 1.37-.375z"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M97.48 75.445a1.021 1.021 0 0 1 .19 1.16 47.878 47.878 0 1 1-64.28-64.26 1 1 0 0 1 1.16.19.987.987 0 0 1 .18 1.15 45.368 45.368 0 0 0-4.87 20.58 45.919 45.919 0 0 0 45.86 45.88 45.24 45.24 0 0 0 20.6-4.88 1 1 0 0 1 1.16.18zm1.46-22.9a1.013 1.013 0 0 1-1.37.37l-5.28-3.05a1 1 0 1 1 1-1.74l5.28 3.05a1.01 1.01 0 0 1 .37 1.37z"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="M53.36 48.5a1.01 1.01 0 0 1-.37 1.37l-5.28 3.05a1 1 0 0 1-1.36-.37 1 1 0 0 1 .36-1.37l5.28-3.05a1.01 1.01 0 0 1 1.37.37zm31.78 8.515 3.05 5.28a1 1 0 0 1-.37 1.36 1.022 1.022 0 0 1-.5.14.991.991 0 0 1-.86-.5l-3.05-5.28a1 1 0 1 1 1.73-1zM71.64 14.1V8.005a1 1 0 1 1 2 0V14.1a1 1 0 0 1-2 0zM103 37.365a1 1 0 0 1-1 1h-6.09a1 1 0 0 1 0-2H102a1 1 0 0 1 1 1zm-48.98-.01a18.62 18.62 0 1 1 18.61 18.63 18.633 18.633 0 0 1-18.61-18.63zm18.62 22.27a1 1 0 0 1 1 1v6.1a1 1 0 0 1-2 0v-6.1a1 1 0 0 1 1-1zm-30.36-22.26a1 1 0 0 1 1-1h6.1a1 1 0 0 1 0 2h-6.1a1 1 0 0 1-1-1z"/>
                            </svg>
                            <h4 className="mb-4 text-xl font-medium text-slate-600 dark:text-slate-100">Dark & Light Modes</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore voluptate dignissimos eos, velit eaque iste.</p>
                        </div>
                        <Image 
                            width={384}
                            height={216}
                            src="/home/app-scr.png"
                            alt=""
                            className="rounded-xl object-center object-contain"
                        />
                    </div> 

                    <div className="p-4 flex w-full max-w-[24rem] flex-col rounded-xl dark:bg-slate-800/50 shadow-lg">
                        <div className="mb-5">
                            <svg className="mb-5 h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                <path className="fill-slate-500 dark:fill-slate-400" d="M34 31V20A11 11 0 0 0 25.67 9.34a3 3 0 1 0-5.34 0A11 11 0 0 0 12 20V31a3 3 0 0 0 0 6H34a3 3 0 0 0 0-6zM18.1 39a5 5 0 0 0 9.8 0z"/>
                            </svg>
                            <h4 className="mb-4 text-xl font-medium text-slate-600 dark:text-slate-100">Catchy Notification&apos;s</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore voluptate dignissimos eos, velit eaque iste.</p>
                        </div>
                        <Image 
                            width={384}
                            height={216}
                            src="/home/app-scr.png"
                            alt=""
                            className="rounded-xl object-center object-contain"
                        />
                    </div> 

                    <div className="p-4 flex w-full max-w-[24rem] flex-col rounded-xl dark:bg-slate-800/50 shadow-lg">
                        <div className="mb-5">
                            <svg className="mb-5 h-8 w-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path className="fill-slate-500 dark:fill-slate-400" d="M12 11a1 1 0 0 0-1 1 1 1 0 0 0 .5.85v.65a.5.5 0 0 0 1 0v-.65A1 1 0 0 0 13 12a1 1 0 0 0-1-1zm0-4a1.5 1.5 0 0 0-1.5 1.5V9h3v-.5A1.5 1.5 0 0 0 12 7z"/>
                                <path className="fill-slate-500 dark:fill-slate-400" d="m20.67 3-8.5-3a.5.5 0 0 0-.33 0L3.33 3a.5.5 0 0 0-.33.5v6c0 7.76 1.15 10.6 8.77 14.45a.5.5 0 0 0 .45 0C19.85 20.1 21 17.26 21 9.5v-6a.5.5 0 0 0-.33-.5ZM16.5 15a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-5a1 1 0 0 1 1-1v-.5a3.5 3.5 0 0 1 7 0V9a1 1 0 0 1 1 1Z"/>
                            </svg>
                            <h4 className="mb-4 text-xl font-medium text-slate-600 dark:text-slate-100">Account Security</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-300">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore voluptate dignissimos eos, velit eaque iste.</p>
                        </div>
                        <Image 
                            width={384}
                            height={216}
                            src="/home/app-scr.png"
                            alt=""
                            className="rounded-xl object-center object-contain"
                        />
                    </div> 

                </div>
              
            </div>
        </div>
    );
};

export default Features;