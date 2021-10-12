import { Application } from 'express';
import express from 'express';
import { checkJwt } from './api/middlewares/checkJWT';
import { pagination } from './api/middlewares/pagination';
import company from './api/controllers/company/router'
import stats from './api/controllers/statistics/router'
import auth from './api/controllers/authentification/router'
import souscription from './api/controllers/CompanySouscription/router'
import article from './api/controllers/article/router'
import testPerso from './api/controllers/personalityTest/router'


const cors = require('cors');

const authenticatedRoutes = express
    .Router()
    .use(checkJwt)
export default function routes(app: Application): void {
    app.use(pagination);
    app.use(cors());
    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Vary", "Origin");
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept, Content-Length, X-Requested-With, x-access-token');

        next();
    });
    // Routes below
    app.use('/api/v1', auth);
    app.use(checkJwt)
    app.use('/api/v1/company', company);
    app.use('/api/v1', stats);
    app.use('/api/v1', souscription);
    app.use('/api/v1/article', article);
    app.use('/api/v1', testPerso);
}
