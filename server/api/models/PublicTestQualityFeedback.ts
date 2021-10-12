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
import { PersonalityQuality } from './PersonalityQuality';
import { PersonalityQualityAssoc } from './PersonalityQualityAssoc';
import { PublicTest } from './PublicTest';


@Table
export class PublicTestQualityFeedback extends Model<PublicTestQualityFeedback> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;


    @Column({ type: DataType.UUID, references: { model: PublicTest, key: 'token' } })
    @ForeignKey(() => PublicTest)
    test_token: string;

    @BelongsTo(() => PublicTest, "test_token")
    PublicTestAssoc?: PublicTest;

    @AllowNull(true)
    @Column({ type: DataType.STRING, references: { model: Personality, key: 'id' } })
    tbr_personality: string;

    @AllowNull(true)
    @Column({ type: DataType.INTEGER, references: { model: PersonalityQuality, key: 'id' } })
    @ForeignKey(() => PersonalityQuality)
    quality_id: string;

    @Column
    value: number;

    @Column
    isGlobal: boolean;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => Personality, "tbr_personality")
    PersonalityQualityAssoc?: Personality;
}