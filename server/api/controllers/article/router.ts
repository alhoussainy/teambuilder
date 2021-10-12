import express from 'express';
import controller from './controller';
export default express
    .Router()
    .get('/list', controller.showAll)
    .get('/category?', controller.findByCategory)
    .get('/:id/:slug?', controller.showOne)
    .post('/create', controller.create)
    .put('/:id/update', controller.update)
    .delete('/:id/delete', controller.delete)
    .post('/upload', controller.imageUpload)
