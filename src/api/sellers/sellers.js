import {apiClient} from "../apiClient";
import {useQuery} from "@tanstack/react-query";

const API_URL = 'sellers/sellers';
const QUERY_KEY = 'sellers';

export const useSellers = (data, options = {}) => useQuery({
    queryKey: [QUERY_KEY, data],
    queryFn: () => apiClient.post(`${API_URL}:search`, {data}),
    ...options
});

export const useGetSeller = (id, options = {}) => useQuery({
    queryKey: ['seller', id],
    queryFn: () => apiClient.get(`${API_URL}/${id}`),
    ...options
})
