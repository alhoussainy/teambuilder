import {
    Table,
    Model,
    Column,
    DataType,
    BelongsTo,
    BelongsToMany, CreatedAt, UpdatedAt, DeletedAt, ForeignKey
} from 'sequelize-typescript';
import { User } from './User';
import ClubMember from './ClubMember';
import {Company} from "./Company";
import {Poll} from "./Poll";
import { PRHCI_SetQuestion } from './PRHCI_SetQuestion';

@Table({
    indexes: [
        {
            unique: true,
            fields: ['mdlquestion', 'option'],
        },
        {
            unique: false,
            fields: ['option'],
        },
    ],
})
export class PRHCI_QuestionOption extends Model<PRHCI_QuestionOption> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: PRHCI_SetQuestion, key: 'id' } })
    @ForeignKey(() => PRHCI_SetQuestion)
    mdlquestion: string; //this option is part of which modelquestion

    @Column
    option: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
