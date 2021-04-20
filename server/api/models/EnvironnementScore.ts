import {
    Table,
    Model,
    Column,
    ForeignKey,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, Length, BelongsTo,
} from 'sequelize-typescript';
import { Personality } from './Personality';
import { PersonalityCaracteristicAssoc } from './PersonalityCaracteristicAssoc';

@Table({
    timestamps: false,
})
export class EnvironnementScore extends Model<EnvironnementScore> {
    @Column({
        defaultValue: DataType.INTEGER,
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true
    })
    id: number;

    @Column
    profil1: string;

    @Column
    profil2: string;
    
    @Column
    score: number;
}
