import React from "react";


const Input = (
    {
        label,
        type,
        placeholder,
        onChange,
        register,
        error,
        divClass,
        ...props
    }
) => {
    return (
        <div className={`form-group ${divClass || 'col-md-12'}`}>
            <label className='font-weight-bold'>
                {label}
            </label>
            <span className="d-block text-danger">{error && error}</span>
            <input
                className={`form-control ${(error && 'border-danger') || ''}`}
                {...register}
                {...props}
                type={type || 'text'}
                placeholder={placeholder}
                onChange={onChange}
            />
        </div>
    );
}

export default Input;