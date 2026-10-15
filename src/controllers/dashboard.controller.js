import prisma from "../config/prisma.js";

export const getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        const totalProduct = await prisma.products.count({
            where: { userId: userId },
        });
        const totalCategory = await prisma.category.count({
            where: { userId: userId },
        });
        const totalStock = await prisma.products.aggregate({
            where: { userId: userId },
            _sum: {
                stock: true,
            },
        });
        const totalRevenue = await prisma.detailedTransactions.aggregate({
            where: { userId: userId },
            _sum: {
                subtotal: true,
            },
        });
        const inventoryCount = await prisma.$queryRaw`
            SELECT SUM (stock * price) as total_inventory
            FROM "Products"
            WHERE "userId" = ${userId}
        `;
        const totalItemsSold = await prisma.detailedTransactions.aggregate({
            where: { userId: userId },
            _sum: {
                quantity: true,
            },
        });
        const totalOrders = await prisma.transactions.count({
            where: { userId: userId },
        });
        const recentTransactions = await prisma.detailedTransactions.findMany({
            where: { userId: userId },
            take: 5,
        });

        const summary = {
            totalProduct,
            totalCategory,
            totalStock: totalStock._sum.stock ?? 0,
            totalRevenue: totalRevenue._sum.subtotal ?? 0,
            totalInventory: inventoryCount[0]?.total_inventory ? Number(inventoryCount[0].total_inventory) : 0,
            totalItemsSold: totalItemsSold._sum.quantity ?? 0,
            totalOrders,
            recentTransactions,
        };

        return res.status(200).send({
            message: "Data has been sent",
            data: summary,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};
