import {
    Table,
    ForeignKey,
    Column,
    Model,
    CreatedAt,
    BelongsTo,
    DataType
} from 'sequelize-typescript';
import { User } from './User';
import { Company } from './Company';

@Table
export class UserProcessState extends Model<UserProcessState> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    @ForeignKey(() => Company)
    company_id: string;

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column
    beforeDayOne: number;

    @Column
    welcomeMessage: number;

    @Column
    amazementReport: number;

    @Column
    offBoarding: number;

    @Column
    news: number;

    @Column
    skillsRating: number;

}
