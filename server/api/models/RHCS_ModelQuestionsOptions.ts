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
import { RHCS_ModelQuestions } from './RHCS_ModelQuestions';

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
export class RHCS_ModelQuestionsOptions extends Model<RHCS_ModelQuestionsOptions> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: RHCS_ModelQuestions, key: 'id' } })
    @ForeignKey(() => RHCS_ModelQuestions)
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
