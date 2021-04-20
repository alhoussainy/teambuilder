import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, CreatedAt, UpdatedAt, DeletedAt, AllowNull, BelongsTo, ForeignKey} from 'sequelize-typescript';
import { User } from './User';
import {Company} from "./Company";
import { RHCS_ModelQuestions } from './RHCS_ModelQuestions';
import { RHCS_ModelQuestionsOptions } from './RHCS_ModelQuestionsOptions';
import { RHCS_Campaign } from './RHCS_Campaign';

@Table({
    indexes: [
        {
            unique: true,
            fields: ['mdlquest_id', 'user_id', 'campaign_id'],
        },
    ],
})
export class RHCS_CampaignAnswers extends Model<RHCS_CampaignAnswers> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this poll option belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string; //which user answered?

    @Column({ type: DataType.UUID, references: { model: RHCS_Campaign, key: 'id' } })
    campaign_id: string; 

    @Column({ type: DataType.UUID, references: { model: RHCS_ModelQuestions, key: 'id' } })
    mdlquest_id: string; //this option is part of which modelquestion?

    @BelongsTo(() => RHCS_Campaign, 'campaign_id')
    Campaign?: RHCS_Campaign;

    @BelongsTo(() => RHCS_ModelQuestions, 'mdlquest_id')
    RHCS_ModelQuestion?: RHCS_ModelQuestions;

    @AllowNull(true)
    @Column({ references: { model: RHCS_ModelQuestionsOptions, key: 'option' } })
    option_value: string; //which option did they pick?

    @AllowNull(true)
    @Column
    answer_string: string; // if poll is open answer

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => User)
    User?: User;
}
