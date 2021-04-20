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
export class PersonalityType extends Model<PersonalityType> {
    @Column({
        defaultValue: DataType.INTEGER,
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true
    })
    id: number;

    @Column
    name: string;

    @Column
    name_en: string;
    
    @Column
    name_es: string;

    @HasMany(() => PersonalityCaracteristicAssoc)
    PersonalityCaracteristicAssoc?: PersonalityCaracteristicAssoc[];
}
