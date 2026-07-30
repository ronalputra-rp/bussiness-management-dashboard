import api from './api';

export const showCategory = async () => {
    const {data} = await api.get('/category');
    return data;
}

export const addCategory = async (body) => {
    const {data} = await api.post('/category',body);
    return data;
}

export const updateCategory = async (id,body) => {
    const {data} = await api.patch(`/category/${id}`,body);
    return data;
}

export const deleteCategory = async (id) => {
    const {data} = await api.delete(`/category/${id}`);
    return data;
}