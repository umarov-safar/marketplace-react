import {apiClient} from "../apiClient";
import {useQuery} from "@tanstack/react-query";

const API_URL = 'catalog/products';
const QUERY_KEY = 'products';

export const useProducts = (data, options = {}) => useQuery({
    queryKey: [QUERY_KEY, data],
    queryFn: () => apiClient.post(`${API_URL}:search`, {data}),
    ...options
});


const PRODUCT_KEY = 'product'
export const useGetProduct = (data, options = {}) => useQuery({
    queryKey: [PRODUCT_KEY, data],
    queryFn: () => apiClient.post(`${API_URL}:search-one`, {data}),
    ...options
});
