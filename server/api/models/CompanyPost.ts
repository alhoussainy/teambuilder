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
import { Service } from './Service';
import { User } from './User'


@Table
export class CompanyPost extends Model<CompanyPost> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; 

    @ForeignKey(() => Service)
    @Column({ type: DataType.INTEGER, references: { model: Service, key: 'id' } })
    service_id: number; 

    @AllowNull(false)
    @Column
    name: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => Service)
    Service?: Service;

}