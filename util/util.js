// Delete Product from List By Id
import {ADDRESS_KEY_IN_LOC, SELLER_KEY_IN_LOC} from "./constants";

export const deleteProduct = (list, id) => {
    const filter = list.filter((item) => item.id !== id);
    return filter;
};

// Find Product Index From List
export const findProductIndex = (list, slug) => {
    const index = list.findIndex((item) => item.slug === slug);
    return index;
};
export const findProductIndexById = (list, id) => {
    const index = list.findIndex((item) => item.id === id);
    return index;
};


export const getSeller = () => {
    const seller = localStorage.getItem(SELLER_KEY_IN_LOC);
    return JSON.parse(seller);
}


export const addressInfo = () => {
    const address = localStorage.getItem(ADDRESS_KEY_IN_LOC);

    return JSON.parse(address);
}