import sequelize from './sequelize';
import logger from './common/logger';
import * as bcrypt from 'bcryptjs';
import config from './common/config';

export default async function seed(): Promise<void> {
    try {
        await sequelize.sync({ force: false, logging: false});
    } catch (error) {
        console.log( "Sequelize sync error : ", error)        
    }
}
