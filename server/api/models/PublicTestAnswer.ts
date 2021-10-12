import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    BelongsToMany,
    BelongsTo,
    ForeignKey,
    HasMany,
    Unique,
    NotNull,
    AllowNull, HasOne
} from 'sequelize-typescript';
import { Personality } from './Personality';
import { PersonalityQuizzQuestions } from './PersonalityQuizzQuestions';
import { PublicTest } from './PublicTest';


@Table
export class PublicTestAnswer extends Model<PublicTestAnswer> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: PublicTest, key: 'token' } })
    @ForeignKey(() => PublicTest)
    test_id: string;

    @Column({ type: DataType.INTEGER, references: { model: PersonalityQuizzQuestions, key: 'id' } })
    @ForeignKey(() => PersonalityQuizzQuestions)
    question_id: number;

    @Column({ type: DataType.BOOLEAN })
    answer: boolean;

    @Column({
        type: DataType.STRING(1)
    })
    letter: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}