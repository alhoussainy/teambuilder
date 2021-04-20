import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany,
} from 'sequelize-typescript';

@Table
export class LandingNewsletterEbook extends Model<LandingNewsletterEbook> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column
    email: string;

    @Column
    ebook_name: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;


}
