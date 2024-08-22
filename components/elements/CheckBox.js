import React from "react";
import {generateString} from "../../util/helpers";

export const CheckBoxForm = ({label, defaultValue}) => {
    let id = generateString(7);
    return (
        <div className='checkbox d-flex align-items-center gap-1'>
            <input
                id={id}
                type="checkbox"
                defaultValue={defaultValue}
            />
            <label className={'font-weight-bold'} htmlFor={id}>{label}</label>
        </div>)
}