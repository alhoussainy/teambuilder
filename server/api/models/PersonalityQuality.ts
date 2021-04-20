import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, Length,
} from 'sequelize-typescript';

@Table({
    timestamps: false,
})
export class PersonalityQuality extends Model<PersonalityQuality> {
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

    @Column
    isQuality: boolean; // Can be a quality (true) or a flaw (false)

}
