import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript';
import { Company } from './Company';
import { User } from './User';
import {Club} from "./Club";
import {Post} from "./Post";
import {Comment} from "./Comment";

@Table({
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'post_id'],
        },
        {
            unique: true,
            fields: ['user_id', 'comment_id'],
        },
    ],
})
export class Like extends Model<Like> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string; //who posted this?

    @AllowNull(true)
    @Column({ type: DataType.UUID, references: { model: Post, key: 'id' } })
    @ForeignKey(() => Post)
    post_id: string;

    @AllowNull(true)
    @Column({ type: DataType.UUID, references: { model: Comment, key: 'id' } })
    @ForeignKey(() => Comment)
    comment_id: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;
    //
    // @DeletedAt
    // deleted_at: Date;
}
