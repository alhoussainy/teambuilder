import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import '../../common/env';
import config from '../../common/config';

export const pagination = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers['auth'];

    res.locals.offset = 0;
    res.locals.limit = 30;

    next();
};
