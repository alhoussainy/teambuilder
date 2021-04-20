import express, { Application } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import http from 'http';
import os from 'os';
import cookieParser from 'cookie-parser';
import l from './logger';
import multer from 'multer';
const cors = require('cors');


import installValidator from './swagger';
import config from './config';
import { pagination } from "../api/middlewares/pagination";

const app = express();
const exit = process.exit;

export default class ExpressServer {
    private routes: (app: Application) => void;
    public srv;
    constructor() {
        // const upload = multer();
        const root = path.normalize(__dirname + '/../..');
        app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Vary", "Origin");
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS, PATCH");
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, Accept, Content-Length, X-Requested-With, x-access-token');

            next();
        });

        app.set('appPath', root + 'client');
        app.use(bodyParser.json({ limit: config.request_limit || '1000000kb' }));
        app.use(
            bodyParser.urlencoded({
                extended: true,
            })
        );
        // app.use(upload.array());
        // app.use(express.static('file'));

        app.use(bodyParser.text({ limit: config.request_limit || '1000000kb' }));
        app.use(cookieParser(config.session_secret));
        app.use(express.static(`${root}/public`));
        app.use(pagination)


    }

    router(routes: (app: Application) => void): ExpressServer {
        this.routes = routes;
        return this;
    }

    listen(port: number): Application {
        const welcome = (p: number) => () =>
            l.info(
                `up and running in ${config.node_env ||
                'development'} @: ${os.hostname()} on port: ${p}}`
            );

        // app.use(middleware.CORS());
        this.routes(app);
        this.srv = http.createServer(app).listen(port, welcome(port));

        // installValidator(app, this.routes)
        //   .then(() => {
        //     http.createServer(app).listen(port, welcome(port));
        //   })
        //   .catch(e => {
        //     l.error(e);
        //     exit(1);
        //   });

        return app;
    }
}
