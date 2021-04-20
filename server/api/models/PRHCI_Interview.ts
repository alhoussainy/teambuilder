import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import {Company} from "./Company";
import { PRHCI_InterviewSet } from './PRHCI_InterviewSet';


@Table
export class PRHCI_Interview extends Model<PRHCI_Interview> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; // Which company does this post belong to

    @Column
    name: string;

    @Column
    title: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    
    @HasMany(() => PRHCI_InterviewSet)
    Sets?: PRHCI_InterviewSet;

}
