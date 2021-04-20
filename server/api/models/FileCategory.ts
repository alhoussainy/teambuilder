import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
    HasMany,
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript';
import { User } from './User';
import ClubMember from './ClubMember';
import {Company} from "./Company";

@Table({
    indexes: [
        {
            unique: true,
            fields: ['id'],
        },
    ],
})
export class FileCategory extends Model<FileCategory> {
    @Column({
        defaultValue: DataType.INTEGER,
        primaryKey: true,
        type: DataType.INTEGER,
    })
    id: string;

    @Column
    main_name: string;

    @Column
    name: string;

}
