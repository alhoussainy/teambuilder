import { Request, Response } from 'express';
import { ApiController } from '../api/controller';
import { BlogArticle } from '../../models/BlogArticle';



export class Controller extends ApiController {


    async showAll(req: Request, res: Response): Promise<void> {
        try {
            const articles = await BlogArticle.findAll();
            super.found(req, res, articles);
        } catch (e) {
            super.error(req, res, 'could not find articles', e);
        }
    }


    async findByCategory(req: Request, res: Response): Promise<void> {
        try {
            const articles = await BlogArticle.findAll({
                where: { category: req.query.category }
            });
            super.found(req, res, articles);
        } catch (e) {
            super.error(req, res, 'could not find articles', e);
        }
    }


    async showOne(req: Request, res: Response): Promise<void> {
        try {
            const article = await BlogArticle.findByPk(req.params.id);
            super.found(req, res, article);
        } catch (e) {
            super.error(req, res, 'could not find article', e);
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            let slug = req.body.title.split(' ').join('-').toLowerCase();
            const article = await BlogArticle.create({
                title: req.body.title,
                content: req.body.content,
                category: req.body.category,
                slug: slug,
                published: req.body.published,
                image_url: req.body.image_url,
            });
            await article.save()
            super.found(req, res, article);
        } catch (e) {
            super.error(req, res, ' article not created', e);
        }


    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const article = await BlogArticle.update(req.body, {
                where: { id: req.params.id }
            });
            super.found(req, res, article);
        } catch (e) {
            super.error(req, res, ' article not updated', e);
        }
    }


    async delete(req: Request, res: Response): Promise<void> {
        try {
            const article = await BlogArticle.destroy({
                where: { id: req.params.id }
            });
            super.found(req, res, article);
        } catch (e) {
            super.error(req, res, ' article not deleted', e);
        }
    }


}
export default new Controller();
