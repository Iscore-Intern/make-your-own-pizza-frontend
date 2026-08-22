import React from 'react';

interface InputFieldProps {
    label: string;
    type: string;
    name: string;
    value: string;
    readonly: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    error?: string;
    touched?: boolean;
    className?: string;
}

export default function Field({
    label,
    type,
    name,
    value,
    onChange,
    onBlur,
    error,
    touched,
    readonly,
    className
}: InputFieldProps) {
    return (
        <div>
            <label className="text-sm font-bold text-amber-950 mb-1 block">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                readOnly={readonly}
                className={`
                    w-full px-4 py-3 rounded-xl 
                    border border-beige-dark border-2 
                    bg-beige-color text-beige-dark placeholder-beige-dark
                    focus:outline-none focus:border-black-font border-r-4 border-b-4 border-l-1 border-t-1  
                    transition-all duration-200
                    ${className}
                `}
            />
            {touched && error ? (
                <div style={{ color: 'red' }}>{error}</div>
            ) : null}
        </div>
    );
}