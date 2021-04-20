import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';
import {Company} from "./Company";
import { RHCS_Campaign } from './RHCS_Campaign';
import { RHCS_Model } from './RHCS_Models';
import { RHCS_CompaignUsers } from './RHCS_CampaignUsers';
import { RHCS_ModelQuestionsOptions } from './RHCS_ModelQuestionsOptions';

@Table
export class RHCS_ModelQuestions extends Model<RHCS_ModelQuestions> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; // Which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: RHCS_Model, key: 'id' } })
    @ForeignKey(() => RHCS_Model)
    model_id: string; // What model is linked to it

    @Column
    type: number;

    @Column
    isMultiAnswer: boolean;

    @Column
    title: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @HasMany(() => RHCS_ModelQuestionsOptions)
    Options?: RHCS_ModelQuestionsOptions;
}
