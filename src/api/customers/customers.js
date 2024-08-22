import {apiClient} from "../apiClient";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

const API_URL = 'customers/customers';
const QUERY_KEY = 'customer_info';

export const getCustomer = (data, options = {}) => useQuery({
    queryKey: [QUERY_KEY],
    queryFn: () => apiClient.get(`${API_URL}:get-by-auth-id`, {params: data.params}),
    ...options
});

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => apiClient.patch(`${API_URL}`, {data}),
        {
            onSuccess: () => queryClient.invalidateQueries(QUERY_KEY)
        }
    );
}


// ********************* ADDRESSES ************************ //

const API_ADDRESS_URL = 'customers/addresses';

export const useCreateAddressCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => apiClient.post(`${API_ADDRESS_URL}`, {data}),
        {
            onSuccess: () => queryClient.invalidateQueries(QUERY_KEY)
        }
    );
}

export const useDeleteCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation((id) => apiClient.delete(`${API_ADDRESS_URL}/${id}`),
        {
            onSuccess: () => queryClient.invalidateQueries(QUERY_KEY)
        }
    );
}

// ********************* ADDRESSES ************************ //


// ********************* COMPANIES ************************ //

const API_COMPANIES_URL = 'companies/companies';
const COMPANIES_KEY = 'customer_companies';

export const useCompanies = (data, options = {}) => useQuery({
    queryKey: [COMPANIES_KEY],
    queryFn: () => apiClient.post(`${API_COMPANIES_URL}:search`, {data}),
    ...options
});

const COMPANY_KEY = 'company';
export const useGetCompany = (id, config, options) => useQuery({
    queryKey: [COMPANY_KEY],
    queryFn: () => apiClient.get(`${API_COMPANIES_URL}/${id}`, config),
    ...options
});

export const useCreateCompany = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => apiClient.post(`${API_COMPANIES_URL}`, {data}),
        {
            onSuccess: () => queryClient.invalidateQueries(COMPANIES_KEY)
        }
    );
}

// ********************* COMPANIES ************************ //


// ********************* COMPANIES USERS ************************ //

const API_COMPANY_USER = 'companies/company_user'
export const useCreateCompanyUser = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => apiClient.post(`${API_COMPANY_USER}`, {data}),
        {
            onSuccess: () => queryClient.invalidateQueries(COMPANIES_KEY)
        }
    );
}

export const useDeleteCompanyUser = () => {
    const queryClient = useQueryClient();
    return useMutation((id) => apiClient.delete(`${API_COMPANY_USER}/${id}`),
        {
            onSuccess: () => queryClient.invalidateQueries(COMPANY_KEY)
        }
    );
}


export const useUpdateCompanyUser = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => apiClient.patch(`${API_COMPANY_USER}/${data.employee_id}`, {data: data.data}),
        {
            onSuccess: () => queryClient.invalidateQueries(COMPANY_KEY)
        }
    );
}