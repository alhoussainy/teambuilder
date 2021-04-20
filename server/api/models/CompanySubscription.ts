import {
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    DeletedAt,
    DataType,
    BelongsToMany,
    Table,
    HasMany,
    ForeignKey,
    BelongsTo, AllowNull,
} from 'sequelize-typescript';
import { Company } from './Company';

@Table
export class CompanySubscription extends Model<CompanySubscription> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; 

    @Column
    price: number

    @Column
    employees: number

    @Column
    active: boolean

    @Column
    expiry_date: Date;

    @Column({type: DataType.FLOAT})
    balance: number
    
    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
