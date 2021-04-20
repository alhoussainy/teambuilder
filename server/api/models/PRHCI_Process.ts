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
import { PRHCI_ProcessAnswers } from './PRHCI_ProcessAnswers';

@Table
export class PRHCI_Process extends Model<PRHCI_Process> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; 

    @Column({ type: DataType.UUID, references: { model: PRHCI_Interview, key: 'id' } })
    @ForeignKey(() => PRHCI_Interview)
    interview_id: string; 

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string; 

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    manager_id: string; 

    @Column
    step: number;

    @Column
    meeting_date: Date;

    @Column({ type : DataType.BLOB})
    user_signature: string;

    @Column({ type : DataType.BLOB})
    manager_signature: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => PRHCI_Interview)
    Interview?: PRHCI_Interview;

    @BelongsTo(() => User, 'user_id')
    User?: User;

    @HasMany(() => PRHCI_ProcessAnswers)
    Answers?: PRHCI_ProcessAnswers
   
}
