import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
    ForeignKey,
    BelongsTo,
    HasOne,
} from 'sequelize-typescript';
import { User } from './User';
import { Company } from './Company';

@Table
export class UserMessages extends Model<UserMessages> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string;

    @Column
    content: string;

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    author_id: string;

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    recipient_id: string;

    @Column
    deleted: boolean;

    @BelongsTo(() => User, 'recipient_id')
    Recipient?: User;
    @BelongsTo(() => User, 'author_id')
    User?: User;
}
