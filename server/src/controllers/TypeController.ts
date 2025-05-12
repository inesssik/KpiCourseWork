import { Type } from '../models/models.js';
import ApiError from '../error/ApiError.js';

import { NextFunction, Request, Response } from "express";

class TypeController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { name } = req.query;

        if(!name) {
            return next(ApiError.badRequest('No name!'));
        }

        const type = await Type.create({ name });
        res.json(type);
    }

    async getAll(req: Request, res: Response) {

    }
}

export default new TypeController();