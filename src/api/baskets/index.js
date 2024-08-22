import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {apiClient} from "../apiClient";

const API_KEY = 'baskets/baskets/customer';

const BASKET_KEY = 'baskets';

export const useBaskets = (data, options = {}) => useQuery({
    queryKey: [BASKET_KEY],
    queryFn: () => apiClient.post(`${API_KEY}:search-one`, {data}),
    ...options
});
export const useCreateBaskets = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => apiClient.post(`${API_KEY}:set-item`, {data}),
        {
            onSuccess: () => queryClient.invalidateQueries(BASKET_KEY)
        }
    );
}

// form elasticsearch products
export const useBasketItems = (data, options = {}) => useQuery({
    queryKey: ['basket-items'],
    queryFn: () => apiClient.post(`${API_KEY}:basket-items`, {data}),
    ...options
})


export const useDeleteBasket = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => apiClient.delete(`${API_KEY}:delete`, {data}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(BASKET_KEY)
            }
        }
    );
};


export const useDeleteBasketItem = () => {
    const queryClient = useQueryClient();
    return useMutation((data) => apiClient.delete(`${API_KEY}:delete-item`, {data}),
        {
            onSuccess: () => {
                queryClient.invalidateQueries('basket-items')
            }
        }
    );
};

