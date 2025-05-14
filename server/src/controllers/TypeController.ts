import { Type } from '../models/models.js';
import ApiError from '../error/ApiError.js';

import { NextFunction, Request, Response } from "express";

class TypeController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { name } = req.query;
        if (!name) return next(ApiError.badRequest('Введіть ім`я!'));
        if (await Type.findOne({ where: { name: String(name) } })) return next(ApiError.badRequest('Тип вже існує!'));
        const type = await Type.create({ name: String(name) });
        res.json(type);
    }

    async getAll(req: Request, res: Response) {
        const types = await Type.findAll();
        res.json(types);
    }
}

export default new TypeController();