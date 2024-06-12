import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    return res.status(500).json({ message: 'Internal Server Error', error: err.message });
};