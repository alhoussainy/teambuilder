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
import { User } from './User'


@Table
export class Service extends Model<Service> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
    })
    id: number;

    @AllowNull(false)
    @Column
    name: string;
    
    @Column
    name_en: string;
    
    @Column
    name_es: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}