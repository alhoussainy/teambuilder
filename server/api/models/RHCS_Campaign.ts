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

@Table
export class RHCS_Campaign extends Model<RHCS_Campaign> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; // Which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string; // Who created this?

    @Column({ type: DataType.UUID, references: { model: RHCS_Model, key: 'id' } })
    @ForeignKey(() => RHCS_Model)
    model_id: string; // What model is linked to it

    @Column
    title: string;

    @AllowNull(false)
    @Column({type : DataType.DATE})
    starts_at: string;

    @AllowNull(false)
    @Column({type : DataType.DATE})
    ends_at: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
    
    @HasMany(() => RHCS_CompaignUsers)
    Users?: RHCS_CompaignUsers;

    @BelongsTo(() => RHCS_Model)
    Model: RHCS_Model

}
