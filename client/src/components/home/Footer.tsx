import Link from "next/link";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="px-4 py-12 flex flex-col justify-center items-center">
            <h4 className="w-fit mb-3 text-base text-blue-500 dark:text-blue-300">Designed & Developed by</h4>
            <Link
                href="https://github.com/Debashish-22"
                target="_blank"
                aria-label="Developer"
                className="mt-4 gap-4 flex justify-between items-center rounded-xl"
            >
                <Image
                    src="/home/me.jpg"
                    width={50}
                    height={50}
                    alt="Debashish Jena"
                    className="rounded-full object-center object-contain"
                />
                <div>
                    <h5 className="mb-1 text-base font-medium text-slate-700 dark:text-white">Debashish Jena</h5>
                    <p className="text-sm font text-slate-400 dark:text-slate-300">Web Developer, India</p>
                </div>
            </Link>
        </div>
    )
}

export default Footer;