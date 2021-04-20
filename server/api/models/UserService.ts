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

@Table
export class UserService extends Model<UserService> {
    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.INTEGER, references: { model: Service, key: 'id' } })
    @ForeignKey(() => Service)
    service_id: number;


    @BelongsTo(() => User)
    User?: User;

    @BelongsTo(() => Service)
    Service?: Service;

    @CreatedAt
    public joinedOn: Date;
}
