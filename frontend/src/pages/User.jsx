import { useEffect, useState } from "react";
import UserProfileComponent from "../components/UserComponent";
import { getUser } from "../services/userService";

function UserPage() {
    const [dataUser, setUser] = useState();

    async function refresh() {
        try {
            const res = await getUser();
            setUser(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    return (
        <UserProfileComponent data={dataUser} onRefresh={refresh} />
    );
}

export default UserPage;
