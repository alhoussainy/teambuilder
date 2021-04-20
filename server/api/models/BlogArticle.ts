import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    AllowNull
} from 'sequelize-typescript';

@Table
export class BlogArticle extends Model<BlogArticle> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @AllowNull(false)
    @Column
    title: string;

    @AllowNull(false)
    @Column({
        type: DataType.TEXT
    })
    content: string;

    @AllowNull(false)
    @Column
    category: number;

    @AllowNull(false)
    @Column
    slug: string;

    @AllowNull(false)
    @Column
    published: boolean;

    @AllowNull(false)
    @Column
    image_url: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}