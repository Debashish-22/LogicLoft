import React from "react";

import Spinner from "./Spinner";

interface LoadingButton{
    height?: string;
    width?: string;
    loading: boolean;
    onClick: () => unknown
    type?: any
    btnText: string
    disable?: boolean
}

const LoadingButton = (props: LoadingButton) => {

    let isDisable = props.disable ? true : false;

    let cursorType = "";

    if(props.loading){
        cursorType = "cursor-progress";
    } else if(props.disable){
        cursorType = "cursor-not-allowed";
    } else {
        cursorType = "cursor-pointer";
    }

    return(
        <React.Fragment>
            <button
                type={props.type || "button"}
                onClick={props.onClick}
                disabled={props.disable || props.loading}
                className={`${props.height || "h-11"} ${props.width || "w-full"} ${cursorType} ${isDisable && "opacity-50"} rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 text-sm font-medium text-white`}
            >
                {props.loading ? <Spinner fill={"stroke-slate-50"}/> : props.btnText}
            </button>
        </React.Fragment>
    )
}

export default LoadingButton;