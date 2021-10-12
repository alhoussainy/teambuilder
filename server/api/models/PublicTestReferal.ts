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
            fields: ['token1', 'token2'],
        },
    ],
})
export class PublicTestReferal extends Model<PublicTestReferal> {

    @Column({ type: DataType.UUID, references: { model: PublicTest, key: 'token' } })
    @ForeignKey(() => PublicTest)
    token1: string;

    @Column({ type: DataType.UUID, references: { model: PublicTest, key: 'token' } })
    @ForeignKey(() => PublicTest)
    token2: string;

    @BelongsTo(() => PublicTest)
    PublicTest?: PublicTest[];
}
