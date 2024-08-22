import {AddressSuggestions} from "react-dadata";
import React from "react";

export const AddressDadata = ({setAddress}) => {
    return (<>
        <span className='font-weight-bold'>Ваш адрес</span>
        <AddressSuggestions
            inputProps={{
                placeholder: 'Напишите адрес'
            }}
            token='51f0e3673e2c3cca210de7c411aacb6cfd10f8f9'
            onChange={setAddress}
        />
    </>)
}