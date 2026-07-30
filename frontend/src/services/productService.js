import api from './api'

export const showProducts = async(params = {}) => {
    const {data} = await api.get('/products',{
        params
    })
    return data;
}

export const showProductsById = async (id) => {
    const {data} = await api.get(`/products/${id}`)
    return data;
}

export const creatingProduct = async (body) => {
    const {data} = await api.post('/products',body);
    return data;
}

export const updatingProduct = async (id,body) => {
    const {data} = await api.patch(`/products/${id}`,body);
    return data;
}

export const deletingProduct = async (id) => {
    const {data} = await api.delete(`/products/${id}`);
    return data;
}
