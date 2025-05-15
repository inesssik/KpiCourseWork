import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from "../models/models.js";

const generateJwt = (id: number, email: string, role: string) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, { expiresIn: '24h' });
};

class UserController {
    async registration(req: Request, res: Response, next: NextFunction) {
        const { email, password, role } = req.body;
        if (!email || !password) return next(ApiError.badRequest('Невірний email или password'));

        const candidate = await User.findOne({ where: { email } });
        if (candidate) return next(ApiError.badRequest('Користувач з таким email вже існує'));

        const hashPassword = await bcrypt.hash(String(password), 5);
        const user = await User.create({ email, role, password: hashPassword });
        const token = generateJwt(user.id, user.email, user.role);
        res.json({ token });
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        const user = await User.findOne(email);
        if (!user) return next(ApiError.internal('Користувач з таким email вже існує'));

        const validate = await bcrypt.compare(String(password), user.password);
        if (!validate) return next(ApiError.internal('Невірний пароль'));
        const token = generateJwt(user.id, user.email, user.role);
        res.json({ token });
    }

    async check(req: Request, res: Response) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role);
        res.json({ token });
    }
}

export default new UserController();