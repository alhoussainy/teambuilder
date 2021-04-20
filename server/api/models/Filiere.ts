import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    AllowNull, HasOne
} from 'sequelize-typescript';


@Table
export class Filiere extends Model<Filiere> {
    @Column({
        primaryKey: true,
        type: DataType.INTEGER,
    })
    id: number;

    @AllowNull(false)
    @Column
    name: string;
        
    @Column
    name_en: string;

    @Column
    name_es: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}