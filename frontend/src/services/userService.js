import axios from "axios";
import api from "./api";

export const getUser = async () => {
    const { data } = await api.get("/user/profile");
    return data;
};

export const updateUser = async () => {
    const { data } = await api.patch("/user/change-profile");
    return data;
};

export const deleteUser = async () => {
    const { data } = await api.delete("/user/delete-profile");
    return data;
};
