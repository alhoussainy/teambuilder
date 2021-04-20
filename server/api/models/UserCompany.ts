import {
    Table,
    ForeignKey,
    Column,
    Model,
    CreatedAt,
} from 'sequelize-typescript';
import { User } from './User';
import { Company } from './Company';

@Table
export class UserCompany extends Model<UserCompany> {
    @ForeignKey(() => User)
    @Column
    public userId: string;

    @ForeignKey(() => Company)
    @Column
    public companyId: string;

    @CreatedAt
    public joinedOn: Date;
}
