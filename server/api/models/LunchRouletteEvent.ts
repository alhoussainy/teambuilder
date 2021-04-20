import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
} from 'sequelize-typescript';
import { User } from './User';
import { LunchRouletteEventUser } from './LunchRouletteEventUser';

@Table
export class LunchRouletteEvent extends Model<LunchRouletteEvent> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column
    date: Date;

    @Column
    done: boolean;

    @Column
    rated: boolean;

    @BelongsToMany(
        () => User,
        () => LunchRouletteEventUser
    )
    users?: User[];
}
