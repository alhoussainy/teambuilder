import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { Filiere } from './Filiere';
import { User } from './User';

@Table
export class UserHighestSkill extends Model<UserHighestSkill> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column
    diploma_level: number;

    @Column
    sector: string;

    @Column({ type: DataType.INTEGER, references: { model: Filiere, key: 'id' } })
    @ForeignKey(() => Filiere)
    filiere_id: number;

    @Column
    speciality: string;

    @Column
    school: string;

    @BelongsTo(() => User, 'user_id')
    User: User;

    
}
