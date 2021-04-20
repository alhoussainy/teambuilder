import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';
import { UserLanguage } from './UserLanguage';
import { User } from './User';

@Table
export class Language extends Model<Language> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column
    name: string;

    @BelongsToMany(
        () => User,
        () => UserLanguage
    )
    users?: User[];
}
