import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    BelongsToMany,
    BelongsTo,
    ForeignKey,
    HasMany,
    Unique,
    NotNull,
    AllowNull, HasOne
} from 'sequelize-typescript';
import { Company } from './Company';
import { FRH_PostCheckList } from './FRH_PostCheckList';
import { User } from './User';


@Table
export class FRH_CheckListTask extends Model<FRH_CheckListTask> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; 

    @ForeignKey(() => FRH_PostCheckList)
    @Column({ type: DataType.UUID, references: { model: FRH_PostCheckList, key: 'id' } })
    checklist_id: string; 

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    former_id: string; 

    @AllowNull(false)
    @Column
    name: string;

    @AllowNull(false)
    @Column
    is_onboarding: boolean;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => FRH_PostCheckList)
    Checklist: FRH_PostCheckList

    @BelongsTo(() => User)
    Former: User

}