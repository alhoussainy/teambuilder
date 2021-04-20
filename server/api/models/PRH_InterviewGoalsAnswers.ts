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
import { PRH_InterviewGoals } from './PRH_InterviewGoals';
import { PRH_InterviewRhQuestion } from './PRH_InterviewRhQuestion';
import { PRH_UserInterview } from './PRH_UserInterview'
import { User } from './User'

@Table({
    indexes: [
        {
            unique: false,
            fields: ['id', 'goal_id'],
        }, 
    ],
})
export class PRH_InterviewGoalsAnswers extends Model<PRH_InterviewGoalsAnswers> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: PRH_InterviewGoals, key: 'id' } })
    @ForeignKey(() => PRH_InterviewGoals)
    goal_id: string;

    @AllowNull(false)
    @Column
    value_reached: number

    @AllowNull(true)
    @Column({
        type: DataType.STRING(5000)
    })
    value_comment: string

    @AllowNull(false)
    @Column
    step: number

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    answerer_id: string;  
    
    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}