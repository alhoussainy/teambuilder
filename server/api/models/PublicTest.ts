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
import { PublicTestQualityFeedback } from './PublicTestQualityFeedback';
import { PublicTestTrimojiFeedback, } from './PublicTestTrimojiFeedback';


@Table
export class PublicTest extends Model<PublicTest> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    token: string;

    @AllowNull(true)
    @Column({ type: DataType.STRING, references: { model: Personality, key: 'id' } })
    tbr_personality: string;

    @AllowNull(true)
    @Column
    type: number;

    @AllowNull(true)
    @Column
    isReferal: boolean;

    @BelongsTo(() => Personality, "tbr_personality")
    PersonalityQualityAssoc?: Personality;

    @HasMany(() => PublicTestTrimojiFeedback)
    PublicTestTrimojiFeedback?: Array<PublicTestTrimojiFeedback>;

    @HasMany(() => PublicTestQualityFeedback)
    PublicTestQualityFeedback?: Array<PublicTestQualityFeedback>;


    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}