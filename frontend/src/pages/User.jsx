import { useEffect, useState } from "react";
import UserProfileComponent from "../components/UserComponent";

function UserPage() {
    const [dataUser,setUser] = useState();
    useEffect(() => {
        UserProfileComponent()
        .then(res => setUser(res.data))
        .catch(err => {
            console.error(err);
            return err;
        })
    },[])
    return (
        <UserProfileComponent data={dataUser}/>
    )
}