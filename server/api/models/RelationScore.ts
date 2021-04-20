import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany,
} from 'sequelize-typescript';

@Table
export class RelationScore extends Model<RelationScore> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column
    profil1: string;

    @Column
    profil2: string;

    @Column
    type: string;

    @Column
    score: number;

    @Column({
        type: DataType.STRING(5000)
    })
    description: string;
}
