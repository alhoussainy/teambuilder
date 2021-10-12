import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, Length, HasOne, BelongsTo,
} from 'sequelize-typescript';
import { PersonalityType } from './PersonalityType';
import { PersonalityEnvironmentAssoc } from './PersonalityEnvironmentAssoc';
import { PersonalityIdealpositionAssoc } from './PersonalityUserAssoc';
import { PersonalityQualityAssoc } from './PersonalityQualityAssoc';

@Table({
    timestamps: false,
})
export class Personality extends Model<Personality> {
    @Length({ min: 4, max: 4 })
    @Column({
        defaultValue: null,
        primaryKey: true,
        type: DataType.STRING,
    })
    id: string;

    @Column
    name_male: string;

    @Column
    name_male_en: string;

    @Column
    name_male_es: string;

    @Column
    name_female: string;

    @Column
    name_female_en: string;

    @Column
    name_female_es: string;

    @Column
    mantra: string;

    @Column
    mantra_en: string;

    @Column
    mantra_es: string;

    @Column
    quote: string;

    @Column
    quote_en: string;

    @Column
    quote_es: string;

    @Column({ type: DataType.INTEGER, references: { model: PersonalityType, key: 'id' } })
    type: number;

    @Column
    background_url: string;

    @BelongsTo(() => PersonalityType, "type")
    PersonalityType?: PersonalityType;

    @HasMany(() => PersonalityEnvironmentAssoc)
    TBREnvironments?: PersonalityEnvironmentAssoc[];

    @HasMany(() => PersonalityIdealpositionAssoc)
    TBRPositions?: PersonalityIdealpositionAssoc[];

    @HasMany(() => PersonalityQualityAssoc)
    TBRQualities?: PersonalityQualityAssoc[];

}