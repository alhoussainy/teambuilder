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
export class PersonalitySubType extends Model<PersonalitySubType> {
    @Column({
        defaultValue: DataType.INTEGER,
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    id: string;

    @Column
    name: string;

}
