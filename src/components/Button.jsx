import React, { useState } from "react";

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-400',
    textColor = 'text-white',
    className = '',
    ...props
}) {
    const [blink, setBlink] = useState(false)
    const handleClick = () => {
        setBlink(true);
        setTimeout(() => setBlink(false), 200);
    }
    return (
        <button className={`px-4 py-2 rounded-lg ${blink ? 'bg-blue-600' :null } ${bgColor} ${textColor} ${className}`}{...props}
        onClick={handleClick}
        >
        {children}
        </button>
    )
}

export default Button