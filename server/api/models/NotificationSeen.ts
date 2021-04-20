import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    ForeignKey,
    AllowNull,
} from 'sequelize-typescript';
import { User } from './User';
import { Notification } from './Notification';

@Table
export class NotificationSeen extends Model<NotificationSeen> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Notification, key: 'id' } })
    notification_id: string; 

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string; 

    @CreatedAt
    created_at: Date;

}