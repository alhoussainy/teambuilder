import { Request, Response } from 'express';
import { ApiController } from '../api/controller';
import { Company } from '../../models/Company';
import { User } from '../../models/User';
import config from '../../../common/config';
import * as bcrypt from 'bcryptjs';
import { Poll } from '../../models/Poll';
import { PollAnswer } from '../../models/PollAnswer';
import { CompanySubscription } from '../../models/CompanySubscription';
import moment from 'moment';
import { Like } from '../../models/Like';
import { Comment } from '../../models/Comment';
import { Club } from '../../models/Club';
import { Post } from '../../models/Post';
import { Lunchroulette } from '../../models/Lunchroulette';
import ClubMember from '../../models/ClubMember';


export class Controller extends ApiController {


    async update(req: Request, res: Response): Promise<void> {
        try {

            const companySouscription = await CompanySubscription.update({ active: req.body.active }, {
                where: {
                    company_id: req.params.id
                }
            }

            );

            super.found(req, res, { companySouscription });
        } catch (e) {
            super.error(req, res, 'could not find any company', e);
        }
    }



}
export default new Controller()