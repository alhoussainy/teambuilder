import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    ForeignKey,
    AllowNull, BelongsTo, HasMany, Length
} from 'sequelize-typescript';
import { Company } from './Company';
import { User } from './User';
import { Club } from "./Club";
import { Comment } from './Comment'
import { Like } from './Like'


export class Post extends Model<Post> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    // Associations

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string;

    @BelongsTo(() => User, 'user_id')
    User?: User;

    @HasMany(() => Comment)
    Comments?: Array<Comment>;

    @HasMany(() => Like)
    Likes?: Array<Like>;

    @AllowNull(true)
    @Column({ type: DataType.UUID, references: { model: Club, key: 'id' } })
    club_id: string; 

    @AllowNull(true)
    @Column
    image_id: string;

    @AllowNull(false)
    @Column({ type: DataType.STRING(2048)})
    content: string;

    @AllowNull(true)
    @Column({ type: DataType.STRING(5000)})
    url_metadatas: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    
}
