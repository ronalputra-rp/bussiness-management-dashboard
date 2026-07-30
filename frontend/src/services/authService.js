import api from './api'

export const userRegister = async (body) => {
    const {data} = api.post('/auth/register',body);
    return data;
}

export const userLogin = async (body) => {
    const {data} = api.get('/auth/login');
    const token = data.token;
    localStorage.setItem("token",token)
    return data;
}