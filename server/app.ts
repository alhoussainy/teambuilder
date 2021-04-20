import './common/env';
import Server from './common/server';
import routes from './routes';
import config from './common/config';
import logger from './common/logger';
import seed from './seed';

(async () => {
    try {
        await seed();
    } catch (e) {
        logger.info({ error: e }, 'error seeding');
    }
})();

const port = parseInt(config.port);
export default new Server().router(routes).listen(port);
