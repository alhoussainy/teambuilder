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
import { PublicTest } from './PublicTest';


@Table
export class PublicTestTrimojiFeedback extends Model<PublicTestTrimojiFeedback> {
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
    @Column
    global_value: number;

    @AllowNull(true)
    @Column
    structure_value: number;

    @AllowNull(true)
    @Column
    motivation_value: number;

    @AllowNull(true)
    @Column
    intensity_value: number;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => Personality, "tbr_personality")
    PersonalityQualityAssoc?: Personality;

}