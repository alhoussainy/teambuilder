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

export class PRH_InterviewQuestionsCategory extends Model<PRH_InterviewQuestionsCategory> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column
    name: string

    @Column
    order: number

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}