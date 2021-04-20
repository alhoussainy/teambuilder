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
    HasOne,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import { Club } from "./Club";
import { Post } from "./Post";
import { Company } from './Company';

@Table
export class Notification extends Model<Notification> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    @ForeignKey(() => Company)
    company_id: string; 

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' }    })
    @ForeignKey(() => User)
    user_id: string; 

    @Column({ type: DataType.UUID, references: { model: Club, key: 'id' }    })
    @ForeignKey(() => Club)
    club_id: string;

    @Column({ type: DataType.UUID, references: { model: Post, key: 'id' }    })
    @ForeignKey(() => Post)
    post_id: string;

    @BelongsTo(() => User, 'user_id')
    User?: User;

    @BelongsTo(() => Company, 'company_id')
    Company?: Company;

    @BelongsTo(() => Club, 'club_id')
    Club?: Club;

    @Column
    type: number;

    @Column
    customData: string;

    @CreatedAt
    created_at: Date;

}