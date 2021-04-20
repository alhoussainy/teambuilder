import { Request, Response } from 'express';
import { ApiController } from '../api/controller';
import { Company } from '../../models/Company';
import { User } from '../../models/User';
import * as jwt from 'jsonwebtoken';

const creatToken = (param) => {
    return jwt.sign({ param }, process.env.SESSION_SECRET, { expiresIn: '1h' })
}

export class Controller extends ApiController {

    /*
    *  la fonction return un user avec mot de pass et email
    */
    async login(req: Request, res: Response): Promise<void> {

        try {
            if (process.env.AUTH_EMAIL == req.body.email && process.env.AUTH_PASSWORD == req.body.password) {
                res.status(201).json(
                    {
                        email: process.env.AUTH_EMAIL,
                        token: creatToken({
                            email: process.env.AUTH_EMAIL,
                            password: process.env.AUTH_PASSWORD,
                        })
                    })
            } else {
                res.json({ msg: 'please check your login credentials' })
            }
        } catch (e) {
            super.error(req, res, 'please check your authentication parameters', e);
        }
    }

}
export default new Controller();