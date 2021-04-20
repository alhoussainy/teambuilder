import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType,
} from 'sequelize-typescript';
import { Personality } from './Personality';
import { User } from './User';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['personality_id', 'user_id'],
        },
    ],
})
export class PersonalityIdealpositionAssoc extends Model<PersonalityIdealpositionAssoc> {

    @Column({ type: DataType.STRING, references: { model: Personality, key: 'id' } })
    @ForeignKey(() => Personality)
    personality_id: string;

    @Column({ type: DataType.UUIDV4, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

}
