import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasOne, BelongsTo
} from 'sequelize-typescript';
import { User } from './User';

@Table({
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'manager_id'],
        },
    ],
})
export class UserManager extends Model<UserManager> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    manager_id: string;

    @BelongsTo(() => User)
    User?: User[];
}
