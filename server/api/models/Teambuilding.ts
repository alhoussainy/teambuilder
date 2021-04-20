import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { Company } from './Company';
import { TeambuildingVote } from './TeambuildingVote';

@Table
export class Teambuilding extends Model<Teambuilding> {
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
    public companyId: string;
    @BelongsTo(() => Company, 'companyId')
    public company: Company;

    @HasMany(() => TeambuildingVote, 'teambuildingId')
    teambuildingVotes: TeambuildingVote[];
}
