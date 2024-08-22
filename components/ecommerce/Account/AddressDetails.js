import React, {useEffect, useState} from "react"
import 'react-dadata/dist/react-dadata.css';
import {AddressForm} from "./AddressForm";
import {Modal} from "react-responsive-modal";
import {useDeleteCustomer} from "../../../src/api/customers/customers";

const AddressDetails = ({customer}) => {

    const [addressForEdit, setAddressForEdit] = useState();

    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const {isSuccess: isDeleted, isLoading, mutate: deleteHandle} = useDeleteCustomer();

    const handleDelete = (id) => {
        let yes = confirm('Вы действительно хотите удалить!')

        if (yes) {
            deleteHandle(id);
        }
    }

    const handleEdit = (address) => {
        setAddressForEdit(address);
        setOpen(true)
    }

    return (
        <div className="card">
            <div className="card-header">
                <h5>Адресы</h5>
            </div>
            <div className="card-body p-0 p-md-1">
                {customer?.addresses?.map((item, i) => (
                    <div
                        key={i}
                        className="d-md-flex justify-content-between align-items-center shadow-sm p-4 m-2 border border-radius-5 "
                    >
                        <p className='font-lg'>
                            {item.value}
                            <br/>
                            {item.default &&
                                <small className='font-sm alert-success p-1 border-radius'>по умолчанию</small>}
                        </p>
                        <div className="d-flex gap-1">
                            <button
                                className='btn-danger border-0 p-1 border-radius'
                                onClick={() => handleDelete(item.id)}
                            >
                                Удалить {isLoading && '...'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <Modal open={open} onClose={closeModal} classNames={{modal: 'overflow-y-unset'}} center>
                <AddressForm customer={customer} closeModal={closeModal} addressForEdit={addressForEdit}/>
            </Modal>

            <div className="d-flex justify-content-end">
                <button
                    onClick={openModal}
                    className="btn btn-sm font-weight-bold"
                >
                    Добавить адрес
                </button>
            </div>
        </div>
    )
}

export default AddressDetails;