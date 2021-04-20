import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasOne, BelongsTo
} from 'sequelize-typescript';
import { User } from './User';
import { Club } from './Club';
import { Company } from './Company';

@Table({
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'club_id'],
        },
    ],
})
export default class ClubMember extends Model<ClubMember> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.UUID, references: { model: Club, key: 'id' } })
    @ForeignKey(() => Club)
    club_id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string;

    @BelongsTo(() => Club)
    Club?: Club;

    @BelongsTo(() => User)
    User?: User;
}
