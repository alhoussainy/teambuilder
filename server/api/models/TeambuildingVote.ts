import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Teambuilding } from './Teambuilding';

@Table
export class TeambuildingVote extends Model<TeambuildingVote> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @ForeignKey(() => Teambuilding)
    @Column({
        type: DataType.UUID,
    })
    teambuildingId: string;
    @BelongsTo(() => Teambuilding, 'teambuildingId')
    teambuilding: Teambuilding;

    @Column
    choice: string;

    @Column
    userId: string;
}
