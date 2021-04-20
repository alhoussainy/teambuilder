import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany,
} from 'sequelize-typescript';
import { User } from './User';
import ClubMember from './ClubMember';
import {Company} from "./Company";
import { PollOption } from './PollOption';
import { PollAnswer } from './PollAnswer';

@Table
export class Poll extends Model<Poll> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string; //who created this?

    @HasMany(() => PollOption)
    Options?: Array<PollOption>;

    @Column
    question: string;

    @Column
    enabled: boolean;

    @AllowNull(false)
    @Column
    starts_at: number;

    @AllowNull(false)
    @Column
    ends_at: number;

    @Column
    isAnonym: boolean;

    @Column
    multiAnswer: boolean;

    @Column
    type: number;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @HasMany(() => PollAnswer, 'poll_id')
    Answers?: PollAnswer;
}
