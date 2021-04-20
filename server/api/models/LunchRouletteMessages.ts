import {
    Column,
    DataType,
    Model,
    Table,
    BelongsToMany,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { User } from './User';
import { Lunchroulette } from './Lunchroulette';
import { Company } from './Company';

@Table
export class LunchRouletteMessages extends Model<LunchRouletteMessages> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column
    date: Date;

    @Column
    content: string;

    @ForeignKey(() => User)
    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    author_id: string;

    
    @Column({ type: DataType.UUID, references: { model: Lunchroulette, key: 'id' } })
    lunchroulette_id: string;

    @BelongsTo(() => Lunchroulette, 'lunchroulette_id')
    MeetDetails?: Lunchroulette;
    @BelongsTo(() => User, 'author_id')
    User?: User;
}
