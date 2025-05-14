import { Request, Response, ErrorRequestHandler } from "express";
import ApiError from "../error/ApiError.js";

const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response) => {
    if (err instanceof ApiError) {
        res.status(err.status).json({ message: err.message });
        return;
    }

    console.log(err);
    res.status(500).json({ message: 'Непередбачена помилка!' });
    return;
};

export default errorHandler;