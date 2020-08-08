import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavItem = ({ children, to, style }) => {
    const [isHovered, setIsHovered] = useState(false);
    const btnClass = isHovered
        ? "flex items-center justify-center mr-32 text-main-blue bg-main-navHover"
        : "flex items-center justify-center mr-32";

    const handleHover = () => {
        setIsHovered(prevState => !prevState);
    };

    return (
        <Link
            to={to}
            style={{ paddingTop: "8px", paddingBottom: "8px" }}
            className=""
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
        >
            <div
                style={{
                    padding: "10px",
                    borderRadius: "9999px",
                }}
                className={btnClass}
            >
                {children}
            </div>
        </Link>
    );
};

export default NavItem;
