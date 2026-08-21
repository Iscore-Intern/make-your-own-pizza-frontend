import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function Button({ children, className = '', ...props }: ButtonProps) {
    return (
        <button 
            {...props}
            className={`
                w-full bg-red-color text-white-color font-bold text-lg 
                py-3 px-6 rounded-2xl shadow-md 
                border-black-font border-r-4 border-b-4 border-l-1 border-t-1 
                hover:bg-button-hover hover:shadow-lg hover:-translate-y-1 
                transition-all duration-300 
                disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                ${className}
            `}
        >
            {children}
        </button>
    );
}
