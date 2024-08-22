import {useForm} from "react-hook-form";
import React, {useEffect, useState} from "react";
import {AddressSuggestions} from "react-dadata";
import {ADDRESS_KEY_IN_LOC} from "../../util/constants";
import {AddressDadata} from "../elements/AddressDadata";

export const ChooseAddress = ({closeModal}) => {

    const [address, setAddress] = useState();

    const submitForm = (e) => {
        e.preventDefault()
        if (address && address?.data.street) {
            localStorage.setItem(ADDRESS_KEY_IN_LOC, JSON.stringify(address));
            closeModal()
        } else {
            alert("Выберите правильный адресс!")
        }
    }

    return (
        <div className="card-body w-lg-25">
            <form onSubmit={submitForm}>
                <div className="row">
                    <div className="my-3">
                        <AddressDadata setAddress={setAddress}/>
                    </div>
                </div>
                <div className="col-md-12">
                    <button
                        type="submit"
                        className="btn btn-sm  font-weight-bold"
                        name="submit"
                        value="Submit"
                        onChange={() => {
                        }}
                    >
                        Сохранить
                    </button>
                </div>
            </form>
        </div>
    )

}