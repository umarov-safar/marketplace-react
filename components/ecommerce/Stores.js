import React from "react";
import {useSellers} from "../../src/api/sellers/sellers";
import {useState, useEffect} from "react";
import {SELLER_KEY_IN_LOC} from "../../util/constants";
import {getSeller} from "../../util/util";

const Stores = ({action, label, selectClass, optionClass, handler, elmRef}) => {

    const {data, isSuccess, isLoading} = useSellers();
    const [store, setStore] = useState();

    useEffect(() => {
        setStore(getSeller())
    }, []);

    return (
        <form action={action}>
            <select
                className={selectClass}
                ref={elmRef}
                onChange={handler}
                value={store?.id}
            >
                <option className={optionClass}>{label}</option>
                {isSuccess && data?.data?.map((seller, i) => (
                    <option
                        key={i}
                        className={optionClass}
                        value={seller.id}
                    >
                        {seller.legal_name}
                    </option>
                ))}
            </select>
        </form>
    )
}

Stores.defaultProps = {
    action: '#',
    selectClass: '',
    optionClass: '',
    label: 'Магазины'
}


export default Stores;
