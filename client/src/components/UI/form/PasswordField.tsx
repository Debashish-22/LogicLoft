import React, { useState, forwardRef } from "react";

interface PasswordFieldProps {
    name: string;
    title: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFocus?: () => void;
    disabled: boolean;
    value: string;
    placeholder: string;
    message?: string;
    children?: React.ReactNode;
}

type Ref = HTMLInputElement;

const PasswordField = forwardRef<Ref, PasswordFieldProps>((props, ref) => {
    const [visible, setVisible] = useState(false);

    const handleVisibility = () => setVisible(prevState => !prevState);

    const {name, title, onChange, onFocus, placeholder, disabled, value, message, children} = props;
    
    return(
        <React.Fragment>
            <div>
                <label htmlFor={name} className="block mb-3 text-sm font-normal text-slate-700 dark:text-slate-300">{title}</label>
                <div className="relative">
                    <input 
                        type={visible ? "text" : "password"} 
                        id={name} 
                        ref={ref} 
                        name={name} 
                        value={value} 
                        placeholder={placeholder} 
                        onChange={onChange} 
                        onFocus={onFocus}
                        disabled={disabled}
                        autoComplete="off"
                        className="text-sm rounded-lg block w-full p-2.5 focus:outline-none text-slate-700 dark:text-white bg-slate-50 border border-slate-300/50 bg-slate-200/50 dark:border-slate-600/50 dark:bg-slate-700/50"
                    />
                    <button type="button" onClick={handleVisibility} className="absolute right-2.5 top-2.5">
                        {
                            visible
                            ?
                            <svg className="w-6 h-6" fill="none">
                                <path className="stroke-1-half stroke-slate-600 dark:stroke-slate-300" d="M20.883 11.783a.434.434 0 010 .434C20.276 13.29 17.315 18 12 18c-5.315 0-8.276-4.709-8.883-5.783a.433.433 0 010-.434C3.724 10.71 6.685 6 12 6c5.315 0 8.276 4.709 8.883 5.783z"/>
                                <path className="fill-slate-600 dark:fill-slate-300" d="M15 12.043a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            :
                            <svg className="w-6 h-6" fill="none"><path className="stroke-1-half stroke-slate-600 dark:stroke-slate-300" d="M21 8s-3 6-9 6-9-6-9-6M4.416 11.377l-2.475 2.475M4.416 11.377l-2.475 2.475M19.88 11.377l2.475 2.475M9.031 14.317l-.906 3.381M14.971 14.317l.906 3.38" strokeLinecap="round"/></svg>
                        }
                    </button>
                    {message && <p className="mt-2 text-xs tracking-wide text-red-700 dark:text-red-300 font-light">{message}</p>}
                </div>
                {children}
            </div>
        </React.Fragment>
    )
});

PasswordField.displayName = 'PasswordField';

export default PasswordField;