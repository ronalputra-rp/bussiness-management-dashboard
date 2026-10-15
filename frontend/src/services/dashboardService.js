import api  from "./api";

export const dashboard = async () => {
    const {data} = await api.get('/dashboard');
    return data;
}
