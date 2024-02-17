import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const handleZodErrors = (err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err instanceof ZodError) {
        const formattedErrors = err.errors.map((error) => {
            return {
                code: error.code,
                message: error.message,
                path: error.path,
            };
        });

        res.status(400).json({
            success: false,
            message: 'Erro de validação',
            errors: formattedErrors,
        });


    } else {
        next(err);
    };

};