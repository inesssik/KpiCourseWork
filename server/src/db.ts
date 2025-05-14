import 'dotenv/config';
import { Sequelize } from "sequelize-typescript";
import { User, Basket, BasketDevice, Device, Brand, DeviceInfo, Rating, Type, TypeBrand } from './models/models.js';

export default new Sequelize({
    dialect: "postgres",
    database: process.env.DB_NAME as unknown as string,
    host: process.env.DB_HOST as unknown as string,
    port: process.env.DB_PORT as unknown as number,
    username: process.env.DB_USER as unknown as string,
    password: process.env.DB_PASSWORD as unknown as string,
    models: [User, Basket, BasketDevice, Device, Brand, DeviceInfo, Rating, Type, TypeBrand]
});