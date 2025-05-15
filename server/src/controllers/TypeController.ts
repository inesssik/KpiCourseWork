import { Device, DeviceInfo, Type } from '../models/models.js';
import ApiError from '../error/ApiError.js';
import { NextFunction, Request, Response } from "express";

class TypeController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        if (!name) return next(ApiError.badRequest('Введіть ім`я!'));
        if (await Type.findOne({ where: { name: String(name) } })) return next(ApiError.badRequest('Тип вже існує!'));
        const type = await Type.create({ name: String(name) });
        res.json(type);
    }

    async getAll(req: Request, res: Response) {
        const types = await Type.findAll();
        res.json(types);
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        if (!id) return next(ApiError.badRequest('Введіть id!'));
        const typeDevices = await Device.findAll({ where: { typeId: String(id) } });

        for (const device of typeDevices) {
            await DeviceInfo.destroy({ where: { deviceId: device.id } });
            await device.destroy();
        }

        await Type.destroy({ where: { id: String(id) } });
        res.status(200).json({ message: "Видалено!" });
    }
}

export default new TypeController();