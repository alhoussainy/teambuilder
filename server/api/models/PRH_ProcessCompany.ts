import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasOne, BelongsTo
} from 'sequelize-typescript';
import { Company } from './Company';
import { PRH_Process } from './PRH_Process'

@Table({
    indexes: [
        {
            unique: true,
            fields: ['company_id', 'process_id'],
        }, 
    ],
})
export class PRH_ProcessCompany extends Model<PRH_ProcessCompany> {

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    @ForeignKey(() => Company)
    company_id: string;

    @Column({ type: DataType.UUID, references: { model: PRH_Process, key: 'id' } })
    @ForeignKey(() => PRH_Process)
    process_id: string;
}
