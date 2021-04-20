import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Seminar } from './Seminar';

@Table
export class SeminarVote extends Model<SeminarVote> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @ForeignKey(() => Seminar)
    @Column({
        type: DataType.UUID,
    })
    seminarId: string;
    @BelongsTo(() => Seminar, 'seminarId')
    seminar: Seminar;

    @Column
    choice: string;

    @Column
    userId: string;
}
