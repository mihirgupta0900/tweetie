import React from "react";

const Button = (props) => {
    return (
        <button
            className={`text-white font-bold px-6 py-2 rounded-full bg-main-blue focus:outline-none focus:shadow-outline text-center ${props.className}`}
        >
            {props.children}
        </button>
    );
};

export default Button;
