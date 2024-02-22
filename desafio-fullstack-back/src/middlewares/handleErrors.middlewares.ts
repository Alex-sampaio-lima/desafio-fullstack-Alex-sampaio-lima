import { NextFunction, Response, Request } from "express";
import AppError from "../errors/AppError.error";
import { z } from "zod";
import { JsonWebTokenError } from "jsonwebtoken";

export const handlErrors = (err: unknown, req: Request, res: Response, next: NextFunction): Response => {
    if (err instanceof AppError) {
        throw res.status(err.status).json({ message: err.message });
    }

    if (err instanceof z.ZodError) {
        return res.status(400).json(err.flatten().fieldErrors)
    }

    if (err instanceof JsonWebTokenError) {
        return res.status(401).json({ message: err.message })
    }

    console.error(err);
    return res.status(500).json({ message: "Internal Server Error" });
};