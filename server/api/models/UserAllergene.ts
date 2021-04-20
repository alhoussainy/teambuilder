import {
    Table,
    ForeignKey,
    Column,
    Model,
    CreatedAt,
} from 'sequelize-typescript';
import { User } from './User';
import { Allergene } from './Allergene';

@Table
export class UserAllergene extends Model<UserAllergene> {
    @ForeignKey(() => User)
    @Column
    public userId: string;

    @ForeignKey(() => Allergene)
    @Column
    public allergeneId: string;
}
