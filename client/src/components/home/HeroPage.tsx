import Link from "next/link";

import useAuth from "@/hooks/useAuth";
import useModal from "@/hooks/useModal";
import { ModalType } from "@/context/modalContextProvider";
import { useRouter } from "next/navigation";

const HeroPage = () => {

    const auth = useAuth();
    const modal = useModal();
    const router = useRouter();

    if(!auth || !modal || !router)return;

    const { authenticated } = auth;

    const handleAuth = (mode?: string) => modal?.renderModal(ModalType.AUTH_MODAL, mode);
    
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:pt-24 lg:pb-22">
          <div className="max-w-xl sm:mx-auto lg:max-w-2xl">
            <div className="flex flex-col mb-16 sm:text-center sm:mb-0">
               
                <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold text-slate-600 dark:text-slate-200 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        <svg
                        viewBox="0 0 52 24"
                        className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block fill-slate-300 dark:fill-slate-600"
                        >
                        <defs>
                            <pattern
                            id="700c93bf-0068-4e32-aafe-ef5b6a647708"
                            x="0"
                            y="0"
                            width=".135"
                            height=".30"
                            >
                            <circle cx="1" cy="1" r=".7" />
                            </pattern>
                        </defs>
                        <rect
                            fill="url(#700c93bf-0068-4e32-aafe-ef5b6a647708)"
                            width="52"
                            height="24"
                        />
                        </svg>
                        <span className="relative">Complete Auth App</span>
                    </span>{' '}
                    built with MERN Stack & Next.js
                    </h2>
                    <p className="text-base md:text-lg text-slate-600 dark:text-slate-400">
                    Welcome to our app. Seamlessly integrated with Google Authentication, our application offers a secure and user-friendly experience.
                    </p>
                </div>
                <div className="flex justify-center items-center space-x-9">
                    <button 
                        onClick={() => authenticated ? router.push('/account') : handleAuth("")}
                        className="h-12 px-6 text-sm font-semibold focus:shadow-outline focus:outline-none rounded-lg text-white bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800">
                        {authenticated ? 'My Account' : 'Get Started'}
                    </button>
                    <Link 
                        href="https://github.com/Debashish-22/Authentique" 
                        target="_blank"
                        className="h-12 px-6 text-sm font-semibold flex justify-center items-center focus:shadow-outline focus:outline-none rounded-lg text-slate-600 dark:text-slate-200 bg-gradient-to-br from-slate-200/80 to-slate-200/20 dark:from-slate-700/80 dark:to-slate-700/20"
                    >
                        View on GitHub
                    </Link>
                </div>
                <div className="mt-14 flex justify-center items-center gap-4">
                    <span className="text-sm text-slate-600 dark:text-slate-200">Deployed On</span>
                    <svg className="h-11 w-11" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path fill="#FF9800" d="M20.189 12.33h-.001zM.106 14.677c3.13 2.855 7.272 4.573 11.87 4.573 3.28 0 7.096-1.04 9.722-3 .431-.323.056-.815-.383-.613-2.946 1.258-6.146 1.871-9.06 1.871-4.318 0-8.493-1.202-11.877-3.186-.296-.177-.519.13-.272.355z"/>
                        <path className="fill-slate-800 dark:fill-white" d="M17.181 5.16c0-.136-.073-.202-.2-.202h-.741l-.034-.001c-.104 0-.2.03-.279.082-.056.048-.112.154-.16.315l-1.381 5.403-1.261-5.403c-.031-.154-.088-.267-.151-.315-.064-.056-.168-.081-.32-.081h-.636l-.035-.001a.535.535 0 0 0-.287.082c-.063.048-.111.154-.151.315L10.3 10.693 8.958 5.354c-.047-.154-.095-.267-.16-.315-.055-.056-.159-.081-.31-.081h-.783c-.127 0-.191.073-.191.202l.001.006c.012.114.037.224.071.318l1.875 6.235c.048.153.104.266.168.314.064.057.16.081.304.081l.686-.001c.143 0 .255-.024.32-.081.063-.057.11-.162.15-.323l1.23-5.193 1.238 5.201c.031.162.087.267.15.323.065.057.169.081.32.081h.686l.029.001c.102 0 .197-.03.275-.082.064-.048.12-.153.168-.314l1.923-6.234-.003.008a1.17 1.17 0 0 0 .059-.21c.008-.049.017-.089.017-.13zm4.501 5.042v.022a.871.871 0 0 1-.415.744c-.271.178-.663.267-1.165.267-.32 0-.631-.032-.95-.097a4.315 4.315 0 0 1-.878-.282c-.08-.032-.152-.065-.2-.081a.453.453 0 0 0-.144-.024c-.119 0-.183.081-.183.25v.411c.001.082.018.16.048.226.032.073.119.154.247.225.208.121.519.226.918.323a5.26 5.26 0 0 0 1.228.144 3.78 3.78 0 0 0 1.141-.169c.343-.105.638-.25.886-.452.247-.194.439-.435.583-.71.135-.274.207-.589.207-.936 0-.419-.12-.798-.367-1.129-.247-.33-.663-.589-1.237-.775l-1.134-.362c-.423-.137-.718-.291-.877-.445a.765.765 0 0 1-.24-.573c0-.33.128-.564.375-.717.247-.154.607-.225 1.062-.225h.056a3.56 3.56 0 0 1 1.476.314l-.004-.002a.804.804 0 0 0 .307.099c.12 0 .184-.089.184-.259v-.375a.43.43 0 0 0-.071-.266l-.001-.002a.705.705 0 0 0-.239-.2A1.583 1.583 0 0 0 21.96 5a6.564 6.564 0 0 0-.455-.128c-.168-.032-.335-.065-.518-.089a4.011 4.011 0 0 0-.535-.032c-.351 0-.686.041-1.006.137-.32.096-.59.233-.83.419a2.06 2.06 0 0 0-.575.661 1.82 1.82 0 0 0-.216.895c.002.443.152.851.4 1.17.263.363.694.637 1.277.821l1.157.364c.391.129.663.267.807.419.134.14.216.332.216.543V10.202z"/>
                        <path fill="#FF9800" d="M22.424 18.169c1.405-1.193 1.772-3.685 1.485-4.048-.287-.355-2.754-.661-4.254.403-.232.17-.192.396.063.364.854-.105 2.738-.33 3.074.104.335.428-.375 2.227-.695 3.025-.096.241.112.338.327.152z"/>
                        <path className="fill-slate-800 dark:fill-white" d="M4.52 7.944a6.3 6.3 0 0 0-.846-.065c-.822 0-1.468.21-1.955.629-.487.418-.726.976-.726 1.661 0 .646.199 1.162.59 1.549.391.387.926.58 1.596.58.942 0 1.725-.371 2.347-1.112l.016.037c.076.16.159.315.232.438l.006.01c.083.132.177.257.281.369.079.073.159.114.239.114h.001a.373.373 0 0 0 .207-.073l.503-.338c.104-.081.152-.162.152-.242a.349.349 0 0 0-.056-.185 4.331 4.331 0 0 1-.256-.582 2.448 2.448 0 0 1-.088-.717l-.016.001V7.404c0-.887-.223-1.549-.662-1.983-.447-.436-1.141-.654-2.091-.654h-.046c-.426 0-.84.056-1.2.153a4.573 4.573 0 0 0-1.005.363l-.004.001a.6.6 0 0 0-.22.167c-.04.057-.056.154-.056.283v.395c0 .169.056.25.168.25h.001a.455.455 0 0 0 .126-.023l.016-.004a2.18 2.18 0 0 0 .264-.102c.279-.113.567-.202.862-.275.295-.073.583-.104.863-.104.614 0 1.045.12 1.3.371.248.25.375.677.375 1.29v.589a10.764 10.764 0 0 0-.918-.177zm.935 1.081v.338c0 .274-.033.508-.08.701a1.282 1.282 0 0 1-.272.517 1.777 1.777 0 0 1-.758.516 2.56 2.56 0 0 1-.822.145c-.368 0-.647-.097-.838-.299-.2-.193-.295-.476-.295-.855 0-.403.127-.709.39-.926.264-.218.655-.323 1.19-.323.265 0 .525.018.75.048l.034.004c.254.034.503.082.701.134z"/>
                    </svg>
                </div>
            </div>
          </div>
        </div>
    );
};

export default HeroPage;