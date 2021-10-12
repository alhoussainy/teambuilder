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
import { Personality } from '../../models/Personality';
import { PersonalityQualityAssoc } from '../../models/PersonalityQualityAssoc';
import { PublicTest } from '../../models/PublicTest';
import { PublicTestAnswer } from '../../models/PublicTestAnswer';
import { PublicTestTrimojiFeedback } from '../../models/PublicTestTrimojiFeedback';
import { PublicTestQualityFeedback } from '../../models/PublicTestQualityFeedback';
import { PublicTestReferal } from '../../models/PublicTestReferal';
import { type } from 'os';
import { Sequelize, fn, Op, where } from 'sequelize';
import { PersonalityQuizzQuestions } from '../../models/PersonalityQuizzQuestions';
import { PersonalityQuality } from '../../models/PersonalityQuality';
import model from 'sequelize/types/lib/model';
import { PublicTestEmails } from '../../models/PublicTestEmails';



export class Controller extends ApiController {


    async test(req: Request, res: Response): Promise<void> {
        try {

            /******************************** graphe total test effectue  *   *********************** */
            const emails = await PublicTestEmails.findAll()
            const TestPublic = []
            const testCourt = await PublicTest.findAll({
                where: { type: 0 }
            })
            const testLong = await PublicTest.findAll({
                where: { type: 1 }
            })


            TestPublic.push(testCourt.length)
            TestPublic.push(testLong.length)

            const labels = ["Tests (1 min)", " Tests (15 min)"]


            /*** **************************************  graphe analyse de personality pour le test long    *     ************************ */
            const statsfeedback = await PublicTestQualityFeedback.findAll({
                attributes: ['value', 'isGlobal'],
                where: { isGlobal: true },
                include: [{ model: PublicTest, where: { type: 1 } }]
            })
            let feedbacks = [];
            for (let stat of statsfeedback) {
                feedbacks.push(stat.value)
            }
            let nbPersotestLong = feedbacks.length
            let countsFeedback = {}
            for (let i = 0; i < feedbacks.length; i++) {
                let num = feedbacks[i];
                countsFeedback[num] = countsFeedback[num] ? countsFeedback[num] + 1 : 1;
            }

            let GlobalvaluesFeedBackTestLong = [];
            Object.keys(countsFeedback).forEach(globalValue => {

                let pourcentage = (countsFeedback[globalValue] / statsfeedback.length) * 100;

                GlobalvaluesFeedBackTestLong.push(pourcentage.toFixed(2))
            })


            /********************************************* graphe analyse de personality pour le test court      *   * **************************** */


            const statsfeedbackTestCourt = await PublicTestQualityFeedback.findAll({
                attributes: ['value', 'isGlobal'],
                where: { isGlobal: true },
                include: [{ model: PublicTest, where: { type: 0 } }]
            })
            let feedbacksTestCourt = [];
            for (let stat of statsfeedbackTestCourt) {
                feedbacksTestCourt.push(stat.value)
            }
            let nbPersoTestcourt = feedbacksTestCourt.length
            let countsFeedbackTestCourt = {}
            for (let i = 0; i < feedbacksTestCourt.length; i++) {
                let num = feedbacksTestCourt[i];
                countsFeedbackTestCourt[num] = countsFeedbackTestCourt[num] ? countsFeedbackTestCourt[num] + 1 : 1;
            }
            let GlobalvaluesFeedBackTestCourt = [];
            Object.keys(countsFeedbackTestCourt).forEach(globalValue => {

                let pourcentage = (countsFeedbackTestCourt[globalValue] / statsfeedbackTestCourt.length) * 100;

                GlobalvaluesFeedBackTestCourt.push(pourcentage.toFixed(2))
            })


            /******************************************** graphe analyse de personality pour le test global      * ***************** */
            const statsfeedbackTestGlobal = await PublicTestQualityFeedback.findAll({
                attributes: ['value', 'isGlobal'],
                where: { isGlobal: true }
            })
            let feedbacksTestGlobal = [];
            for (let stat of statsfeedbackTestGlobal) {
                feedbacksTestGlobal.push(stat.value)
            }
            let nbpersoTestGlobal = feedbacksTestGlobal.length
            let countsFeedbackTestGloabl = {}
            for (let i = 0; i < feedbacksTestGlobal.length; i++) {
                let num = feedbacksTestGlobal[i];
                countsFeedbackTestGloabl[num] = countsFeedbackTestGloabl[num] ? countsFeedbackTestGloabl[num] + 1 : 1;
            }

            let valuesFeedBackTestGlobal = [];
            Object.keys(countsFeedbackTestGloabl).forEach(globalValue => {

                let pourcentage = (countsFeedbackTestGloabl[globalValue] / statsfeedbackTestGlobal.length) * 100;

                valuesFeedBackTestGlobal.push(pourcentage.toFixed(2))
            })




            /*** **************************************  graphe  trimoji pour le test court   *    ************************* */
            const statsTrimojiTestCourt = await PublicTestTrimojiFeedback.findAll({
                include: [{ model: PublicTest, where: { type: 0 } }]
            });

            let trimojiesTestCourt = [];
            for (let stat of statsTrimojiTestCourt) {
                trimojiesTestCourt.push(stat.global_value)
            }
            let nbTrimojisTestcourt = trimojiesTestCourt.length
            let countsTrimojiTestCourt = {}
            for (let i = 0; i < trimojiesTestCourt.length; i++) {
                let num = trimojiesTestCourt[i];
                countsTrimojiTestCourt[num] = countsTrimojiTestCourt[num] ? countsTrimojiTestCourt[num] + 1 : 1;
            }

            let GlobalvaluesTrimojiTestCourt = [];
            Object.keys(countsTrimojiTestCourt).forEach(globalValue => {

                let pourcentage = (countsTrimojiTestCourt[globalValue] / statsTrimojiTestCourt.length) * 100;

                GlobalvaluesTrimojiTestCourt.push(pourcentage.toFixed(2))
            })

            /*** **************************************  graphe  trimoji pour le test Long       *   *  ************************ */

            const statsTrimojiTestLong = await PublicTestTrimojiFeedback.findAll({
                include: [{ model: PublicTest, where: { type: 1 } }]
            });

            let trimojiesTestLong = [];
            for (let stat of statsTrimojiTestLong) {
                trimojiesTestLong.push(stat.global_value)
            }

            let countsTrimojiTestLong = {}
            for (let i = 0; i < trimojiesTestLong.length; i++) {
                let num = trimojiesTestLong[i];
                countsTrimojiTestLong[num] = countsTrimojiTestLong[num] ? countsTrimojiTestLong[num] + 1 : 1;
            }
            let nbTrimojistestLong = trimojiesTestLong.length;

            let GlobalvaluesTrimojiTestLong = [];
            Object.keys(countsTrimojiTestLong).forEach(globalValue => {

                let pourcentage = (countsTrimojiTestLong[globalValue] / statsTrimojiTestLong.length) * 100;

                GlobalvaluesTrimojiTestLong.push(pourcentage.toFixed(2))
            })


            /*************************************** graphe trimoji pour le test global *    * *****************************************/

            const statsTrimoji = await PublicTestTrimojiFeedback.findAll();

            let trimojies = [];
            for (let stat of statsTrimoji) {
                trimojies.push(stat.global_value)
            }
            let nbTrimojisGlobale = trimojies.length
            let countsTrimoji = {}
            for (let i = 0; i < trimojies.length; i++) {
                let num = trimojies[i];
                countsTrimoji[num] = countsTrimoji[num] ? countsTrimoji[num] + 1 : 1;
            }

            let GlobalvaluesTrimoji = [];
            Object.keys(countsTrimoji).forEach(globalValue => {
                let pourcentage = (countsTrimoji[globalValue] / statsTrimoji.length) * 100;
                GlobalvaluesTrimoji.push(pourcentage.toFixed(2))
            })

            const labelsFeedback = ["Pas d'accord",
                " ",
                "  ", " ", "d'accord"]

            super.found(req, res, {
                GlobalvaluesTrimojiTestCourt, trimojiesTestLong,
                GlobalvaluesTrimojiTestLong, TestPublic,
                labels, GlobalvaluesFeedBackTestLong,
                nbTrimojisGlobale, nbpersoTestGlobal,
                labelsFeedback, valuesFeedBackTestGlobal, countsTrimoji,
                GlobalvaluesFeedBackTestCourt, GlobalvaluesTrimoji, emails
            });
        } catch (e) {
            super.error(req, res, 'could not find any personality', e);
        }
    }

