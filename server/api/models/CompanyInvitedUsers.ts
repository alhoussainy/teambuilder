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

@Table({
    paranoid: true
})
export class CompanyInvitedUsers extends Model<CompanyInvitedUsers> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; 

    @Column({ unique: true })
    email: string

    @Column({type : DataType.BOOLEAN})
    isFutureEmployee: boolean;

    @AllowNull(true)
    @Column({type : DataType.DATE})
    arrival_date: Date;

    @Column({type : DataType.BOOLEAN})
    beforeFirstDaySent: boolean;

    @Column({type : DataType.BOOLEAN})
    firstDaySent: boolean;
    
    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
