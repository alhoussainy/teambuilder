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
import { User } from './User';

export class PRH_OffboardingSurvey extends Model<PRH_OffboardingSurvey> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this surveyé belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string; //which user does this surveyé belong to

    @Column
    answer1: number;

    @Column
    answer2: number;

    @Column
    answer3: number;

    @Column
    answer4: number;

    @Column
    answer5: number;

    @Column
    answer6: number;

    @Column
    answer7: number;

    @Column
    answer8: number;

    @Column
    answer9: number;

    @Column
    answer10: number;
   
    @Column
    answer11: number;
   
    @Column
    answer12: number;
   
    @Column
    answer13: number;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}