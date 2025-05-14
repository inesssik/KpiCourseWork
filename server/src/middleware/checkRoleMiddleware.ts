import { NextFunction, RequestHandler, Request, Response } from "express";
import ApiError from "../error/ApiError.js";

const checkRoleMiddleware = (role: string): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.user?.role === role) {
            return next();
        } else {
            return next(ApiError.forbidden());
        }
    };
};

export default checkRoleMiddleware;