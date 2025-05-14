import { RequestHandler, Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import ApiError from '../error/ApiError.js';

const authMiddleware: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return next(ApiError.unauthorized());
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (typeof decoded !== 'object' || decoded === null) return next(ApiError.unauthorized());
        req.user = decoded;
        return next();
    } catch (error) {
        console.log(error);
        return next(ApiError.unauthorized());
    }

};

export default authMiddleware;