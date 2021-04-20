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
export class EnvironnementScoreDetail extends Model<EnvironnementScoreDetail> {
    @Column({
        defaultValue: DataType.STRING,
        primaryKey: true,
        type: DataType.STRING
    })
    tbr_personality: string;

    @Column
    structure: number;

    @Column
    motivation: number;
    
    @Column
    intensity: number;

    @Column
    caracteristics: string;
}
