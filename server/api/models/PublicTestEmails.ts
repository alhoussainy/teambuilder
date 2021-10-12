import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasOne, BelongsTo
} from 'sequelize-typescript';
import { PublicTest } from './PublicTest';
import { User } from './User';

@Table({
    indexes: [
        {
            unique: true,
            fields: ['token', 'email'],
        },
    ],
})
export class PublicTestEmails extends Model<PublicTestEmails> {

    @Column({ type: DataType.UUID, references: { model: PublicTest, key: 'token' } })
    @ForeignKey(() => PublicTest)
    token: string;

    @Column
    email: string;

    @BelongsTo(() => PublicTest)
    PublicTest?: PublicTest[];
}