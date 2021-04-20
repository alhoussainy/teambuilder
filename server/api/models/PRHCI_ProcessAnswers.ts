import {
    Table,
    ForeignKey,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsToMany, DataType, HasOne, BelongsTo, AllowNull
} from 'sequelize-typescript';
import { Company } from './Company';
import { PRHCI_Process } from './PRHCI_Process';
import { PRHCI_SetQuestion } from './PRHCI_SetQuestion';
import { User } from './User'

@Table({
    indexes: [
        {
            unique: false,
            fields: ['question_id', 'process_id'],
        }, 
    ],
})
export class PRHCI_ProcessAnswers extends Model<PRHCI_ProcessAnswers> {

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; 

    @Column({ type: DataType.UUID, references: { model: PRHCI_SetQuestion, key: 'id' } })
    @ForeignKey(() => PRHCI_SetQuestion)
    question_id: string;

    @Column({ type: DataType.UUID, references: { model: PRHCI_Process, key: 'id' } })
    @ForeignKey(() => PRHCI_Process)
    process_id: string;

    @AllowNull(true)
    @Column
    answer_type: number

    @AllowNull(true)
    @Column({
        type: DataType.STRING(5000)
    })
    answer_string:string

    @AllowNull(true)
    @Column
    answer_number:number

    @AllowNull(true)
    @Column
    answer_boolean:boolean

    @Column
    step:number

    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    answerer_id: string;  
    
    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @BelongsTo(() => PRHCI_Process)
    Process: PRHCI_Process;

}