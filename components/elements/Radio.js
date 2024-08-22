import React from "react";
import {generateString} from "../../util/helpers";


const Radio = (
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
    const id = generateString(7);

    return (
        <div className="form-check">
            <input
                className="form-check-input"
                type="radio"
                {...register}
                onChange={onChange}
                id={id}
                {...props}
            />
            <label htmlFor={id} className="form-check-label font-weight-bold">
                {label}
            </label>
        </div>
    );
}

export default Radio;