import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { SeminarVote } from './SeminarVote';
import { Company } from './Company';

@Table
export class Seminar extends Model<Seminar> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column
    choice1: string;

    @Column
    choice2: string;

    @Column
    choice3: string;

    @Column
    date: Date;

    @Column
    cost: number;

    @ForeignKey(() => Company)
    @Column({
        type: DataType.UUID,
    })
    companyId: string;
    @BelongsTo(() => Company, 'companyId')
    company: Company;

    @HasMany(() => SeminarVote, 'seminarId')
    seminarVotes: SeminarVote[];
}
