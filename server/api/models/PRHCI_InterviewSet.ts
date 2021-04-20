import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import {Company} from "./Company";
import { RHCS_Model } from './RHCS_Models';
import { RHCS_CompaignUsers } from './RHCS_CampaignUsers';
import { PRHCI_Interview } from './PRHCI_Interview';
import { PRHCI_QuestionSet } from './PRHCI_QuestionSet';

@Table
export class PRHCI_InterviewSet extends Model<PRHCI_InterviewSet> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: PRHCI_Interview, key: 'id' } })
    @ForeignKey(() => PRHCI_Interview)
    interview_id: string; // What model is linked to it

    @Column({ type: DataType.UUID, references: { model: PRHCI_QuestionSet, key: 'id' } })
    @ForeignKey(() => PRHCI_QuestionSet)
    questionset_id: string; // What model is linked to it

    @BelongsTo(() => PRHCI_QuestionSet)
    QuestionSets?: PRHCI_QuestionSet;

}
