import React from "react";

const SmallButtons = ({ iconSrc, style, height = "18px", number }) => {
    return (
        <button>
            <div className="flex items-center">
                <img
                    src={iconSrc}
                    style={{ height: height, marginRight: "5px" }}
                    alt=""
                />
                <span className="text-main-offWhite">{number}</span>
            </div>
        </button>
    );
};

export default SmallButtons;
