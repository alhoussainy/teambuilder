import { Request, Response } from 'express';
import { ApiController } from '../api/controller';
import { BlogArticle } from '../../models/BlogArticle';
import aws from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new aws.S3();
let imageUrl = '';

aws.config.update({
    secretAccessKey: process.env.S3_ACCESS_SECRET,
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    region: 'eu-west-3'
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" || file.mimetype === "image/jpg") {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type, only JPEG and PNG is allowed!"), false);
    }
};

const uploadS3 = multer({
    fileFilter,
    storage: multerS3({
        acl: "public-read",
        s3,
        bucket: 'djougouya',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            let dernierImg = file.originalname
            cb(null, dernierImg);
        },
    }),
});


const singleUpload = uploadS3.single('image');
export class Controller extends ApiController {


    async showAll(req: Request, res: Response): Promise<void> {
        try {
            const articles = await BlogArticle.findAll();
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

    async imageUpload(req: any, res: Response): Promise<void> {
        try {
            await singleUpload(req, res, function (err) {
                if (err) {
                    return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
                }
                imageUrl = req.file.location;
                console.log(imageUrl);
                console.log(req.file);


                return res.json({ 'imageUrl': imageUrl });
            });
        } catch (e) {
            super.error(req, res, 'could not upload image', e);
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
                image_url: imageUrl,
            });
            await article.save()
            super.found(req, res, article);
        } catch (e) {
            super.error(req, res, 'article not created', e);
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

    async update(req: Request, res: Response): Promise<void> {
        try {
            const article = await BlogArticle.update(req.body, {
                where: { id: req.params.id }
            });
            super.found(req, res, article);
        } catch (e) {
            super.error(req, res, 'article not updated', e);
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
