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
export class PersonalityIdealPosition extends Model<PersonalityIdealPosition> {
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
