import {
    Table,
    Model,
    Column,
    DataType,
    BelongsTo,
    BelongsToMany, CreatedAt, UpdatedAt, DeletedAt, ForeignKey,
} from 'sequelize-typescript';
import { User } from './User';
import ClubMember from './ClubMember';
import {Company} from "./Company";
import {Poll} from "./Poll";

@Table({
    indexes: [
        {
            unique: true,
            fields: ['poll_id', 'option'], //can't have a poll with the same option twice
        },
        {
            unique: false,
            fields: ['option'],
        },
    ],
})
export class PollOption extends Model<PollOption> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this poll option belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string; //who created this?

    @Column({ type: DataType.UUID, references: { model: Poll, key: 'id' } })
    @ForeignKey(() => Poll)
    poll_id: string; //this option is part of which poll?


    @Column
    option: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
