import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    ForeignKey,
    AllowNull, BelongsTo, HasMany, Length
} from 'sequelize-typescript';

import { Company } from './Company';
import { PRH_InterviewStep } from './PRH_InterviewStep'
import {PRH_InterviewQuestionsCategory} from './PRH_InterviewQuestionsCategory'

export class PRH_InterviewRhQuestion extends Model<PRH_InterviewRhQuestion> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: PRH_InterviewStep, key: 'id' } })
    @ForeignKey(() => PRH_InterviewStep)
    interview_id: string;

    @Column
    question: string;
   
    @Column
    @ForeignKey(() => PRH_InterviewQuestionsCategory)
    category_id: string;

    @Column 
    answertype: string;

    @AllowNull(true)
    @Column
    analysis_cluster:number;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}