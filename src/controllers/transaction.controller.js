import prisma from "../config/prisma.js";

export const getHeaderTransactions = async (req, res) => {
    try {
        // Setting pagination dan sort untuk tampilan transactions
        const userId = req.user.id;
        const { minTotalPrice, maxTotalPrice, createdAt } = req.query;
        const where = { userId };

        if (minTotalPrice) {
            where.totalPrice = { ...where.totalPrice, gte: Number(minTotalPrice) };
        }
        if (maxTotalPrice) {
            where.totalPrice = { ...where.totalPrice, lte: Number(maxTotalPrice) };
        }
        if (createdAt) {
            where.createdAt = createdAt;
        }

        const transactionsQuery = await prisma.transactions.findMany({ where });
        return res.status(200).send({
            message: "Transactions has been sent",
            data: transactionsQuery,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const getHeaderTransactionsById = async (req, res) => {
    try {
        const params = Number(req.params.id);
        if (Number.isNaN(params)) {
            return res.status(400).send({
                message: "Invalid parameters",
            });
        }
        const transactionParams = await prisma.transactions.findMany({
            where: { userId: req.user.id, id: params },
        });
        return res.status(200).send({
            message: "Transactions has been sent",
            data: transactionParams,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const getDetailedTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const params = Number(req.params.transactionId);
        if (Number.isNaN(params)) {
            return res.status(400).send({
                message: "Invalid parameters",
            });
        }

        let conditions = {};
        const {
            productId,
            minPrice,
            maxPrice,
            minSubtotal,
            maxSubtotal,
        } = req.query;

        if (productId) {
            conditions = { productId: Number(productId) };
        }

        if (minPrice) {
            conditions.price = { ...conditions.price, gte: Number(minPrice) };
        }

        if (maxPrice) {
            conditions.price = { ...conditions.price, lte: Number(maxPrice) };
        }

        if (minSubtotal) {
            conditions.subtotal = { ...conditions.subtotal, gte: Number(minSubtotal) };
        }

        if (maxSubtotal) {
            conditions.subtotal = { ...conditions.subtotal, lte: Number(maxSubtotal) };
        }

        const finalWhere = {
            transactionId: params,
            userId: userId,
            ...conditions,
        };

        const queryDetailed = await prisma.detailedTransactions.findMany({
            where: finalWhere,
        });
        return res.status(200).send({
            message: "Detailed transactions has been sent",
            data: queryDetailed,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const addTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const { createdAt } = req.body || {};
        let parsedDate;
        if (createdAt) {
            parsedDate = new Date(createdAt);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).send("Invalid format of date");
            }
        }
        await prisma.transactions.create({
            data: {
                userId: userId,
                createdAt: parsedDate,
            },
        });
        return res.status(201).send({
            message: "Data succesfully created",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const addDetailedTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        let data = {};
        const params = Number(req.params.transactionId);
        if (!req.body) {
            return res.status(401).send({
                message: "There was no data sent",
            });
        }
        const { productId, quantity } = req.body;

        const findTransaction = await prisma.transactions.findFirst({
            where: { id: params, userId: userId },
        });
        if (!findTransaction) {
            return res.status(404).send({
                message: "Transaction not found",
            });
        }

        data = {
            transactionId: params,
            userId: userId,
        };

        if (!productId) {
            return res.status(400).send({
                message: "Product must be filled",
            });
        }

        const gettingProduct = await prisma.products.findFirst({
            where: { id: productId, userId: userId },
        });

        if (!gettingProduct) {
            return res.status(404).send({
                message: "Product not found",
            });
        }

        data = { ...data, productId };

        const dataPrice = gettingProduct.price;
        data = { ...data, price: dataPrice };

        if (!quantity || typeof quantity !== "number") {
            return res.status(400).send({
                message: "Invalid quantity input",
            });
        }

        if (gettingProduct.stock < quantity) {
            return res.status(400).send({
                message: "Stock is insufficient",
            });
        }

        data = { ...data, quantity };
        data = { ...data, subtotal: dataPrice * quantity };

        await prisma.$transaction(async (tx) => {
            const freshProduct = await tx.products.findFirst({
                where: { id: productId, userId: userId },
            });
            if (!freshProduct || freshProduct.stock < quantity) {
                throw new Error("INSUFFICIENT_STOCK");
            }
            await tx.products.update({
                where: { id: productId },
                data: { stock: freshProduct.stock - quantity },
            });
            await tx.detailedTransactions.create({ data });
            const currentHeader = await tx.transactions.findFirst({
                where: { id: params, userId: userId },
            });
            await tx.transactions.update({
                where: { id: params },
                data: { totalPrice: (currentHeader.totalPrice ?? 0) + data.subtotal },
            });
        });
        return res.status(201).send({
            message: "Data succesfully created",
        });
    } catch (err) {
        if (err.message === "INSUFFICIENT_STOCK") {
            return res.status(400).send({
                message: "Stock is insufficient",
            });
        }
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const updateTransactions = async (req, res) => {
    try {
        const params = Number(req.params.id);
        if (Number.isNaN(params)) {
            return res.status(400).send({
                message: "Invalid type of parameters",
            });
        }
        let data = {};
        const userId = req.user.id;
        const { createdAt } = req.body;
        if (createdAt) {
            const parsedDate = new Date(createdAt);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).send("Invalid format of date");
            }
            data = { createdAt };
        }
        const findTransactions = await prisma.transactions.findFirst({
            where: { id: params, userId: userId },
        });
        if (!findTransactions) {
            return res.status(404).send({
                message: "Data not found",
            });
        }
        await prisma.transactions.updateMany({
            where: { id: params, userId: userId },
            data,
        });
        return res.status(200).send({
            message: "Data sucessfully updated",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const updateDetailedTransactions = async (req, res) => {
    try {
        let data = {};
        const userId = req.user.id;
        const params = Number(req.params.id);
        const transId = Number(req.params.transactionId);
        if (Number.isNaN(params)) {
            return res.status(400).send({
                message: "Invalid type of parameters",
            });
        }

        if (Number.isNaN(transId)) {
            return res.status(400).send({
                message: "Invalid type of parameters",
            });
        }

        const validateData = await prisma.detailedTransactions.findFirst({
            where: { id: params, userId: userId, transactionId: transId },
        });

        if (!validateData) {
            return res.status(404).send({
                message: "Data not found",
            });
        }

        const { productId, quantity } = req.body;
        // productId perlu karena butuh mengubah produk yang tertera
        // tidak perlu input ulang, cukup ambil productId yang ada di frontend
        if (!productId) {
            return res.status(400).send({
                message: "Product must be filled",
            });
        }

        const gettingProduct = await prisma.products.findFirst({
            where: { id: productId, userId: userId },
        });

        if (!gettingProduct) {
            return res.status(404).send({
                message: "Product not found",
            });
        }

        data = { ...data, productId };

        const dataPrice = gettingProduct.price;
        data = { ...data, price: dataPrice };

        if (typeof quantity !== "number") {
            return res.status(400).send({
                message: "Invalid type of quantity",
            });
        }

        if (quantity) {
            data = { ...data, quantity };
        }

        data = { ...data, subtotal: dataPrice * quantity };

        await prisma.$transaction(async (tx) => {
            const freshProduct = await tx.products.findFirst({
                where: { id: productId, userId: userId },
            });
            if (!freshProduct || freshProduct.stock < quantity) {
                throw new Error("INSUFFICIENT_STOCK");
            }
            const detailedNow = await tx.detailedTransactions.findFirst({
                where: { id: params, userId: userId, transactionId: transId },
            });
            if (!detailedNow) {
                throw new Error("DATA_NOT_FOUND");
            }
            const difference = detailedNow.quantity - quantity;
            await tx.products.update({
                where: { id: productId },
                data: { stock: freshProduct.stock + difference },
            });
            await tx.detailedTransactions.updateMany({
                where: { id: params, userId: userId, transactionId: transId },
                data,
            });
            const sumSubtotal = await tx.detailedTransactions.aggregate({
                where: { transactionId: transId, userId: userId },
                _sum: {
                    subtotal: true,
                },
            });
            await tx.transactions.updateMany({
                where: { id: transId, userId: userId },
                data: { totalPrice: sumSubtotal._sum.subtotal ?? 0 },
            });
        });

        return res.status(200).send({
            message: "Data succesfully updated",
        });
    } catch (err) {
        console.error(err);
        if (err.message === "INSUFFICIENT_STOCK") {
            return res.status(400).send({
                message: "Stock is insufficient",
            });
        }
        if (err.message === "DATA_NOT_FOUND") {
            return res.status(404).send({
                message: "Data not found",
            });
        }
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const deleteAllTransactions = async (req, res) => {
    try {
        const params = Number(req.params.id);
        const userId = req.user.id;
        if (Number.isNaN(params)) {
            return res.status(400).send({
                message: "Invalid type of parameters",
            });
        }
        const findData = await prisma.transactions.findFirst({
            where: { id: params, userId: userId },
        });
        if (!findData) {
            return res.status(400).send({
                message: "Data not found",
            });
        }
        await prisma.detailedTransactions.deleteMany({
            where: { transactionId: params, userId: userId },
        });
        await prisma.transactions.deleteMany({
            where: { id: params, userId: userId },
        });
        return res.status(200).send({
            message: "Data deleted succesfully",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const deleteDetailedTransactions = async (req, res) => {
    try {
        const params = Number(req.params.id);
        const transId = Number(req.params.transactionId);
        const userId = req.user.id;
        if (Number.isNaN(params)) {
            return res.status(400).send({
                message: "Invalid type of parameters",
            });
        }
        if (Number.isNaN(transId)) {
            return res.status(400).send({
                message: "Invalid type of parameters",
            });
        }
        const validateData = await prisma.detailedTransactions.findFirst({
            where: { id: params, userId: userId, transactionId: transId },
        });
        if (!validateData) {
            return res.status(404).send({
                message: "Data not found",
            });
        }

        let data = {
            productId: validateData.productId,
            quantity: validateData.quantity,
            subtotal: validateData.subtotal,
        };

        await prisma.$transaction(async (tx) => {
            const freshProduct = await tx.products.findFirst({
                where: { id: data.productId, userId: userId },
            });
            const difference = data.quantity;
            await tx.products.update({
                where: { id: data.productId },
                data: { stock: freshProduct.stock + difference },
            });

            await tx.detailedTransactions.deleteMany({
                where: { id: params, userId: userId, transactionId: transId },
            });

            const sumSubtotal = await tx.detailedTransactions.aggregate({
                where: { transactionId: transId, userId: userId },
                _sum: {
                    subtotal: true,
                },
            });

            await tx.transactions.updateMany({
                where: { id: transId, userId: userId },
                data: { totalPrice: sumSubtotal._sum.subtotal ?? 0 },
            });
        });

        return res.status(200).send({
            message: "Data succesfully deleted",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

// refactor product & user/category yang punya relations satu sama lain
// lalu jika sudah selesai setup route nya dan segera testing API nya