    async questionDetails(req: Request, res: Response): Promise<void> {
        try {

            let tab = [];
            let output = [];
            const test = await PublicTest.findAll({
                where: { type: req.body.type, tbr_personality: req.body.personality },
            });
            console.log(test.length);

            let allanswers = {};
            for (let t of test) {
                let data = {
                    id: t.tbr_personality,
                    testAnswers: null,
                };
                const testAnswers = await PublicTestAnswer.findAll({
                    where: { test_id: t.token },
                });
                console.log(testAnswers.length);

                for (let answer of testAnswers) {
                    const questionDatas = await PersonalityQuizzQuestions.findOne({
                        where: { id: answer.question_id }
                    })
                    output.push(questionDatas)

                    if (allanswers[answer.question_id] == undefined) {
                        allanswers[answer.question_id] = {
                            question: questionDatas.question,
                            agreed: 0,
                            disagreed: 0,
                        }
                    }

                    if (answer.answer) {
                        allanswers[answer.question_id].agreed += 1
                    } else {
                        allanswers[answer.question_id].disagreed += 1
                    }
                }
                data.testAnswers = allanswers;
                tab.push(data)
            }

            super.found(req, res, tab)
        } catch (e) {
            super.error(req, res, 'could not find any personality', e);
        }
    }

