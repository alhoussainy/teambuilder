import express from 'express';
import controller from './controller';
export default express
    .Router()
    .get('/test', controller.test)
    .post('/details', controller.testDetails)
    .post('/question', controller.questionDetails)
    .post('/personality', controller.persoDetails)