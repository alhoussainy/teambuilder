import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasOne, BelongsTo, AllowNull
} from 'sequelize-typescript';
import { User } from './User';
import { PRH_AmazementReportQuestion } from './PRH_AmazementReportQuestion'

@Table({
    indexes: [
        {
            unique: false,
            fields: ['user_id', 'question_id'],
        }, 
    ],
})
export class PRH_AmazementReportAnswer extends Model<PRH_AmazementReportAnswer> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.UUID, references: { model: PRH_AmazementReportQuestion, key: 'id' } })
    @ForeignKey(() => PRH_AmazementReportQuestion)
    question_id: string;

    @AllowNull(true)
    @Column
    answer_text: string;

    @AllowNull(true)
    @Column
    answer_boolean: boolean;
}