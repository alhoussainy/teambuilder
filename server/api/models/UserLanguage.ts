import { Table, ForeignKey, Model, Column } from 'sequelize-typescript';
import { User } from './User';
import { Language } from './Language';

@Table
export class UserLanguage extends Model<UserLanguage> {
    @ForeignKey(() => User)
    @Column
    userId: string;

    @ForeignKey(() => Language)
    @Column
    languageId: string;
}
