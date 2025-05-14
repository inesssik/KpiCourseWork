import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.js";
import { Brand } from "../models/models.js";

class BrandController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        if (!name) return next(ApiError.badRequest('Введіть ім`я!'));
        if (await Brand.findOne({ where: { name: String(name) } })) return next(ApiError.badRequest('Бренд вже існує!'));
        const brand = await Brand.create({ name: String(name) });
        res.json(brand);
    }

    async getAll(req: Request, res: Response) {
        const brands = await Brand.findAll();
        res.json(brands);
    }
}

export default new BrandController();