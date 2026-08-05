import api from "./api";

export const getHeaderTransactions = async (minTotalPrice, maxTotalPrice, createdAt, order, limit, sort, page) => {
    const { data } = await api.get("/transactions", {
        params: {
            minTotalPrice: minTotalPrice,
            maxTotalPrice: maxTotalPrice,
            createdAt: createdAt,
            order: order,
            limit: limit,
            sort: sort,
            page: page,
        },
    });
    return data;
};

export const getHeaderTransactionsId = async (id) => {
    const { data } = await api.get(`/transactions/${id}`);
    return data;
};

export const getDetailedTransactions = async (
    transactionId,
    productId,
    minPrice,
    maxPrice,
    minStock,
    maxStock,
    minSubtotal,
    maxSubtotal,
    order,
    limit,
    page,
    sort,
) => {
    const { data } = await api.get(`/transactions/${transactionId}/details`,{
        params:{
            productId,
            minPrice,
            maxPrice,
            minStock,
            maxStock,
            minSubtotal,
            maxSubtotal,
            order,
            limit,
            page,
            sort
        }
    });
    return data;
};

export const addTransactions = async (body) => {
    const {data} = await api.post('/transactions',body);
    return data;
}

export const addDetailedTransactions = async (id,body) => {
    const {data} = await api.post(`/transactions/${id}/details`,body);
    return data;
}

export const updateTransactions = async (id,body) => {
    const {data} = await api.patch(`/transactions/${id}`,body);
    return data;
}

export const updateDetailedTransactions = async (id,transactionId,body) => {
    const {data} = await api.patch(`/transactions/${id}/${transactionId}/details`,body);
    return data;
}

export const deleteAllTransactions = async (id) => {
    const {data} = await api.delete(`/transactions/${id}`);
    return data;
}

export const deleteDetailedTransactions = async (id,transactionId) => {
    const {data} = await api.delete(`/transactions/${id}/${transactionId}/details`);
    return data;
}