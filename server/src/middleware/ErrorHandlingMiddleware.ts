import { Request, Response, ErrorRequestHandler, NextFunction } from "express";
import ApiError from "../error/ApiError.js";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler: ErrorRequestHandler = (  err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ message: err.message });
        return;
    }

    console.log(err);
    res.status(500).json({ message: 'Непередбачена помилка!' });
    return;
};

export default errorHandler;