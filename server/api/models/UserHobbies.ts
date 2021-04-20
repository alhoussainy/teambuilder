import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasMany, HasOne, BelongsTo,
} from 'sequelize-typescript';
import { Hobbies } from './Hobbies';
import { Skills } from './Skills';
import { User } from './User';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'hobby_id'],
        },
    ],
})
export class UserHobbies extends Model<UserHobbies> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.INTEGER, references: { model: Hobbies, key: 'id' } })
    @ForeignKey(() => Hobbies)
    hobby_id: number;

    @BelongsTo(() => User)
    User?: User;

    @BelongsTo(() => Hobbies)
    Hobbies?: Hobbies;

}
