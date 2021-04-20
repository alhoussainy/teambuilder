import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, CreatedAt, UpdatedAt, DeletedAt, AllowNull, BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import ClubMember from './ClubMember';
import {Company} from "./Company";
import {Poll} from "./Poll";
import {PollOption} from "./PollOption";

@Table({
    indexes: [
        {
            unique: true,
            fields: ['poll_id', 'user_id', 'option_value'],
        },
    ],
})
export class PollAnswer extends Model<PollAnswer> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this poll option belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string; //which user answered?

    @Column({ type: DataType.UUID, references: { model: Poll, key: 'id' } })
    poll_id: string; //this option is part of which poll?

    @BelongsTo(() => Poll, 'poll_id')
    Poll?: Poll;

    @BelongsTo(() => User, 'user_id')
    User?: User;

    // @Column({ references: { model: PollOption, key: 'id' } })
    // option_id: string; //which option did they pick?
    @AllowNull(true)
    @Column({ references: { model: PollOption, key: 'option' } })
    option_value: string; //which option did they pick?

    @AllowNull(true)
    @Column
    answer_string: string; // if poll is open answer

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
