import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasOne, BelongsTo
} from 'sequelize-typescript';
import { User } from './User';
import { PRH_OffboardingStep } from './PRH_OffboardingStep'
import { Company } from './Company';

@Table({
    indexes: [
        {
            unique: false,
            fields: ['user_id', 'offboarding_id'],
        }, 
    ],
})
export class PRH_OffboardingAnswers extends Model<PRH_OffboardingAnswers> {

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;

    @Column({ type: DataType.UUID, references: { model: PRH_OffboardingStep, key: 'id' } })
    @ForeignKey(() => PRH_OffboardingStep)
    offboarding_id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string;

    @Column
    email:string;

    @Column({
        type: DataType.STRING(3000)
    })
    answer:string;
}
