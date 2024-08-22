import {useForm} from "react-hook-form";
import {useCreateAddressCustomer} from "../../../src/api/customers/customers";
import React, {useEffect, useState} from "react";
import {AddressSuggestions} from "react-dadata";
import Radio from "../../elements/Radio";

export const AddressForm = ({customer, closeModal}) => {

    const [address, setAddress] = useState();

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {}
    });

    const {isSuccess, isLoading, data: addressData, isError, mutate} = useCreateAddressCustomer();

    const submitForm = async (data) => {

        if (!address) {
            alert("Выберите Адрес");
            return;
        }

        const aData = address.data;

        const newData = {
            address: {
                city: aData.city,
                country: aData.country,
                country_iso_code: aData.country_iso_code,
                geo_lat: aData.geo_lat,
                geo_lon: aData.geo_lon,
                geoname_id: aData.geoname_id,
                house: aData.house,
                house_type_full: aData.house_type_full,
                house_type: aData.house_type,
                region_type: aData.region_type,
                region_type_full: aData.region_type_full,
                region_with_type: aData.region_with_type,
                room: aData.room,
                street: aData.street,
                street_type: aData.street_type,
                street_type_full: aData.street_type_full,
                street_with_type: aData.street_with_type,
                unrestricted_value: address.unrestricted_value,
                value: address.value
            },
            default: Boolean(parseInt(data.default))
        };

        await mutate(newData)


    }

    useEffect(() => {
        if (addressData && !addressData.errors) {
            closeModal(false);
        }
    }, [isSuccess, addressData])

    return (
        <div className="card-body">
            <form onSubmit={handleSubmit(submitForm)}>
                <div className="row">
                    <div className="my-3">
                        <span className='font-weight-bold'>Ваш адрес</span>
                        <AddressSuggestions
                            token='51f0e3673e2c3cca210de7c411aacb6cfd10f8f9'
                            value={address}
                            onChange={setAddress}
                        />
                    </div>
                    <span className='font-weight-bold'>Адрес по умолчанию</span>
                    <span className="d-block text-danger">{errors.gender && errors.gender.message}</span>
                    <div className='d-flex gap-3 my-2'>
                        <Radio
                            label='Да'
                            divClass='col-md-6'
                            type='radio'
                            value={1}
                            register={register('default', {required: 'Выберите пол'})}
                        />
                        <Radio
                            label='Нет'
                            divClass='col-md-6'
                            type='radio'
                            value={0}
                            register={register('default')}
                        />
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