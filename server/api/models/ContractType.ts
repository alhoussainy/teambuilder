import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, BelongsTo,
} from 'sequelize-typescript';

@Table
export class ContractType extends Model<ContractType> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

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
