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
import { CompanyPost } from './CompanyPost';
import { FRH_CheckListTask } from './FRH_CheckListTask';
import { User } from './User';


@Table
export class FRH_UserDoneTask extends Model<FRH_UserDoneTask> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: FRH_CheckListTask, key: 'id' } })
    task_id: string; 

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string; 

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}