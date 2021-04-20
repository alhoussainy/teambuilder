import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, BelongsTo, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne,
} from 'sequelize-typescript';
import { User } from './User';
import {Company} from "./Company";
import { RHCS_ModelQuestions } from './RHCS_ModelQuestions';
import { RHCS_Campaign } from './RHCS_Campaign';

@Table
export class RHCS_Model extends Model<RHCS_Model> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string; //who created this?

    @Column
    title: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @HasMany(() => RHCS_ModelQuestions)
    Questions?: RHCS_ModelQuestions;

    @HasMany(() => RHCS_Campaign)
    Campaigns?: RHCS_Campaign;

}
