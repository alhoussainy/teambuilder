import pino from 'pino';
import config from './config';

// const l = pino({
//   name: process.env.APP_ID,
//   level: process.env.LOG_LEVEL,
// });
//
//
//
// export default l;

const logger = pino({ name: config.app_name, level: 'debug' });

export default logger;

