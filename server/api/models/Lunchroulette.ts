import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany, AllowNull, Default,
} from 'sequelize-typescript';
import { User } from './User';
import { Company } from "./Company";

@Table({
    indexes: [
        {
            unique: false,
            fields: ['date'],
        },
    ],
})
export class Lunchroulette extends Model<Lunchroulette> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @AllowNull(false)
    @Column
    date: string;

    @AllowNull(false)
    @Default(false)
    @Column
    multiple: boolean;

    @AllowNull(false)
    @Default(false)
    @Column
    type: number;


    @AllowNull(false)
    @Default(0)
    @Column
    count: number; //how many members are in here already?

    @AllowNull(false)
    @Default(false)
    @Column
    full: boolean; //how many members are in here already?

    @AllowNull(false)
    @Default(false)
    @Column
    zoom_url: string;
}
