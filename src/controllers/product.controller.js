import prisma from "../config/prisma.js";

export const getProducts = async (req, res) => {
    try {
        let where = {};
        const userId = req.user.id;
        // Setting pagination dan sort untuk tampilan products
        const { name, categoryId, minStock, maxStock, minPrice, maxPrice, sort, order, page, limit } = req.query;
        if (req.query === {}) {
            const getAllData = await prisma.products.findMany({
                where: { userId: userId },
                include: { category: true },
            });
            return res.status(200).send({
                message: "Data has been sent",
                data: getAllData,
            });
        }

        where = { userId };

        if (name) {
            where = { ...where, name };
        }
        if (categoryId) {
            const convertId = Number(categoryId);
            where = { ...where, categoryId: convertId };
        }
        if (minStock) {
            const convertStock = Number(minStock);
            where = { ...where, stock: { gte: convertStock } };
        }
        if (maxStock) {
            const convertStock = Number(maxStock);
            where = { ...where, stock: { lte: convertStock } };
        }
        if (minPrice) {
            const convertPrice = Number(minPrice);
            where = { ...where, price: { gte: convertPrice } };
        }
        if (maxPrice) {
            const convertPrice = Number(maxPrice);
            where = { ...where, price: { lte: convertPrice } };
        }
        if (sort) {
            where = { ...where, sort };
        }
        if (order) {
            where = { ...where, order };
        }
        if (page) {
            where = { ...where, page };
        }
        if (limit) {
            where = { ...where, limit };
        }

        const getFilteredData = await prisma.products.findMany({
            where,
            include: {
                category: true,
            },
        });
        return res.status(200).send({
            message: "Data has been sent",
            data: getFilteredData,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const getProductById = async (req, res) => {
    const userId = req.user.id;
    const params = Number(req.params.id);
    try {
        if (Number.isNaN(params)) {
            return res.status(401).send({
                message: "Invalid type of parameter",
            });
        }
        const getSpecificData = await prisma.products.findFirst({
            where: { id: params, userId: userId },
            include: { category: true },
        });
        if (!getSpecificData) {
            return res.status(404).send({
                message: "Data not found",
            });
        }
        return res.status(200).send({
            message: "Data has been sent",
            data: getSpecificData,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        let createData = { userId };
        if (!req.body) {
            return res.status(401).send({
                message: "There was no request sent",
            });
        }
        const { name, categoryId, description, stock, price, createdAt, updatedAt } = req.body;
        if (!name || typeof name !== "string" || name.trim() === "") {
            return res.status(400).send({
                message: "Invalid name field or name must be included",
            });
        }

        createData = { ...createData, name };

        if (typeof description === "string") {
            createData = { ...createData, description };
        }

        const validateCategoryId = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!validateCategoryId) {
            return res.status(404).send({
                message: "Category not found",
            });
        }

        createData = { ...createData, categoryId };

        if (!stock || typeof stock !== "number") {
            return res.status(400).send({
                message: "Invalid stock field or stock must be included",
            });
        }
        createData = { ...createData, stock };

        if (typeof price !== "number") {
            return res.status(400).send({
                message: "Invalid price field or price must be included",
            });
        }

        createData = { ...createData, price };

        if (createdAt && typeof createdAt === "string") {
            const parsedDate = new Date(createdAt);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).send("Invalid format of date");
            }
            createData = { ...createData, createdAt };
        }

        if (updatedAt && typeof updatedAt === "string") {
            const parsedDate = new Date(updatedAt);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).send("Invalid format of date");
            }
            createData = { ...createData, updatedAt };
        }
        const addData = await prisma.products.create({ data: createData });
        return res.status(201).send({
            message: "Data succesfully added",
            data: addData,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

// flow frontend edit datanya, mengubah field yang ingin diupdate saja,
// yang tidak diupdate datanya di keep
export const updateProduct = async (req, res) => {
    try {
        let updateData = {};
        const userId = req.user.id;
        const params = Number(req.params.id);
        if (Number.isNaN(params)) {
            return res.status(400).send({
                message: "Invalid type of parameters",
            });
        }

        const checkAvailabilityData = await prisma.products.findUnique({
            where: { id: params },
        });

        if (!checkAvailabilityData) {
            return res.status(404).send({
                message: "Data not found",
            });
        }

        if (!req.body) {
            return res.status(400).send({
                message: "There was no request sent !!",
            });
        }
        const { name, categoryId, description, stock, price, createdAt, updatedAt } = req.body;
        if (typeof name === "string") {
            updateData = { name };
        }
        const convertId = Number(categoryId);
        if (convertId && typeof convertId === "number") {
            const validateCategoryId = await prisma.category.findUnique({
                where: { id: convertId },
            });
            if (!validateCategoryId) {
                return res.status.send(404).send({
                    message: "Category not found",
                });
            }
            updateData = { ...updateData, categoryId };
        }
            
        if (typeof description === "string") {
            updateData = { ...updateData, description };
        }
        if (typeof stock === "number") {
            updateData = { ...updateData, stock };
        }
        if (typeof price === "number") {
            updateData = { ...updateData, price };
        }
        if (typeof createdAt === "string") {
            const parsedDate = new Date(createdAt);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).send("Invalid format of date");
            }
            updateData = { ...updateData, createdAt };
        }
        if (typeof updatedAt === "string") {
            const parsedDate = new Date(updatedAt);
            if (isNaN(parsedDate.getTime())) {
                return res.status(400).send("Invalid format of date");
            }
            updateData = { ...updateData, updatedAt };
        }

        const updatingData = await prisma.products.update({
            where: { id: params, userId: userId },
            data: updateData,
        });

        return res.status(200).send({
            message: "Data succesfully updated",
            data: updatingData,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const userId = req.user.id;
        const params = Number(req.params.id);
        if (Number.isNaN(params)) {
            return res.status(400).send({
                message: "Invalid type of parameters",
            });
        }
        const checkAvailabilityData = await prisma.products.findFirst({
            where: { id: params,userId:userId },
        });
        if (!checkAvailabilityData) {
            return res.status(404).send({
                message: "Data not found",
            });
        }
        const deletingData = await prisma.products.deleteMany({
            where: { id: params, userId: userId },
        });
        return res.status(200).send({
            message: `Data ${checkAvailabilityData.id} succesfully deleted`,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};
