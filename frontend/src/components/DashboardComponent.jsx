function DashboardComponent({data}) {
    return (
        <section>
            <section>Total Product : {data.totalProduct}</section>
            <section>Total Category : {data.totalCategory}</section>
            <section>Total Stock : {data.totalStock}</section>
            <section>Total Revenue : {data.totalRevenue}</section>
            <section>Total Inventory : {data.totalInventory}</section>
            <section>Total Items Sold : {data.totalItemsSold}</section>
            <section>Total Orders : {data.totalOrders}</section>
            <section>Recent Transactions : {data.recentTransactions}</section>
        </section>
    )
}

export default DashboardComponent;