import React from "react";

interface Spinner{
    fill?: string;
}

const Spinner = (props: Spinner) => {
    return(
        <React.Fragment>
            <svg
                style={{
                    margin: "auto",
                    background: "none",
                    display: "block",
                    shapeRendering: "auto",
                }}
                width="26px"
                height="26px"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid"
            >
                <circle
                    cx={50}
                    cy={50}
                    fill="none"
                    // stroke={props.fill || "#e2e8f0"}
                    className={props.fill || "stroke-slate-800 dark:stroke-slate-50"}
                    strokeWidth={9}
                    r={25}
                    strokeDasharray="117.80972450961724 41.269908169872416"
                >
                    <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="1s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                    />
                </circle>
            </svg>
        </React.Fragment>
    )
}

export default Spinner;