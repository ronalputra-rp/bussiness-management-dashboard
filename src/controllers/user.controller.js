import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const gettingUser = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                id:true,
                name: true,
                email: true,
            },
        });
        return res.status(200).send({
            message: "Profile has been sent",
            data: gettingUser,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        let data = {};
        if (!req.body) {
            return res.status(401).send({
                message: "There is no data sent",
            });
        }
        const { name, email, password } = req.body;
        if (name) {
            if (typeof name !== "string") {
                return res.status(400).send({
                    message: "Name was not sent or invalid type of name",
                });
            }
            data = { name };
        }

        if (email) {
            if (typeof email !== "string") {
                return res.status(400).send({
                    message: "Email was not sent or invalid type of email",
                });
            }
            data = { ...data, email };
        }

        if (password) {
            if (typeof password !== "string") {
                return res.status(400).send({
                    message: "Invalid type of password",
                });
            }
            const hashPassword = await bcrypt.hash(password, 12);
            data = { ...data, password: hashPassword };
        }
        const findUser = await prisma.user.update({
            where: { id: req.user.id },
            data: data,
        });
        return res.status(200).send({
            message: "Profile has been updated, please login again",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const checkingData = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!checkingData) {
            return res.status(404).send({
                message: "Users not found",
            });
        }
        await prisma.$transaction([
            prisma.detailedTransactions.deleteMany({ where: { userId: userId } }),
            prisma.transactions.deleteMany({ where: { userId: userId } }),
            prisma.products.deleteMany({ where: { userId: userId } }),
            prisma.category.deleteMany({ where: { userId: userId } }),
            prisma.user.delete({ where: { id: userId } }),
        ]);
        return res.status(200).send({
            message: "Users succesfully deleted, please login again",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};
