import prisma from "../config/prisma.js";

export const getCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        const getAllCategory = await prisma.category.findMany({
            where: { userId: userId },
            select: {
                id: true,
                category: true,
            },
        });
        return res.status(200).send({
            message: "Category has been sent",
            data: getAllCategory,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const addCategory = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(401).send({
                message: "There is no data sent",
            });
        }
        const { category } = req.body;
        const userId = req.user.id;
        if (typeof category !== "string") {
            return res.status(400).send({
                message: "Invalid type of category",
            });
        }
        await prisma.category.create({
            data: { category, userId },
        });
        return res.status(201).send({
            message: "New category succesfully added",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const editCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        const params = Number(req.params.id);
        if (Number.isNaN(params)) {
            return res.status(401).send({
                message: "Invalid parameters",
            });
        }
        if (!req.body) {
            return res.status(401).send({
                message: "There is no data sent",
            });
        }
        const categoryExist = await prisma.category.findFirst({
            where: { id: params, userId: userId },
        });
        if (!categoryExist) {
            return res.status(404).send({
                message: "Data category not found",
            });
        }
        const { category } = req.body;
        if (typeof category !== "string") {
            return res.status(400).send({
                messsage: "Invalid type of category",
            });
        }
        const existingCategory = await prisma.category.findFirst({
            where: { category: category },
        });
        if (existingCategory) {
            return res.status(400).send({
                message: "Category already added, cannot duplicate same category",
            });
        }
        await prisma.category.update({
            where: { id: params },
            data: { category },
        });
        return res.status(200).send({
            message: "Category succesfully updated",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        const params = Number(req.params.id);
        if (Number.isNaN(params)) {
            return res.status(401).send({
                message: "Invalid paramaters",
            });
        }
        const checkingCategoryById = await prisma.category.findFirst({
            where: { id: params, userId:userId },
        });
        if (!checkingCategoryById) {
            return res.status(404).send({
                message: "Data category not found",
            });
        }
        const isCategoryUsed = await prisma.products.findFirst({
            where: { categoryId: params },
        });
        if (isCategoryUsed) {
            return res.status(400).send({
                message: "Category is currently used in other products, cannot delete the category",
            });
        }

        await prisma.category.delete({
            where: { id: params, userId: userId },
        });
        return res.status(200).send({
            message: `Category ${params} succesfully deleted`,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};
