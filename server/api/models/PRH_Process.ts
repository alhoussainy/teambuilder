import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    ForeignKey,
    AllowNull, BelongsTo, HasMany, Length, HasOne
} from 'sequelize-typescript';

import { Company } from './Company';
import { PRH_BeforeFirstDayStep } from './PRH_BeforeFirstDayStep';
import { PRH_FirstDayStep } from './PRH_FirstDayStep'
import { PRH_PostDepartureStep } from './PRH_PostDepartureStep'
import { PRH_OffboardingStep } from './PRH_OffboardingStep'
import { PRH_AmazementReportStep } from './PRH_AmazementReportStep'
import { PRH_InterviewStep } from './PRH_InterviewStep'
 
export class PRH_Process extends Model<PRH_Process> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    // Associations

    @ForeignKey(() => PRH_BeforeFirstDayStep)
    @Column({ type: DataType.UUID, references: { model: PRH_BeforeFirstDayStep, key: 'id' } })
    beforeFirstDay_id: string;

    @ForeignKey(() => PRH_FirstDayStep)
    @Column({ type: DataType.UUID, references: { model: PRH_FirstDayStep, key: 'id' } })
    firstDay_id: string;

    @ForeignKey(() => PRH_AmazementReportStep)
    @Column({ type: DataType.UUID, references: { model: PRH_AmazementReportStep, key: 'id' } })
    amazementReport_id: string;

    @ForeignKey(() => PRH_InterviewStep)
    @Column({ type: DataType.UUID, references: { model: PRH_InterviewStep, key: 'id' } })
    interview_id: string;

    @ForeignKey(() => PRH_OffboardingStep)
    @Column({ type: DataType.UUID, references: { model: PRH_OffboardingStep, key: 'id' } })
    offboarding_id: string;
    
    @ForeignKey(() => PRH_PostDepartureStep)
    @Column({ type: DataType.UUID, references: { model: PRH_PostDepartureStep, key: 'id' } })
    postDeparture_id: string;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;    
}