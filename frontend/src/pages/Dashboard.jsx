import { useEffect, useState } from "react";
import DashboardComponent from "../components/DashboardComponent";
import dashboard from "../services/dashboardService";

function DashboardPage() {
    const [dataDashboard,setData] = useState();
    useEffect(() => {
        dashboard()
        .then(res => setData(res.data))
        .catch(err => {
            console.error(err);
            return err;
        })
    },[])
    
    return (
        <DashboardComponent data={dataDashboard}/>
    )
}