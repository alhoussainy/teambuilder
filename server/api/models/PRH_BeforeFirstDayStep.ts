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
import { PRH_Items } from './PRH_Items';

export class PRH_BeforeFirstDayStep extends Model<PRH_BeforeFirstDayStep> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column
    sendingDate: number;
   
    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}