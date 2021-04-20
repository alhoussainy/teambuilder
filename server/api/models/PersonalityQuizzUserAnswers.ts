import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, Length, ForeignKey,
} from 'sequelize-typescript';
import { Company } from './Company';
import { User } from './User';
import { PersonalityQuizzQuestions } from './PersonalityQuizzQuestions';

@Table
export class PersonalityQuizzUserAnswers extends Model<PersonalityQuizzUserAnswers> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.INTEGER, references: { model: PersonalityQuizzQuestions, key: 'id' } })
    @ForeignKey(() => PersonalityQuizzQuestions)
    question_id: number;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    @ForeignKey(() => Company)
    company_id: string;

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.BOOLEAN })
    answer: boolean;

    @Column({
        type: DataType.STRING(1)
    })
    letter: string;

}
