import express from 'express';
import controller from './controller';
export default express
    .Router()
    .get('/list', controller.compnayList)
    .get('/:id/show', controller.show)
    .get('/:id/details', controller.details)
    .get('/test', controller.test)
