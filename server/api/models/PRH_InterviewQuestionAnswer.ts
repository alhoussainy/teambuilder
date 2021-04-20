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
            fields: ['question_id', 'interview_id'],
        }, 
    ],
})
export class PRH_InterviewQuestionAnswer extends Model<PRH_InterviewQuestionAnswer> {

    @Column({ type: DataType.UUID, references: { model: PRH_InterviewRhQuestion, key: 'id' } })
    @ForeignKey(() => PRH_InterviewRhQuestion)
    question_id: string;

    @Column({ type: DataType.UUID, references: { model: PRH_UserInterview, key: 'id' } })
    @ForeignKey(() => PRH_UserInterview)
    interview_id: string;

    @AllowNull(true)
    @Column
    answer_type: number

    @AllowNull(true)
    @Column({
        type: DataType.STRING(5000)
    })
    answer_string:string

    @AllowNull(true)
    @Column
    answer_number:number

    @AllowNull(true)
    @Column
    answer_boolean:boolean

    @Column
    step:number

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