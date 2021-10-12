import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import '../../common/env';
import config from '../../common/config';
import logger from '../../common/logger';

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.get('Authorization');
    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token, config.session_secret);

        if (jwtPayload.param.email !== process.env.AUTH_EMAIL) {
            res.status(401).send();
            return;
        }
        if (jwtPayload.param.password !== process.env.AUTH_PASSWORD) {
            res.status(401).send();
            return;
        }
    } catch (e) {
        res.status(401).send();
        return
    }
    // const { userId, username } = jwtPayload;
    const { email, password } = jwtPayload;
    const newToken = jwt.sign({ email, password }, config.session_secret, {
        expiresIn: '1h',
    });

    res.setHeader('token', newToken);
    next();
}

/* TODO find a clean way to implement it if needed */
export const currentUser = (req: IRequestUserId, res: Response, next: NextFunction) => {
    const token = <string>req.get('Authorization');

    let jwtPayload;
    try {
        jwtPayload = <any>jwt.verify(token, config.session_secret);
        req.body.email = jwtPayload.email;
    } catch (error) {
        logger.error({ error: error, jwt: token }, "could not find user based on jwt")
        res.status(401).send();
        return;
    }
    next();
}

export interface IRequestUserId extends Request {
    userId?: string
}
