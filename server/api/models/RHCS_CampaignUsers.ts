import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import {Company} from "./Company";
import { RHCS_Campaign } from './RHCS_Campaign';

@Table
export class RHCS_CompaignUsers extends Model<RHCS_CompaignUsers> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; // Which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: RHCS_Campaign, key: 'id' } })
    @ForeignKey(() => RHCS_Campaign)
    campaign_id: string; // What campaign is linked to it

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string; // What user is linked to it

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @BelongsTo(() => User, 'user_id')
    User?: User;

}
