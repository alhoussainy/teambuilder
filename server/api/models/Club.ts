import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import { User } from './User';
import ClubMember from './ClubMember';
import {Company} from "./Company";

@Table({
    indexes: [
        {
            unique: true,
            fields: ['company_id', 'name'],
        },
    ],
})
export class Club extends Model<Club> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    user_id: string; //who posted this?

    @HasMany(() => ClubMember)
    Members?: ClubMember[];

    @Column
    avatar_id: string;

    @Column
    name: string;

    @Column
    description: string;

    @Column
    sponsored: boolean;

    @Column
    city: string;

    @Column
    active: boolean;

    @Column
    budget: number; // For sponsored club creation

    @Column
    frequency: number; // For sponsored club creation

    @Column
    memberPrediction: number; // For sponsored club creation
}
