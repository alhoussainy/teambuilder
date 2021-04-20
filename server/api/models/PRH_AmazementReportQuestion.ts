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
import { PRH_AmazementReportStep } from './PRH_AmazementReportStep';

export class PRH_AmazementReportQuestion extends Model<PRH_AmazementReportQuestion> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: PRH_AmazementReportStep, key: 'id' } })
    @ForeignKey(() => PRH_AmazementReportStep)
    amazementReport_id: string; 

    @Column
    name: string;

    @Column
    isBoolean: boolean;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}