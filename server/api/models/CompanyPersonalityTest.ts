import { Allow } from 'class-validator';
import {
    Column,
    CreatedAt,
    UpdatedAt,
    Model,
    DeletedAt,
    DataType,
    BelongsToMany,
    Table,
    HasMany,
    ForeignKey,
    BelongsTo, AllowNull,
} from 'sequelize-typescript';
import { Company } from './Company';
import { Personality } from './Personality';

@Table({
    paranoid: true
})
export class CompanyPersonalityTest extends Model<CompanyPersonalityTest> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; 

    @Column({ unique: true })
    email: string;

    @Column({ unique: true })
    token: string;

    @Column({ type : DataType.BOOLEAN })
    isSubmitted: boolean;

    @AllowNull
    @Column({ type: DataType.STRING, references: { model: Personality, key: 'id' } })
    result: string;
    
    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
