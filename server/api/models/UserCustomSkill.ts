import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasOne, BelongsTo
} from 'sequelize-typescript';
import { User } from './User';
import { CustomSkill } from './CustomSkill';

@Table({
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'customskill_id'],
        },
    ],
})
export default class UserCustomSkill extends Model<UserCustomSkill> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.UUID, references: { model: CustomSkill, key: 'id' } })
    @ForeignKey(() => CustomSkill)
    customskill_id: string;

    @Column
    user_rating: number;
    
    @Column
    user_interrest: number;

    @Column
    manager_rating: number;

    @BelongsTo(() => CustomSkill)
    CustomSkill?: CustomSkill[];
    
    @BelongsTo(() => User)
    User?: User[];
}
