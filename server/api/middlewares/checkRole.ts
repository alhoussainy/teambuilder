import { Request, Response, NextFunction } from 'express';
import sequelize from '../../sequelize';

import { User } from '../models/User';

export const checkRole = (roles: Array<string>) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        next();

        // const id = res.locals.jwtPayload.userId;
        //
        // const userRepository = sequelize.getRepository(User);
        // let user: User;
        //
        // try {
        //     user = await userRepository.findOne(id);
        // } catch (id) {
        //     res.status(401).send();
        // }
        //
        // roles.indexOf(user.role) > -1 ? next() : res.status(401).send;
    };
};
