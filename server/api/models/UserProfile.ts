import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { User } from './User';
import { Profile } from './Profile';

@Table
export class UserProfile extends Model<UserProfile> {
    @ForeignKey(() => User)
    @Column
    public userId: string;

    @ForeignKey(() => Profile)
    @Column
    public profileId: string;
}
