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


@Table
export class FRH_PostCheckList extends Model<FRH_PostCheckList> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; 

    @ForeignKey(() => CompanyPost)
    @Column({ type: DataType.UUID, references: { model: CompanyPost, key: 'id' } })
    post_id: string; 

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => CompanyPost)
    Position: CompanyPost

}