import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, BelongsTo,
} from 'sequelize-typescript';
import { Personality } from './Personality';
import { PersonalityIdealPosition } from './PersonalityIdealPosition';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['personality_id', 'quality_id'],
        },
    ],
})
export class PersonalityIdealpositionAssoc extends Model<PersonalityIdealpositionAssoc> {

    @Column({ type: DataType.STRING, references: { model: Personality, key: 'id' } })
    @ForeignKey(() => Personality)
    personality_id: string;

    @Column({ type: DataType.INTEGER, references: { model: PersonalityIdealPosition, key: 'id' } })
    @ForeignKey(() => PersonalityIdealPosition)
    quality_id: string;

    @BelongsTo(() => PersonalityIdealPosition)
    Position?: PersonalityIdealPosition;

    @BelongsTo(() => Personality)
    Personality?: Personality;

}
