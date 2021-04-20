import { Request, Response } from 'express';
import sequelize from '../../../sequelize';
import { User } from '../../models/User';
import * as jwt from 'jsonwebtoken';
import '../../../common/env';
import * as bcrypt from 'bcryptjs';
import config from '../../../common/config';
import { transformAndValidate } from 'class-transformer-validator';
import logger from '../../../common/logger';
import { PersonalityQuizzUserAnswers } from '../../models/PersonalityQuizzUserAnswers';
import { PersonalityQuizzQuestions } from '../../models/PersonalityQuizzQuestions';
import { Sequelize, fn, Op } from 'sequelize';
import { Personality } from '../../models/Personality';
import { PersonalityCaracteristics } from '../../models/PersonalityCaracteristics';
import { PersonalityEnvironmentAssoc } from '../../models/PersonalityEnvironmentAssoc';
import { PersonalityCaracteristicAssoc } from '../../models/PersonalityCaracteristicAssoc';
import { PersonalityIdealpositionAssoc } from '../../models/PersonalityIdealpositionAssoc';
import { PersonalityType } from '../../models/PersonalityType';
import { PersonalityQualityAssoc } from '../../models/PersonalityQualityAssoc';
import { PersonalityEnvironment } from '../../models/PersonalityEnvironment';
import { PersonalityIdealPosition } from '../../models/PersonalityIdealPosition';
import { PersonalityQuality } from '../../models/PersonalityQuality';

class TBRService {
    // Define personallity based on user answers
    async calculateTBR(company_id, user_id): Promise<any> {
        // get all answers from user
        const letters = await PersonalityQuizzUserAnswers.findAll({
            where: { company_id: company_id, user_id: user_id },
            group: ['letter'],
            attributes: ['letter', [fn('COUNT', 'letter'), 'letterCount']],
        });
        let personalityJson = JSON.parse(JSON.stringify(letters));

        let TBRpersonality = '';
        let personalityTypesLetters = {
            // Will store each letter number of occurence.
            tbr1_E: 0,
            tbr1_I: 0,
            tbr2_S: 0,
            tbr2_N: 0,
            tbr3_T: 0,
            tbr3_F: 0,
            tbr4_P: 0,
            tbr4_J: 0,
        };

        // Proceed for each letter and by type
        for (const letter of personalityJson) {
            let occurences = letter.letterCount;
            switch (letter.letter) {
                case 'E':
                    personalityTypesLetters.tbr1_E = occurences;
                    break;

                case 'I':
                    personalityTypesLetters.tbr1_I = occurences;
                    break;

                case 'S':
                    personalityTypesLetters.tbr2_S = occurences;
                    break;

                case 'N':
                    personalityTypesLetters.tbr2_N = occurences;
                    break;

                case 'T':
                    personalityTypesLetters.tbr3_T = occurences;
                    break;

                case 'F':
                    personalityTypesLetters.tbr3_F = occurences;
                    break;

                case 'P':
                    personalityTypesLetters.tbr4_P = occurences;
                    break;

                case 'J':
                    personalityTypesLetters.tbr4_J = occurences;
                    break;
            }
        }

        // Procced to select the letter with the most occurences for each type
        TBRpersonality +=
            personalityTypesLetters.tbr1_E > personalityTypesLetters.tbr1_I
                ? 'E'
                : 'I';
        TBRpersonality +=
            personalityTypesLetters.tbr2_S > personalityTypesLetters.tbr2_N
                ? 'S'
                : 'N';
        TBRpersonality +=
            personalityTypesLetters.tbr3_T > personalityTypesLetters.tbr3_F
                ? 'T'
                : 'F';
        TBRpersonality +=
            personalityTypesLetters.tbr4_P > personalityTypesLetters.tbr4_J
                ? 'P'
                : 'J';

        // Update user personnality.
        const user = await User.findOne({
            where: { company_id: company_id, id: user_id },
        });
        user.tbr_personality = TBRpersonality;
        user.save();

        return TBRpersonality;
    }

    // Get personality from UserID
    async getUserPersonality(res, user_id) {
        const user = await User.findOne({
            where: { company_id: res.locals.company_id, id: user_id },
        });

        const personality = await Personality.findOne({
            where: { id: user.tbr_personality },
            attributes: {
                exclude: ['id'],
            },
            include: [
                {
                    model: PersonalityEnvironmentAssoc,
                    as: 'TBREnvironments',
                    attributes: {
                        exclude: ['personality_id'],
                    },
                    include: [
                        {
                            model: PersonalityEnvironment,
                            attributes: {
                                exclude: ['id'],
                            },
                        },
                    ],
                },
                {
                    model: PersonalityIdealpositionAssoc,
                    as: 'TBRPositions',
                    attributes: {
                        exclude: ['personality_id'],
                    },
                    include: [PersonalityIdealPosition],
                },
                {
                    model: PersonalityQualityAssoc,
                    as: 'TBRQualities',
                    attributes: {
                        exclude: ['personality_id'],
                    },
                    include: [PersonalityQuality],
                },
            ],
        });

        return personality;
    }

