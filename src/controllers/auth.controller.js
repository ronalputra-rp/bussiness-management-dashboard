import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "All field must be registered",
            });
        }
        const { name, email, password } = req.body;
        if (!name || typeof name !== "string") {
            return res.status(400).send({
                message: "Name must be registered",
            });
        }
        if (!email || typeof email !== "string") {
            return res.status(400).send({
                message: "Email must be registered",
            });
        }
        if (!password || typeof password !== "string") {
            return res.status(400).send({
                message: "Password must be registered",
            });
        }
        const checkUser = await prisma.user.findUnique({
            where: { email: email },
        });
        if (checkUser) {
            return res.status(409).send({
                message: "Email sudah pernah didaftarkan",
            });
        }
        const hashPassword = await bcrypt.hash(password, 12);
        const addUser = await prisma.user.create({
            data: { name: name, email: email, password: hashPassword },
        });
        return res.status(201).send({
            message: "Register akun telah berhasil",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};

export const login = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "All field must be registered",
            });
        }
        const { email, password } = req.body;
        if (!email || typeof email !== "string") {
            return res.status(400).send({
                message: "Email must be registered",
            });
        }
        if (!password || typeof password !== "string") {
            return res.status(400).send({
                message: "Password must be registered",
            });
        }
        const findUser = await prisma.user.findUnique({
            where: { email: email },
        });
        if (findUser === null) {
            return res.status(401).send({
                message: "Email yang anda masukkan salah",
            });
        }
        const checkPassword = await bcrypt.compare(password, findUser.password);
        if (!checkPassword) {
            return res.status(401).send({
                message: "Password yang anda masukkan salah",
            });
        }
        const key = process.env.JWT_SECRET;
        const payload = {
            id: findUser.id,
            name: findUser.name,
            email: findUser.email,
        };
        const token = jwt.sign(payload, key, { expiresIn: "5h" });
        return res.status(200).send({
            message: "Login berhasil",
            token: token,
        });
    } catch (err) {
        return res.status(500).send({
            message: "Internal server error",
        });
    }
};
