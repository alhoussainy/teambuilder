import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasMany, HasOne, BelongsTo,
} from 'sequelize-typescript';
import { Skills } from './Skills';
import { User } from './User';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: false,
            fields: ['user_id', 'skill_id'],
        },
    ],
})
export class UserSkills extends Model<UserSkills> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.INTEGER, references: { model: Skills, key: 'id' } })
    @ForeignKey(() => Skills)
    skill_id: number;

    @Column
    toImprove: boolean;

    @BelongsTo(() => User)
    User?: User[];

    @BelongsTo(() => Skills)
    Skills?: Skills[];
}
