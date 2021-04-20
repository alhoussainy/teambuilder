import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, Length, ForeignKey,
} from 'sequelize-typescript';
import { PersonalityType } from './PersonalityType';

@Table
export class PersonalityQuizzQuestions extends Model<PersonalityQuizzQuestions> {
    @Column({
        defaultValue: DataType.INTEGER,
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    id: number;

    @Column
    question: string;

    @Column
    question_en: string;

    @Column
    question_es: string;

    @Column({
        type: DataType.STRING(1)
    })
    true_letter: string;

    @Column({
        type: DataType.STRING(1)
    })
    false_letter: string;



}
