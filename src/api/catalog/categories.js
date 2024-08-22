import {apiClient} from "../apiClient";
import {useQuery} from "@tanstack/react-query";

const API_URL = 'catalog/categories';
const QUERY_KEY = 'categories';

export const useCategories = (data, options = {}) => useQuery({
    queryKey: [QUERY_KEY, data],
    queryFn: () => apiClient.post(`${API_URL}:search`, {data}),
    ...options
})
export const useGetCategory = (id, options = {}) => useQuery({
    queryKey: [QUERY_KEY, id],
    queryFn: () => apiClient.get(`${API_URL}/${id}`),
    ...options
});
