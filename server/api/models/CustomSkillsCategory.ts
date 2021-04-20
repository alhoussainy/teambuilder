import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany,
} from 'sequelize-typescript';
import {Company} from "./Company";
import { CustomSkill } from './CustomSkill';
import UserCustomSkill from './UserCustomSkill';

@Table
export class CustomSkillCategory extends Model<CustomSkillCategory> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; 

    @Column
    name: string;

    @Column({defaultValue:false})
    excludedSearch: boolean;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

    @HasMany(() => CustomSkill)
    CustomSkills?: CustomSkill[];
}
