import React from "react";

interface Button{
    children: React.ReactNode;
    height?: string;
    width?: string;
    onClick: () => unknown
}

const Button = (props: Button) => {
    return(
        <React.Fragment>
            <button
                type="button"
                onClick={props.onClick}
                className={`${props.height || "h-10"} ${props.width || "w-full"} rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-sm font-medium text-white`}
            >
                {props.children}
            </button>
        </React.Fragment>
    )
}

export default Button;