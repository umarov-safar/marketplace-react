import {apiClient} from "../apiClient";
import {useQuery} from "@tanstack/react-query";

const API_URL = 'catalog/brands'
const QUERY_KEY = 'brands';
export const useBrands = (data, options = {}) => useQuery({
    queryKey: [QUERY_KEY, data],
    queryFn: () => apiClient.post(`${API_URL}:search`, {data}),
    ...options
})