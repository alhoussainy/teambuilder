import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    ForeignKey,
    AllowNull, BelongsTo, HasMany
} from 'sequelize-typescript';
import { Company } from './Company';
import { User } from './User';
import {Club} from "./Club";
import {Post} from "./Post";
import { Like } from './Like';

@Table
export class Comment extends Model<Comment> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string; 

    @BelongsTo(() => User, 'user_id')
    User?: User;

    @HasMany(() => Like)
    Likes?: Array<Like>;

    @Column({ type: DataType.UUID, references: { model: Post, key: 'id' } })
    @ForeignKey(() => Post)
    post_id: string; //who posted this?


    @AllowNull(true)
    @Column
    image_id: string;

    @AllowNull(false)
    @Column
    content: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
