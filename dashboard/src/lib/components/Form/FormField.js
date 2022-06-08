import React from "react";
import { Controller } from "react-hook-form";

import { Input } from "./Input";

export const FormField = ({
    component: Component = Input,
    isDisabled = false,
    onChange,
    onBlur,
    name,
    control,
    error,
    ...props
}) => {
    const handleChange = (payload) => {
        if (onChange) onChange(payload);
    };

    const handleBlur = (payload) => {
        if (onBlur) onBlur(payload);
    };

    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => {
                return (
                    <Component
                        onChange={(e) => {
                            onChange(e);
                            handleChange(e);
                        }}
                        onBlur={(e) => {
                            handleBlur(e);
                            onBlur(e);
                        }}
                        value={value}
                        validationMessage={error}
                        name={name}
                        {...props}
                    />
                );
            }}
        />
    );
};
