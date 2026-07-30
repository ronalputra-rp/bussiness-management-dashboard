import prisma from "../config/prisma.js";

export const getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;
        let summary = {};
        const totalProduct = await prisma.products.count({
            where: { userId: userId },
        });
        if (!totalProduct) {
            return res.status(400).send({
                message: "Total product counting error",
            });
        }
        summary = { totalProduct };

        const totalCategory = await prisma.category.count({
            where: { userId: userId },
        });
        if (!totalCategory) {
            return res.status(400).send({
                message: "Total category counting error",
            });
        }
        summary = { ...summary,totalCategory };

        const totalStock = await prisma.products.aggregate({
            where: {userId: userId },
            _sum: {
                stock: true,
            },
        });
        if (!totalStock) {
            return res.status(400).send({
                message:"Total stock counting error"
            })
        }
        summary = {...summary,totalStock};

        const totalRevenue = await prisma.detailedTransactions.aggregate({
            where:{userId:userId},
            _sum: {
                subtotal:true
            }
        })
        if (!totalRevenue) {
            return res.status(400).send({
                message:"Total revenue counting error"
            })
        }
        summary = {...summary,totalRevenue}

        const inventoryCount = await prisma.$queryRaw`
            SELECT SUM (stock * price) as total_inventory
            FROM "Products"
            WHERE "userId" = ${userId}
        `
        if (!inventoryCount) {
            return res.status(400).send({
                message:"Total inventory counting error"
            })
        }

        const inventoryValue = result[0]?.total_inventory ? Number(result[0].total_inventory) : 0;
        summary = {...summary, totalInventory: inventoryValue};

        const totalItemsSold = await prisma.detailedTransactions.aggregate({
            where:{userId:userId},
            _sum:{
                quantity:true
            }
        })
        if (!totalItemsSold) {
            return res.status(400).send({
                message:"Total product sold cannot be generated"
            })
        }
        summary = {...summary,totalProductSold: totalItemsSold}

        const totalOrders = await prisma.transactions.count({
            where:{userId:userId}
        })
        if (!totalOrders) {
            return res.status(400).send({
                message:"Total orders counting error"
            })
        }
        summary = {...summary,totalOrders}
        
        const recentTransactions = await prisma.detailedTransactions.findMany({
            where:{userId:userId},
            take:5
        })
        if (!recentTransactions) {
            return res.status(400).send({
                message:"Transactions cannot be displayed"
            })
        }
        summary = {...summary,recentTransactions};
        return res.status(200).send({
            message:"Data has been sent",
            summary
        })

    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};
