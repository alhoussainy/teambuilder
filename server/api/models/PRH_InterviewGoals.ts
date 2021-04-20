import {
    Table,
    ForeignKey,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsToMany, DataType, HasOne, BelongsTo, AllowNull
} from 'sequelize-typescript';
import { PRH_InterviewRhQuestion } from './PRH_InterviewRhQuestion';
import { PRH_UserInterview } from './PRH_UserInterview'
import { User } from './User'

@Table({
    indexes: [
        {
            unique: false,
            fields: ['id', 'interview_id'],
        }, 
    ],
})
export class PRH_InterviewGoals extends Model<PRH_InterviewGoals> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: PRH_UserInterview, key: 'id' } })
    @ForeignKey(() => PRH_UserInterview)
    interview_id: string;

    @AllowNull(false)
    @Column
    step: number

    @AllowNull(false)
    @Column
    period: string

    @AllowNull(false)
    @Column
    name: string

    @AllowNull(false)
    @Column
    goal_date: Date

    @AllowNull(false)
    @Column
    percent_value: number
    
    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}