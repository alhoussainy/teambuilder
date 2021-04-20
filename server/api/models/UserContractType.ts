import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasMany, HasOne, BelongsTo,
} from 'sequelize-typescript';
import { ContractType } from './ContractType';
import { Skills } from './Skills';
import { User } from './User';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['user_id', 'contract_type_id'],
        },
    ],
})
export class UserContractType extends Model<UserContractType> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.UUID, references: { model: ContractType, key: 'id' } })
    @ForeignKey(() => ContractType)
    contract_type_id: string;

    @Column
    toImprove: boolean;

    @BelongsTo(() => User)
    User?: User[];

    @BelongsTo(() => ContractType)
    Contracts?: ContractType[];
}
