import { NextFunction, Request, Response } from "express";
import ApiError from "../error/ApiError.js";
import { Brand, Device, DeviceInfo } from "../models/models.js";

class BrandController {
    async create(req: Request, res: Response, next: NextFunction) {
        const { name } = req.body;
        if (!name) return next(ApiError.badRequest('Введіть ім`я!'));
        if (await Brand.findOne({ where: { name: String(name) } })) return next(ApiError.badRequest('Бренд вже існує!'));
        const brand = await Brand.create({ name: String(name) });
        res.json(brand);
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        const { id } = req.query;
        if (!id) return next(ApiError.badRequest('Введіть id!'));
        const brandDevices = await Device.findAll({ where: { brandId: String(id) } });

        for (const device of brandDevices) {
            await DeviceInfo.destroy({ where: { deviceId: device.id } });
            await device.destroy();
        }

        await Brand.destroy({ where: { id: String(id) } });
        res.status(200).json({ message: "Видалено!" });
    }

    async getAll(req: Request, res: Response) {
        const brands = await Brand.findAll();
        res.json(brands);
    }
}

export default new BrandController();