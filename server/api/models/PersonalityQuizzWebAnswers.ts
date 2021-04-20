import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, Length, ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';
import { PersonalityQuizzQuestions } from './PersonalityQuizzQuestions';
import { CompanyPersonalityTest } from './CompanyPersonalityTest';

@Table
export class PersonalityQuizzWebAnswers extends Model<PersonalityQuizzWebAnswers> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.INTEGER, references: { model: PersonalityQuizzQuestions, key: 'id' } })
    @ForeignKey(() => PersonalityQuizzQuestions)
    question_id: number;

    @Column({ type: DataType.UUID, references: { model: CompanyPersonalityTest, key: 'id' } })
    @ForeignKey(() => User)
    test_id: string;

    @Column({ type: DataType.BOOLEAN })
    answer: boolean;

    @Column({
        type: DataType.STRING(1)
    })
    letter: string;

}
