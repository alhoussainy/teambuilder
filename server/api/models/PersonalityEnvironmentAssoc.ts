import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasMany, HasOne, BelongsTo,
} from 'sequelize-typescript';
import { Personality } from './Personality';
import { PersonalityEnvironment } from './PersonalityEnvironment';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['personality_id', 'environment_id'],
        },
    ],
})
export class PersonalityEnvironmentAssoc extends Model<PersonalityEnvironmentAssoc> {

    @Column({ type: DataType.STRING, references: { model: Personality, key: 'id' } })
    @ForeignKey(() => Personality)
    personality_id: string;

    @Column({ type: DataType.INTEGER, references: { model: PersonalityEnvironment, key: 'id' } })
    @ForeignKey(() => PersonalityEnvironment)
    environment_id: string;

    @BelongsTo(() => PersonalityEnvironment)
    Environment?: PersonalityEnvironment;

}