     // Get personality from UserID
     async getUserPersonalityCarateristics(res, user_id) {
        const user = await User.findOne({
            where: { company_id: res.locals.company_id, id: user_id },
        });

        const personality = await Personality.findOne({
            where: { id: user.tbr_personality },
            attributes: {
                exclude: ['id'],
            },
            include: [{
                model: PersonalityQualityAssoc,
                include:[{model: PersonalityQuality,  attributes: { exclude: ['personality_id'] }}],
                attributes: { exclude: ['personality_id'] }
            },
            {
                model:PersonalityType,
                include:[{
                    model:PersonalityCaracteristicAssoc,
                    include:[PersonalityCaracteristics]
                }]
            },
            {
                model: PersonalityIdealpositionAssoc,
                include:[{model: PersonalityIdealPosition}],
                as:'TBRPositions'
            },
            {
                model: PersonalityEnvironmentAssoc,
                include:[{model: PersonalityEnvironment}],
                as:'TBREnvironments'
            }]
        });

        return personality;
    }

    // Get personality details

    // Get question letter for true or false
    async getQuestionAnswerLetter(questionId, answer) {
        const question = await PersonalityQuizzQuestions.findOne({
            where: { id: questionId },
        });

        switch (
            answer // If user answered yes to this question, return the corresponding letter, same if answered false
        ) {
            case true:
                return question.true_letter;

            case false:
                return question.false_letter;
        }
    }

    // Save answers sent by user
    async storeAnswers(answers, res): Promise<void> {
        for (let i = 0; i < answers.length; i++) {
            // Loop over all answers
            const answerItem = PersonalityQuizzUserAnswers.build(); // Prepare insert statement
            const answer = answers[i]; // == [questionid, answerboolean]
            answerItem.company_id = res.locals.company_id;
            answerItem.user_id = res.locals.user_id;
            answerItem.question_id = answer[0];
            answerItem.answer = answer[1];
            answerItem.letter = await this.getQuestionAnswerLetter(
                answer[0],
                answer[1]
            );
            answerItem.save();
        }

        this.calculateTBR(res.locals.company_id, res.locals.user_id);
    }

    // Save answers sent by user during first registration
    async storeAnswersRegister(user_id, company_id, answers): Promise<void> {
        for (let i = 0; i < answers.length; i++) {
            // Loop over all answers
            const answerItem = PersonalityQuizzUserAnswers.build(); // Prepare insert statement
            const answer = answers[i]; // == [questionid, answerboolean]
            answerItem.company_id = company_id;
            answerItem.user_id = user_id;
            answerItem.question_id = answer[0];
            answerItem.answer = answer[1];
            answerItem.letter = await this.getQuestionAnswerLetter(
                answer[0],
                answer[1]
            );
            answerItem.save();
        }

        this.calculateTBR(company_id, user_id);
    }

    // Get quizz questions and returns same amount of letters for each personality type. limit needs to be a multiple of 4.
    // Should no send the same question twice to same user.

    async getRandomQuestions(res, limit: number, isWeb: boolean) {
        let cache = {};
        let answeredQuestionsId = null;
        let returnedQuestions = [];
        let whereCondition = null;
        if (!isWeb) {
            // If not web, we're only sending non-answered questions
            answeredQuestionsId = await this.getAnsweredQuestion(res);
            whereCondition = { id: { [Op.notIn]: answeredQuestionsId } };
        }

        const questions = await PersonalityQuizzQuestions.findAll({
            where: whereCondition,
        });

        let l = null; // l will merged true_letter and false_letter which will be stored in cache to ensure same amount of question per profile type.
        let lr = null;
        questions.forEach(question => {
            l = question.true_letter + question.false_letter; // Letter combination
            lr = question.false_letter + question.true_letter; // Can be PJ or JP

            if (cache[l] === undefined && cache[lr] === undefined) {
                let normalizedQuestion = {
                    id: question.id,
                    question: question.question,
                };
                returnedQuestions.push(normalizedQuestion);
                cache[l] = true; // Those two letters have been processed
                cache[lr] = true; // Those two letters have been processed

                if (returnedQuestions.length == limit) {
                    // Stop loop and returned questions if requested length is met.
                    return returnedQuestions;
                }
                if (this.objectSize(cache) == 8) {
                    // Reset cache once 4 questions of each type processed.
                    cache = {};
                }
            }
        });

        return returnedQuestions;
    }

    // Get 4 questions for register

    async getRegisterQuestions() {
        let returnedQuestions = [];
        let registerQuestions = [95, 129, 35, 3];
        const questions = await PersonalityQuizzQuestions.findAll({
            where: { id: { [Op.in]: registerQuestions } },
        });
        return questions;
    }

    // Get already answered questions of user

    async getAnsweredQuestion(res) {
        let answeredQuestionIDs = [];
        const answers = await PersonalityQuizzUserAnswers.findAll({
            where: {
                company_id: res.locals.company_id,
                user_id: res.locals.user_id,
            },
        });

        answers.forEach(answer => {
            answeredQuestionIDs.push(answer.question_id);
        });

        return answeredQuestionIDs;
    }

    // Utils

    objectSize(obj) {
        var size = 0,
            key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    }
}

export default TBRService;
