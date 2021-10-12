import {
    Table,
    ForeignKey,
    Column,
    Model,
    CreatedAt,
    BelongsTo,
    DataType,
    UpdatedAt,
    DeletedAt
} from 'sequelize-typescript';
import { User } from './User';
import { Company } from './Company';
import { Service } from './Service'
import { CompanyPost } from './CompanyPost';

@Table
export class WBB_WeeklyReport extends Model<WBB_WeeklyReport> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this user belong to?

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column
    value: number;

    @BelongsTo(() => User)
    User?: User;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
