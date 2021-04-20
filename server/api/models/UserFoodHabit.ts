import {
    Table,
    ForeignKey,
    Column,
    Model,
    CreatedAt,
} from 'sequelize-typescript';
import { User } from './User';
import { FoodHabit } from './FoodHabit';

@Table
export class UserFoodHabit extends Model<UserFoodHabit> {
    @ForeignKey(() => User)
    @Column
    public userId: string;

    @ForeignKey(() => FoodHabit)
    @Column
    public foodHabitId: string;
}