    async persoDetails(req: Request, res: Response): Promise<void> {
        try {

            let tab = [];

            const publicTests = await PublicTest.findAll({
                where: { type: req.body.type, tbr_personality: { [Op.ne]: null } }
            })
            const publicTestAmount = publicTests.length;


            const personalities = await Personality.findAll()

            for (let personality of personalities) {
                let data = {
                    id: personality.id,
                    name: personality.name_male,
                    pourcentagePop: null,
                    qualitesGlobale: {}
                };

                const currPersonalityTests = await PublicTest.findAll({
                    where: { tbr_personality: personality.id, type: req.body.type }
                })
                data.pourcentagePop = (currPersonalityTests.length / publicTestAmount * 100).toFixed(2);

                for (let curtest of currPersonalityTests) {

                    const publictest = await PublicTestQualityFeedback.findAll(
                        { where: { test_token: curtest.token } })

                    for (let q of publictest) {

                        const qualities = await PersonalityQuality.findOne({ where: { id: q.quality_id } })
                        if (qualities !== null) {

                            if (data.qualitesGlobale[q.quality_id] == undefined) {
                                data.qualitesGlobale[q.quality_id] = {
                                    name: qualities.name,
                                    value: q.value,
                                    isquality: qualities.isQuality,
                                    occurences: 1
                                }
                            } else {
                                data.qualitesGlobale[q.quality_id].value += q.value
                                data.qualitesGlobale[q.quality_id].occurences += 1
                            }
                        }
                    }
                }

                tab.push(data)
            }




            super.found(req, res, tab)
        } catch (e) {
            super.error(req, res, 'could not find any personality', e);
        }
    }



