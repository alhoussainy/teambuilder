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
import { FileCategory } from './FileCategory';

@Table({
    indexes: [
        {
            unique: true,
            fields: ['id'],
        },
    ],
})
export class File extends Model<File> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this file belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    uploader_id: string; //who uploaded this?

    @AllowNull(true)
    @Column({ type: DataType.INTEGER, references: { model: FileCategory, key: 'id' } })
    category_id: string; //who uploaded this?

    @Column
    file_name: string;

    @Column
    file_type: string;

    @Column
    file_size: string;

    @Column
    s3key: string;

    @Column
    s3bucket: string;

}
