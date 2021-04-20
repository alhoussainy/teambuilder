import { Request, Response } from 'express';
import { ApiController } from '../api/controller';
import { Company } from '../../models/Company';
import { UserMessages } from '../../models/UserMessages';
import { CompanyPersonalityTest } from '../../models/CompanyPersonalityTest';
import { User } from '../../models/User';
import config from '../../../common/config';
import * as bcrypt from 'bcryptjs';
import { Post } from "../../models/Post";
import { Comment } from '../../models/Comment';
import { Like } from '../../models/Like';
import { Club } from '../../models/Club';
import { Poll } from '../../models/Poll';
import moment from 'moment';
import sequelize from '../../../sequelize';
import { PRH_UserInterview } from '../../models/PRH_UserInterview';


export class Controller extends ApiController {
    async stats(req: Request, res: Response): Promise<void> {
        try {

            let InputChart = {
                companySeries: [],
                companyLabel: [],
                clubSeries: [],
                clubLabel: [],
                pollSeries: [],
                pollLabel: [],
                userSeries: [],
                userLabel: [],
                postSerie: [],
                postLabel: [],
                totalTestPersonalitySerie: [],
                totalTestPersonalityLabel: [],
                interviewSerie: [],
                interviewLabel: [],
                messagesLabel: [],
                messagesSeries: []
            }

            /************************* graph comapny ************************/

            let totalInteriew = 0;
            const Interviews = await PRH_UserInterview.findAll({
                order: [['created_at', 'ASC']]
            });

            const inserviewWeeksTotal = {};
            for (let interview of Interviews) {
                ++totalInteriew
                let week = 'S' + moment(interview.created_at).weeks()
                inserviewWeeksTotal[week] = totalInteriew;
            }
            Object.keys(inserviewWeeksTotal).forEach(week => {
                InputChart.interviewLabel.push(week);
                InputChart.interviewSerie.push(inserviewWeeksTotal[week]);
            })


            /************************* graph publications ************************/

            let totalTestPersonality = 0;

            const testPersonalities = await CompanyPersonalityTest.findAll({
                order: [['created_at', 'ASC']]
            })
            let totalWeektestPersonalities = {}
            for (let testPersonality of testPersonalities) {
                ++totalTestPersonality;
                let week = 'S' + moment(testPersonality.created_at).weeks();
                totalWeektestPersonalities[week] = totalTestPersonality;
            }

            Object.keys(totalWeektestPersonalities).forEach(week => {
                InputChart.totalTestPersonalityLabel.push(week);
                InputChart.totalTestPersonalitySerie.push(totalWeektestPersonalities[week])
            })


            /************************* graph publications ************************/

            let totalPosts = 0;
            const posts = await Post.findAll({
                order: [['created_at', 'ASC']]
            })

            let postWeektotal = {}
            for (let post of posts) {
                ++totalPosts
                let week = 'S' + moment(post.created_at).weeks();
                postWeektotal[week] = totalPosts;
            }
            Object.keys(postWeektotal).forEach(week => {
                InputChart.postLabel.push(week);
                InputChart.postSerie.push(postWeektotal[week]);
            })


            /************************* graph users ************************/

            let totalusers = 0;
            const users = await User.findAll({
                order: [['created_at', 'ASC']]
            })

            let userWeektotal = {}

            for (let user of users) {
                ++totalusers;
                let week = 'S' + moment(user.created_at).weeks();
                userWeektotal[week] = totalusers;
            }

            Object.keys(userWeektotal).forEach(week => {
                InputChart.userLabel.push(week);
                InputChart.userSeries.push(userWeektotal[week])
            })


            /************************* graph messages ************************/


            let totalMessages = 0;
            const messages = await UserMessages.findAll()

            let messagesWeeksToatal = {};

            for (let message of messages) {
                ++totalMessages;
                let week = 'S' + moment(message.createdAt).weeks();
                messagesWeeksToatal[week] = totalMessages;
            }

            Object.keys(messagesWeeksToatal).forEach(week => {
                InputChart.messagesLabel.push(week)
                InputChart.messagesSeries.push(messagesWeeksToatal[week])
            })


            /************************* graph comapny ************************/

            let totalCompany = 0;
            const allCompnay = await Company.findAll({
                order: [['created_at', 'ASC']]
            });

            const companyWeeksTotal = {};
            for (let company of allCompnay) {
                ++totalCompany
                let week = 'S' + moment(company.created_at).weeks()
                companyWeeksTotal[week] = totalCompany;
            }
            Object.keys(companyWeeksTotal).forEach(week => {
                InputChart.companyLabel.push(week);
                InputChart.companySeries.push(companyWeeksTotal[week]);
            })


            /************************* graph club ************************/
            let totalClub = 0;
            const allClubs = await Club.findAll({
                order: [['createdAt', 'ASC']]
            });
            const clubWeeksTotal = {}

            for (let club of allClubs) {
                ++totalClub
                let week = 'S' + moment(club.createdAt).weeks()
                clubWeeksTotal[week] = totalClub
            }
            Object.keys(clubWeeksTotal).forEach(week => {
                InputChart.clubLabel.push(week);
                InputChart.clubSeries.push(clubWeeksTotal[week]);
            })

            /************************* graph sondage ************************/

            let totalPoll = 0;
            const allPolls = await Poll.findAll({
                order: [['created_at', 'ASC']]
            });

            let pollWeeksTotal = {}
            for (let poll of allPolls) {
                ++totalPoll
                let week = 'S' + moment(poll.created_at).weeks()
                pollWeeksTotal[week] = totalPoll
            }

            Object.keys(pollWeeksTotal).forEach((week) => {
                InputChart.pollLabel.push(week);
                InputChart.pollSeries.push(pollWeeksTotal[week]);
            })

            super.found(req, res, InputChart);
        } catch (e) {
            super.error(req, res, 'could not find any company', e);
        }
    }



}
export default new Controller();
