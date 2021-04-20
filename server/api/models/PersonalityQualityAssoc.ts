import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, BelongsTo,
} from 'sequelize-typescript';
import { Personality } from './Personality';
import { PersonalityQuality } from './PersonalityQuality';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['personality_id', 'quality_id'],
        },
    ],
})
export class PersonalityQualityAssoc extends Model<PersonalityQualityAssoc> {

    @Column({ type: DataType.STRING, references: { model: Personality, key: 'id' } })
    @ForeignKey(() => Personality)
    personality_id: string;

    @Column({ type: DataType.INTEGER, references: { model: PersonalityQuality, key: 'id' } })
    @ForeignKey(() => PersonalityQuality)
    quality_id: string;

    @BelongsTo(() => PersonalityQuality)
    Quality?: PersonalityQuality;

}
