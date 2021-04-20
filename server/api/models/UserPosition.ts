import {
    Table,
    ForeignKey,
    Column,
    Model,
    CreatedAt,
    BelongsTo,
    DataType
} from 'sequelize-typescript';
import { User } from './User';
import { Company } from './Company';
import { Service } from './Service'
import { CompanyPost } from './CompanyPost';

@Table
export class UserPosition extends Model<UserPosition> {
    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.UUID, references: { model: CompanyPost, key: 'id' } })
    @ForeignKey(() => CompanyPost)
    position_id: string;

    @BelongsTo(() => User)
    User?: User;

    @BelongsTo(() => CompanyPost)
    Post?: CompanyPost;

    @CreatedAt
    public joinedOn: Date;
}
