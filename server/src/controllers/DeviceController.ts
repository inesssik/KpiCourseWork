import { NextFunction, Request, Response } from "express";
import { v4 } from "uuid";
import path from "path";
import fileUpload from "express-fileupload";
import { Device, DeviceInfo } from "../models/models.js";
import ApiError from "../error/ApiError.js";

const __dirname = import.meta.dirname;

class DeviceController {
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { name, price, brandId, typeId, info } = req.body;
            const img = req.files.img as fileUpload.UploadedFile;
            const fileName = v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            if (info) {
                const parsedInfo = JSON.parse(info);
                parsedInfo.forEach((i: any) => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: i.deviceId
                    });
                });
            }

            const device = await Device.create({ name, price, brandId, typeId, info, img: fileName });
            res.json(device);
        } catch (error) {
            console.log(error);
            return next(ApiError.badRequest(error.message));
        }
    }

    async getAll(req: Request, res: Response) {
        const { brandId, typeId } = req.query;
        const page = Number(req.query.page ?? 1);
        const limit = Number(req.query.limit ?? 9);
        const offset = page * limit - limit;

        const filterWhere: any = {};

        if (brandId) {
            filterWhere.brandId = brandId;
        }

        if (typeId) {
            filterWhere.typeId = typeId;
        }

        const devices = await Device.findAndCountAll({ where: filterWhere, limit, offset });
        res.json(devices);
    }

    async getOne(req: Request, res: Response) {
        const { id } = req.params;
        const device = await Device.findOne({ where: { id }, include: [{ model: DeviceInfo, as: 'info' }] });
        res.json(device);
    }
}

export default new DeviceController();