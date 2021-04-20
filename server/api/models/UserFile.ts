import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasMany, HasOne, BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import { File } from './File';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'file_id'],
        },
    ],
})
export class UserFile extends Model<UserFile> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.UUID, references: { model: File, key: 'id' } })
    @ForeignKey(() => File)
    file_id: string;

    @BelongsTo(() => User)
    User?: User;

    @BelongsTo(() => File)
    Files?: File;
}
