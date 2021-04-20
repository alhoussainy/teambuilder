import {Table, Model, Column, DataType, Length, AllowNull, ForeignKey, BelongsTo} from 'sequelize-typescript';
import { Company } from './Company';
import { User } from './User';

@Table
export class Storage extends Model<Storage> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string; 

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    @ForeignKey(() => Company)
    company_id: string; 

    @BelongsTo(() => User, 'user_id')
    User?: User;

    @AllowNull(false)
    @Column(DataType.BLOB('long'))
    data: string;
}
