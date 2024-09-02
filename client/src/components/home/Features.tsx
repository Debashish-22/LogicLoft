import React from "react";

const Features = (() => {
    
    return (
        <section id="features">
            <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-8">
                <div className="max-w-xl mx-auto mb-16 flex justify-center items-center">
                    <h2 className="text-2xl font-medium text-slate-700 dark:text-slate-200">Packed with Exciting Features</h2>
                </div>
                <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24">
                                <path className="fill-blue-600 dark:fill-blue-300" d="M19.6,3.6c-0.2-0.2-0.5-0.3-0.8-0.2c-2.2,0.5-4.4,0-6.2-1.3c-0.3-0.2-0.8-0.2-1.1,0C9.6,3.4,7.4,3.9,5.2,3.4	C4.7,3.3,4.1,3.7,4,4.2c0,0.1,0,0.1,0,0.2v7.5c0,2.9,1.4,5.6,3.8,7.3l3.7,2.6c0.3,0.2,0.8,0.2,1.2,0l3.7-2.6
                                    c2.4-1.7,3.8-4.4,3.8-7.3V4.4C20,4.1,19.9,3.8,19.6,3.6z M15,11C15,11,15,11,15,11l-3.4,3.4c-0.4,0.4-1,0.4-1.4,0l0,0l-1.6-1.6
                                    c-0.4-0.4-0.4-1,0-1.4c0.4-0.4,1-0.4,1.4,0l0.9,0.9l2.7-2.7c0.4-0.4,1-0.4,1.4,0S15.4,10.6,15,11z"/>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-300">Authentication & Authorization</h3>
                        <p className="text-slate-600 dark:text-slate-400">Our state-of-the-art authentication and authorization features, ensuring top-notch security by rigorously verifying user identities and meticulously controlling access to sensitive data. Your peace of mind guaranteed.</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                            <svg className="w-6 h-6" viewBox="0 0 64 64">
                                <path className="fill-blue-600 dark:fill-blue-300" d="M59.3,24a9.5,9.5,0,0,0-3.41-1.3H43.15l2-12a1,1,0,0,0-.67-1.12L32.33,5.43a.91.91,0,0,0-.65,0L19.51,9.58a1,1,0,0,0-.66,1.12l2,12H8.11A5.12,5.12,0,0,0,3,27.81V53.52a5.17,5.17,0,0,0,1.55,3.67,5.1,5.1,0,0,0,3.56,1.44H55.89a5.11,5.11,0,0,0,3.57-1.45A5.16,5.16,0,0,0,61,53.52V27.81A5.15,5.15,0,0,0,59.3,24Zm-22-9.21a1,1,0,0,1,0,1.41L31.06,23a1,1,0,0,1-1.47,0l-2.95-3.18a1,1,0,0,1,1.47-1.36l2.22,2.39,5.56-6A1,1,0,0,1,37.31,14.79ZM8.11,24.7h13.1l.41,2.43a1,1,0,0,0,.36.61l9.41,7.48a1,1,0,0,0,1.24,0L42,27.74a1,1,0,0,0,.36-.61l.41-2.43H55.89a3.27,3.27,0,0,1,.7.09L32,39.6,7.41,24.79A3.27,3.27,0,0,1,8.11,24.7ZM55.89,56.63H8.11a3.1,3.1,0,0,1-1.28-.28l19.27-18,5.38,3.24a1,1,0,0,0,1,0l5.38-3.24,19.27,18A3.1,3.1,0,0,1,55.89,56.63Z"/>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-300">Email OTP Verification</h3>
                        <p className="text-slate-600 dark:text-slate-400">We ensures only the rightful users gain access. By validating the correct individuals through unique codes sent to their email, we guarantee secure authentication.</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                                <path className="fill-blue-600 dark:fill-blue-300" d="m29.974 24.997-2.195-4.824a.501.501 0 0 0-.122-.195l-2.132-2.124-.71-.706v-.001a1.514 1.514 0 0 0-2.133 0c-.446.444-.586 1.223-.356 1.77-.03.044-.012-.045-.016-.017l-.34-.338c-.587-.585-1.544-.585-2.132 0s-.588 1.538 0 2.123l-3.198-3.184-1.067-1.062c-.588-.585-1.544-.585-2.132 0s-.588 1.538 0 2.123l1.066 1.062 2.487 2.374v2.999c0 .132.053.26.147.354l2.843 2.83a.501.501 0 0 0 .285.142l5.711 1.672a.504.504 0 0 0 .427-.141l3.446-4.345a.5.5 0 0 0 .121-.512z"/>
                                <path className="fill-blue-600 dark:fill-blue-300" d="M12.735 19.27A2.476 2.476 0 0 1 12 17.5c0-.67.262-1.298.736-1.77a2.494 2.494 0 0 1 1.772-.73c.669 0 1.298.26 1.771.731l.648.645A13.948 13.948 0 0 0 18 11a1 1 0 0 0-.726-.962L15 9.388V7c0-2.757-2.243-5-5-5S5 4.243 5 7a1 1 0 1 0 2 0c0-1.654 1.346-3 3-3s3 1.346 3 3v1.817l-2.726-.779a1.009 1.009 0 0 0-.548 0l-7 2A1 1 0 0 0 2 11c0 4.484 1.99 8.453 5.751 11.476l1.622 1.303a.999.999 0 0 0 1.254 0l1.622-1.303a17.323 17.323 0 0 0 1.905-1.806l-.338-.322-1.08-1.077zM11 15a1 1 0 1 1-2 0v-1a1 1 0 1 1 2 0v1z"/>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-300">Seamless Google OAuth</h3>
                        <p className="text-slate-600 dark:text-slate-400">Integrating Seamless Google OAuth for not only streamlines user access but also eliminates the hassle of managing multiple credentials, optimizing the user experience.</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 29">
                                <path className="fill-blue-600 dark:fill-blue-300" d="M14.5 2A12.514 12.514 0 0 0 2 14.5 12.521 12.521 0 0 0 14.5 27a12.5 12.5 0 0 0 0-25Zm7.603 19.713a8.48 8.48 0 0 0-15.199.008A10.367 10.367 0 0 1 4 14.5a10.5 10.5 0 0 1 21 0 10.368 10.368 0 0 1-2.897 7.213ZM14.5 7a4.5 4.5 0 1 0 4.5 4.5A4.5 4.5 0 0 0 14.5 7Z"></path>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-300">Profile Management</h3>
                        <p className="text-slate-600 dark:text-slate-400">Profile Management is a pivotal feature of our application, empowering users to personalize their experience. Seamlessly update information, preferences, and settings for a tailored interaction.</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="fill-blue-600 dark:fill-blue-300" d="M20 6V6.24H14.87C11.9 6.24 10.52 7.62 10.52 10.59V15.7H9.75V19.25H10.52V20.75H4.95C4.54 20.75 4.2 20.41 4.2 20C4.2 19.59 4.54 19.25 4.95 19.25H8.25V15.7H6C2.87 15.7 2.03 14.93 2 11.9V6C2 2.8 2.8 2 6 2H16C19.2 2 20 2.8 20 6Z" fill="#292D32"/>
                                <path className="fill-blue-600 dark:fill-blue-300" d="M19.9995 7.78828C19.7495 7.75828 19.4595 7.73828 19.1495 7.73828H14.8695C12.7295 7.73828 12.0195 8.44828 12.0195 10.5883V19.2483C12.0295 19.8683 12.0995 20.3583 12.2495 20.7483C12.5995 21.6583 13.3895 21.9983 14.8695 21.9983H19.1495C21.2895 21.9983 21.9995 21.2883 21.9995 19.1483V10.5883C21.9995 8.75828 21.4795 7.97828 19.9995 7.78828ZM17.0095 10.0883C17.8795 10.0883 18.5795 10.7883 18.5795 11.6583C18.5795 12.5283 17.8795 13.2283 17.0095 13.2283C16.1395 13.2283 15.4395 12.5283 15.4395 11.6583C15.4395 10.7883 16.1395 10.0883 17.0095 10.0883ZM17.0095 19.1483C15.8295 19.1483 14.8695 18.1883 14.8695 17.0083C14.8695 16.5183 15.0395 16.0583 15.3195 15.6983C15.7095 15.1983 16.3195 14.8683 17.0095 14.8683C17.5495 14.8683 18.0395 15.0683 18.4095 15.3883C18.8595 15.7883 19.1495 16.3683 19.1495 17.0083C19.1495 18.1883 18.1895 19.1483 17.0095 19.1483Z"/>
                                <path className="fill-blue-600 dark:fill-blue-300" d="M19.9995 7.78828C19.7495 7.75828 19.4595 7.73828 19.1495 7.73828H14.8695C12.7295 7.73828 12.0195 8.44828 12.0195 10.5883V19.2483C12.0295 19.8683 12.0995 20.3583 12.2495 20.7483C12.5995 21.6583 13.3895 21.9983 14.8695 21.9983H19.1495C21.2895 21.9983 21.9995 21.2883 21.9995 19.1483V10.5883C21.9995 8.75828 21.4795 7.97828 19.9995 7.78828ZM17.0095 10.0883C17.8795 10.0883 18.5795 10.7883 18.5795 11.6583C18.5795 12.5283 17.8795 13.2283 17.0095 13.2283C16.1395 13.2283 15.4395 12.5283 15.4395 11.6583C15.4395 10.7883 16.1395 10.0883 17.0095 10.0883ZM17.0095 19.1483C15.8295 19.1483 14.8695 18.1883 14.8695 17.0083C14.8695 16.5183 15.0395 16.0583 15.3195 15.6983C15.7095 15.1983 16.3195 14.8683 17.0095 14.8683C17.5495 14.8683 18.0395 15.0683 18.4095 15.3883C18.8595 15.7883 19.1495 16.3683 19.1495 17.0083C19.1495 18.1883 18.1895 19.1483 17.0095 19.1483Z"/>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-300">Device&apos;s Management</h3>
                        <p className="text-slate-600 dark:text-slate-400">Device Management is a cornerstone of our application, enabling effortless control over connected devices. Monitor, configure, and optimize device settings for seamless performance and enhanced security.</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="fill-blue-600 dark:fill-blue-300" d="M15.5 7.5C15.5 9.433 13.933 11 12 11C10.067 11 8.5 9.433 8.5 7.5C8.5 5.567 10.067 4 12 4C13.933 4 15.5 5.567 15.5 7.5Z"/>
                                <path className="fill-blue-600 dark:fill-blue-300" d="M18 16.5C18 18.433 15.3137 20 12 20C8.68629 20 6 18.433 6 16.5C6 14.567 8.68629 13 12 13C15.3137 13 18 14.567 18 16.5Z"/>
                                <path className="fill-blue-600 dark:fill-blue-300" d="M7.12205 5C7.29951 5 7.47276 5.01741 7.64005 5.05056C7.23249 5.77446 7 6.61008 7 7.5C7 8.36825 7.22131 9.18482 7.61059 9.89636C7.45245 9.92583 7.28912 9.94126 7.12205 9.94126C5.70763 9.94126 4.56102 8.83512 4.56102 7.47063C4.56102 6.10614 5.70763 5 7.12205 5Z"/>
                                <path className="fill-blue-600 dark:fill-blue-300" d="M5.44734 18.986C4.87942 18.3071 4.5 17.474 4.5 16.5C4.5 15.5558 4.85657 14.744 5.39578 14.0767C3.4911 14.2245 2 15.2662 2 16.5294C2 17.8044 3.5173 18.8538 5.44734 18.986Z"/>
                                <path className="fill-blue-600 dark:fill-blue-300" d="M16.9999 7.5C16.9999 8.36825 16.7786 9.18482 16.3893 9.89636C16.5475 9.92583 16.7108 9.94126 16.8779 9.94126C18.2923 9.94126 19.4389 8.83512 19.4389 7.47063C19.4389 6.10614 18.2923 5 16.8779 5C16.7004 5 16.5272 5.01741 16.3599 5.05056C16.7674 5.77446 16.9999 6.61008 16.9999 7.5Z"/>
                                <path className="fill-blue-600 dark:fill-blue-300" d="M18.5526 18.986C20.4826 18.8538 21.9999 17.8044 21.9999 16.5294C21.9999 15.2662 20.5088 14.2245 18.6041 14.0767C19.1433 14.744 19.4999 15.5558 19.4999 16.5C19.4999 17.474 19.1205 18.3071 18.5526 18.986Z"/>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-300">Avatar Management</h3>
                        <p className="text-slate-600 dark:text-slate-400">Avatar Management simplifies customization, ensuring your digital identity reflects your personality effortlessly. Easily create, edit, and update avatars for a personalized online experience.</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path className="fill-blue-600 dark:fill-blue-300" d="M19.1582,11.64355a9.04415,9.04415,0,0,0-2.61914-3.83349,7.848,7.848,0,0,1-2.71875-4.97461.99991.99991,0,0,0-1.71875-.51611,6.89156,6.89156,0,0,0-1.13281,6.29931c.48535,1.94287.124,2.68311-.05469,2.91065a.91718.91718,0,0,1-.76758.32617C8.543,11.85547,8.459,8.40918,8.459,8.374a1.0004,1.0004,0,0,0-1.75683-.65185,9.95541,9.95541,0,0,0-2.01563,4.041c-1.11816,5.58741,1.80469,8.21973,3.11328,9.09229a6.95465,6.95465,0,0,0,3.88965,1.1543,7.86075,7.86075,0,0,0,5.43555-2.1753A7.9833,7.9833,0,0,0,19.1582,11.64355Z"/>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-300">Dynamic Interface Delights</h3>
                        <p className="text-slate-600 dark:text-slate-400">Experience the best of both worlds with our dynamic design, offering sleek Dark and Light modes. Stay engaged with eye-catching notifications on our modern, user-friendly interface for a seamless experience.</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                            <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path className="fill-blue-600 dark:fill-blue-300" d="M19,9H9V7a3,3,0,0,1,6,0,1,1,0,0,0,2,0A5,5,0,0,0,7,7V9H5a1,1,0,0,0-1,1V21a1,1,0,0,0,1,1H19a1,1,0,0,0,1-1V10A1,1,0,0,0,19,9Zm-6,7.72V18a1,1,0,0,1-2,0V16.72a2,2,0,1,1,2,0Z"/>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-300">Centralized Access Control</h3>
                        <p className="text-slate-600 dark:text-slate-400">Reserved for original users only, our system ensures exclusive access to sensitive account operations like account deletion, safeguarding against unauthorized actions and protecting user data integrity.</p>
                    </div>
                    <div>
                        <div className="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-blue-100 lg:h-12 lg:w-12 dark:bg-blue-900">
                            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path className="stroke-2 stroke-blue-600 dark:stroke-blue-300" strokeLinecap="round" strokeLinejoin="round" d="M6 4H10.5M10.5 4C12.9853 4 15 6.01472 15 8.5C15 10.9853 12.9853 13 10.5 13H6L13 20M10.5 4H18M6 8.5H18"/>
                            </svg>
                        </div>
                        <h3 className="mb-2 text-xl font-medium text-slate-600 dark:text-slate-300">Easy Subscription Management</h3>
                        <p className="text-slate-600 dark:text-slate-400">Manage your subscriptions effortlessly with our app. Renew plans, upgrade features, and track your usage all in one place. Enjoy seamless control and customization for a better experience.</p>
                    </div>
                </div>
            </div>
        </section>
    );
});

export default Features;