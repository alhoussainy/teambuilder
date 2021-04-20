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
import { PRH_BeforeFirstDayStep } from './PRH_BeforeFirstDayStep';

export class PRH_Items extends Model<PRH_Items> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: PRH_BeforeFirstDayStep, key: 'id' } })
    @ForeignKey(() => PRH_BeforeFirstDayStep)
    beforeFirstDay_id: string; 

    @Column
    name: string;
   
    @Column({
        type: DataType.STRING(2000)
    })
    content: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}