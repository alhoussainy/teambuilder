import {
    Model,
    Table,
    Column,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';
import { User } from './User';
import { UserFoodHabit } from './UserFoodHabit';

@Table
export class FoodHabit extends Model<FoodHabit> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    public id: string;

    @Column
    name: string;

    @BelongsToMany(
        () => User,
        () => UserFoodHabit
    )
    uers?: User[];
}
