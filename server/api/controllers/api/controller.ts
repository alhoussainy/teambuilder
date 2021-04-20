import { Request, Response } from 'express';
import logger from '../../../common/logger';

class ServerResponse {
    success: boolean;
    message: string;
    data: any;
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

export class ApiController {
    found(req: Request, res: Response, data: any = null): void {
        if (data == undefined) {
            res.status(200);
            res.json(new ServerResponse(false, 'not found', null));
        } else {
            res.status(200);
            res.json(new ServerResponse(true, 'Success', data));
        }
    }
    success(req: Request, res: Response, data: any = null): void {
        res.status(200);
        res.json(new ServerResponse(true, 'Success', data));
    }
    notFound(req: Request, res: Response): void {
        logger.info('not found');
        res.status(200);
        res.json(new ServerResponse(false, 'not found', null));
    }
    badRequest(req: Request, res: Response): void {
        logger.info('bad request');
        res.status(200);
        res.json(new ServerResponse(false, 'Bad Request', null));
    }
    fail(req: Request, res: Response, msg: string): void {
        logger.info('fail => ' + msg);
        res.status(200);
        res.json(new ServerResponse(false, msg, null));
    }
    error(req: Request, res: Response, msg: string, error: any): void {
        logger.error(msg + ' error => ' + error);
        res.status(200);
        res.json(new ServerResponse(false, msg, null));
    }

    unauthorized(req: Request, res: Response): void {
        logger.info('unauthorized');
        res.status(200);
        res.json(new ServerResponse(false, 'unauthorized', null));
    }

    validationError(req, res, validationError): void {
        const validationMessage = Object.values(validationError[0].constraints)[0]
        logger.debug({ error: validationError}, 'validation error => ' + validationMessage);
        res.status(200);
        res.json(new ServerResponse(false, validationMessage, null));
    }
    
    belongsTo(req, res, company_id): boolean {
        if (res.locals.company_id === company_id) {
            return true;
        }
        
        logger.error({want_access: company_id, has_access: res.locals.company_id}, 'belongs to access error');
        res.status(200);
        res.json(new ServerResponse(false, "you do not have access to this company", null));
        return false;
    }

    //we do not have to check the company here, because we couldn't even create the resource...
    //...if the resource didn't belong to the company
    ownsResource(req, res, resource_user_id): boolean {
        if (res.locals.is_owner) {
            //owner can access everything.
            return true;
        }
        
        if (res.locals.user_id === resource_user_id) {
            return true;
        }

        logger.error({want_access_user_id: resource_user_id, user_id: res.locals.user_id}, 'resource access error');
        res.status(200);
        res.json(new ServerResponse(false, "you do not have access to this resource", null));
        return false;
    }
    
    
}
