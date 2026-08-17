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
}: InputFieldProps) {
    return (
        <div>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                readOnly={readonly}
            />
            {touched && error ? (
                <div style={{ color: 'red' }}>{error}</div>
            ) : null}
        </div>
    );
}