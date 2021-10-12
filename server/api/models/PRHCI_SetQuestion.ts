import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, HasOne, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import {Company} from "./Company";
import { PRHCI_ProcessAnswers } from './PRHCI_ProcessAnswers';
import { PRHCI_QuestionOption } from './PRHCI_QuestionOption';
import { PRHCI_QuestionSet } from './PRHCI_QuestionSet';


@Table
export class PRHCI_SetQuestion extends Model<PRHCI_SetQuestion> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; 

    @Column({ type: DataType.UUID, references: { model: PRHCI_QuestionSet, key: 'id' } })
    @ForeignKey(() => PRHCI_QuestionSet)
    set_id: string; 

    @Column
    title: string;

    @Column
    type: number;

    @Column
    isMultiAnswer: boolean;

    @Column
    orderNumber: number;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @HasMany(() => PRHCI_QuestionOption)
    Options?: PRHCI_QuestionOption;

    @HasMany(() => PRHCI_ProcessAnswers)
    Answers?: PRHCI_ProcessAnswers;

}
