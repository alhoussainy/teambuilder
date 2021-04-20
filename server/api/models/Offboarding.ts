import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, Length, HasOne, ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';
import { Company } from './Company';

@Table
export class Offboarding extends Model<Offboarding> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string; //which company does this post belong to

    @Column
    type: string;

    @Column
    detailsType: string;

    @Column({
        type: DataType.STRING(3000)
    })
    reason: string;

    @Column
    departureDate: Date;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;


}
