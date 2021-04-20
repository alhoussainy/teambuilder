import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';

@Table
export class Skills extends Model<Skills> {
    @Column({
        defaultValue: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        type: DataType.INTEGER,
    })
    id: number;

    @Column
    name: string;

    @Column
    name_en: string;

    @Column
    name_es: string;
    
}
