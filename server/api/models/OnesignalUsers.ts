import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasMany, HasOne, BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'player_id'],
        },
    ],
})
export class OnesignalUsers extends Model<OnesignalUsers> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column
    player_id: string;

}
