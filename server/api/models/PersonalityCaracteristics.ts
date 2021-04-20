import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, Length, ForeignKey,
} from 'sequelize-typescript';
import { PersonalityCaracteristicAssoc } from './PersonalityCaracteristicAssoc';

@Table({
    timestamps: false,
})
export class PersonalityCaracteristics extends Model<PersonalityCaracteristics> {
    @Column({
        defaultValue: DataType.INTEGER,
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    id: number;

    @Column
    name: string;

    @Column
    name_en: string;
    
    @Column
    name_es: string;
}
