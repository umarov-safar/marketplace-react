import {apiClient} from "../apiClient";
import {useQuery} from "@tanstack/react-query";

const API_URL = 'auth/';
const QUERY_KEY = 'user';

export const useUser = (data, options = {}) => useQuery({
    queryKey: [QUERY_KEY, data],
    queryFn: () => apiClient.post(`${API_URL}/register`, {data}),
    ...options
});

export const useLogout = (options = {}) => useQuery({
    queryFn: () => apiClient.get(`${API_URL}/logout`),
    ...options
});


