import { Model, ForeignKey, Column, Table } from 'sequelize-typescript';
import { LunchRouletteEvent } from './LunchRouletteEvent';
import { User } from './User';

@Table
export class LunchRouletteEventUser extends Model<LunchRouletteEventUser> {
    @ForeignKey(() => User)
    @Column
    public userId: string;

    @ForeignKey(() => LunchRouletteEvent)
    @Column
    public lunchRouletteEventId: string;
}
