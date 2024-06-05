import React, { forwardRef } from "react";

interface InputFieldProps {
    type?: string;
    name: string;
    title: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    value: string;
    placeholder: string;
    message?: string;
    children?: React.ReactNode;
}

type Ref = HTMLInputElement;

const InputField = forwardRef<Ref, InputFieldProps>((props, ref) => {
    const {type, name, title, onChange, placeholder, disabled, value, message, children} = props;
    
    return(
        <React.Fragment>
            <div>
                <label htmlFor={name} className="block mb-3 text-sm font-normal text-slate-700 dark:text-slate-300">{title}</label>
                <div className="relative">
                    <input 
                        type={type || "text"}
                        id={name} 
                        ref={ref} 
                        name={name} 
                        value={value} 
                        placeholder={placeholder} 
                        onChange={onChange} 
                        disabled={disabled}
                        autoComplete="off"
                        className="text-sm rounded-lg block w-full p-2.5 focus:outline-none text-slate-700 dark:text-white bg-slate-50 border border-slate-300/50 bg-slate-200/50 dark:border-slate-600/50 dark:bg-slate-700/50" 
                    />
                    {message && <p className="mt-2 text-xs tracking-wide text-red-700 dark:text-red-300 font-light">{message}</p>}
                </div>
                {children}
            </div>
        </React.Fragment>
    )
})

InputField.displayName = 'InputField';

export default InputField;