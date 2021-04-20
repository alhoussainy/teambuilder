import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany, AllowNull, Default, ForeignKey, BelongsTo, HasOne,
} from 'sequelize-typescript';
import { User } from './User';
import {Company} from "./Company";
import {Lunchroulette} from "./Lunchroulette";

@Table({
    indexes: [
        {
            unique: true,
            fields: ['lunchroulette_id', 'user_id'],
        },
        {
            unique: true,
            fields: ['user_id', 'lunchroulette_date'],
        },
    ],
})
export class Lunchrouletteuser extends Model<Lunchrouletteuser> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: Lunchroulette, key: 'id' } })
    lunchroulette_id: string;

    @Column({ references: { model: Lunchroulette, key: 'date' } })
    lunchroulette_date: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string;

    @BelongsTo(() => User, 'user_id')
    User?: User;

    @BelongsTo(() => Lunchroulette, 'lunchroulette_id')
    Lunch?: Lunchroulette;
}
