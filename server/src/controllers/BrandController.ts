import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.js";
import { Type } from "../models/models.js";

class BrandController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { name } = req.query;

        if (!name) {
            return next(ApiError.badRequest('No name!'));
        }

        const type = await Type.create({ name });
        res.json(type);
    }

    async getAll(req: Request, res: Response) {

    }
}

export default new BrandController();