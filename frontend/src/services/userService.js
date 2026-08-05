import api from "./api";

export const getUser = async () => {
    const { data } = await api.get("/user");
    return data;
};

export const updateUser = async (body) => {
    const { data } = await api.patch("/user", body);
    return data;
};

export const deleteUser = async () => {
    const { data } = await api.delete("/user");
    return data;
};