    async testDetails(req: Request, res: Response): Promise<void> {
        try {
            const testType = req.body.testType;

            let output = [];
            let data = {
                nbPartage: null,
                nbPC: null
            }

            const publicTests = await PublicTest.findAll({
                where: { type: testType, tbr_personality: { [Op.ne]: null } }
            })
            const publicTestAmount = publicTests.length;
            const personalities = await Personality.findAll();

            for (let p of publicTests) {
                const nbTestPartage = await PublicTestReferal.findAll({
                    where: { token1: p.token }
                })
                const nbProfilComplet = await PublicTestEmails.findAll({
                    where: { token: p.token }
                })

                data.nbPartage = nbTestPartage.length
                data.nbPC = nbProfilComplet.length

            }


            for (let personality of personalities) {
                const currPersonalityTests = await PublicTest.findAll({
                    where: { tbr_personality: personality.id, type: testType }
                })

                let personalityStats = {
                    id: personality.id,
                    name: personality.name_male,
                    percentPop: null,
                    percentGlobalFeedback: null,
                    percentEnvironment: null,
                    percentManagement: null,
                    percentMotivation: null,
                    type: testType
                }
                let feedbackAmount = 0;
                let agreedGlobalFeedback = 0;
                let agreedStructureFeedback = 0;
                let agreedMotivationFeedback = 0;
                let agreedIntensityFeedback = 0;

                // Calculate the population percentage of this personality
                personalityStats.percentPop = (currPersonalityTests.length / publicTestAmount * 100).toFixed(2);

                // Calculate percentage global feedback

                for (let currTest of currPersonalityTests) {

                    // Load feedback for each test
                    const trimojiFeedback = await PublicTestTrimojiFeedback.findOne({
                        where: { test_token: currTest.token }
                    })


                    // If feedback exists
                    if (trimojiFeedback !== null) {
                        feedbackAmount += 1;
                        if (trimojiFeedback.global_value == 5) {
                            agreedGlobalFeedback += 1;
                            agreedStructureFeedback += 1;
                            agreedMotivationFeedback += 1;
                            agreedIntensityFeedback += 1;
                        } else if (trimojiFeedback.global_value == 4) {
                            agreedGlobalFeedback += 0.75;
                            if (trimojiFeedback.structure_value == 5) {
                                agreedStructureFeedback += 1
                            } else if (trimojiFeedback.structure_value == 4) {
                                agreedStructureFeedback += 0.75
                            } else if (trimojiFeedback.structure_value == 3) {
                                agreedStructureFeedback += 0.5
                            } else if (trimojiFeedback.structure_value == 2) {
                                agreedStructureFeedback += 0.25
                            }

                            if (trimojiFeedback.intensity_value == 5) {
                                agreedIntensityFeedback += 1;
                            } else if (trimojiFeedback.structure_value == 4) {
                                agreedIntensityFeedback += 0.75
                            } else if (trimojiFeedback.structure_value == 3) {
                                agreedIntensityFeedback += 0.5
                            } else if (trimojiFeedback.structure_value == 2) {
                                agreedIntensityFeedback += 0.25
                            }

                            if (trimojiFeedback.motivation_value == 5) {
                                agreedMotivationFeedback += 1;
                            } else if (trimojiFeedback.structure_value == 4) {
                                agreedMotivationFeedback += 0.75
                            } else if (trimojiFeedback.structure_value == 3) {
                                agreedMotivationFeedback += 0.5
                            } else if (trimojiFeedback.structure_value == 2) {
                                agreedMotivationFeedback += 0.25
                            }

                        } else if (trimojiFeedback.global_value == 3) {
                            agreedGlobalFeedback += 0.5;
                            if (trimojiFeedback.structure_value == 5) {
                                agreedStructureFeedback += 1
                            } else if (trimojiFeedback.structure_value == 4) {
                                agreedStructureFeedback += 0.75
                            } else if (trimojiFeedback.structure_value == 3) {
                                agreedStructureFeedback += 0.5
                            } else if (trimojiFeedback.structure_value == 2) {
                                agreedStructureFeedback += 0.25
                            }

                            if (trimojiFeedback.intensity_value == 5) {
                                agreedIntensityFeedback += 1;
                            } else if (trimojiFeedback.structure_value == 4) {
                                agreedIntensityFeedback += 0.75
                            } else if (trimojiFeedback.structure_value == 3) {
                                agreedIntensityFeedback += 0.5
                            } else if (trimojiFeedback.structure_value == 2) {
                                agreedIntensityFeedback += 0.25
                            }

                            if (trimojiFeedback.motivation_value == 5) {
                                agreedMotivationFeedback += 1;
                            } else if (trimojiFeedback.structure_value == 4) {
                                agreedMotivationFeedback += 0.75
                            } else if (trimojiFeedback.structure_value == 3) {
                                agreedMotivationFeedback += 0.5
                            } else if (trimojiFeedback.structure_value == 2) {
                                agreedMotivationFeedback += 0.25
                            }

                        } else {
                            agreedGlobalFeedback += 0.25;
                            if (trimojiFeedback.structure_value == 5) {
                                agreedStructureFeedback += 1
                            } else if (trimojiFeedback.structure_value == 4) {
                                agreedStructureFeedback += 0.75
                            } else if (trimojiFeedback.structure_value == 3) {
                                agreedStructureFeedback += 0.5
                            } else if (trimojiFeedback.structure_value == 2) {
                                agreedStructureFeedback += 0.25
                            }

                            if (trimojiFeedback.intensity_value == 5) {
                                agreedIntensityFeedback += 1;
                            } else if (trimojiFeedback.structure_value == 4) {
                                agreedIntensityFeedback += 0.75
                            } else if (trimojiFeedback.structure_value == 3) {
                                agreedIntensityFeedback += 0.5
                            } else if (trimojiFeedback.structure_value == 2) {
                                agreedIntensityFeedback += 0.25
                            }

                            if (trimojiFeedback.motivation_value == 5) {
                                agreedMotivationFeedback += 1;
                            } else if (trimojiFeedback.structure_value == 4) {
                                agreedMotivationFeedback += 0.75
                            } else if (trimojiFeedback.structure_value == 3) {
                                agreedMotivationFeedback += 0.5
                            } else if (trimojiFeedback.structure_value == 2) {
                                agreedMotivationFeedback += 0.25
                            }

                        }


                    }
                }
                // Calculate percentage
                personalityStats.percentGlobalFeedback = (agreedGlobalFeedback / feedbackAmount * 100).toFixed(2);
                personalityStats.percentEnvironment = (agreedStructureFeedback / feedbackAmount * 100).toFixed(2);
                personalityStats.percentManagement = (agreedMotivationFeedback / feedbackAmount * 100).toFixed(2);
                personalityStats.percentMotivation = (agreedIntensityFeedback / feedbackAmount * 100).toFixed(2);
                output.push(personalityStats)
            }

            super.found(req, res, { output, data })
        } catch (e) {
            super.error(req, res, 'could not find any personality', e);
        }
    }

}
export default new Controller()