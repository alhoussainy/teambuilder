import {
    Model,
    Table,
    Column,
    DataType,
    BelongsToMany,
} from 'sequelize-typescript';
import { User } from './User';
import { UserAllergene } from './UserAllergene';

@Table
export class Allergene extends Model<Allergene> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column
    name: string;

    @BelongsToMany(
        () => User,
        () => UserAllergene
    )
    users?: User[];
}
