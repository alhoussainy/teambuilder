import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, ForeignKey, BelongsTo,
} from 'sequelize-typescript';
import {Company} from "./Company";
import { CustomSkillCategory } from './CustomSkillsCategory';
import PositionCustomSkill from './PositionCustomSkill';
import UserCustomSkill from './UserCustomSkill';

@Table
export class CustomSkill extends Model<CustomSkill> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    @Column({ type: DataType.UUID, references: { model: CustomSkillCategory, key: 'id' } })
    @ForeignKey(() => CustomSkillCategory)
    category_id: string; //which company does this post belong to

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

    @BelongsTo(() => CustomSkillCategory)
    Category?: CustomSkillCategory;

    @HasMany(() => UserCustomSkill)
    Users?: UserCustomSkill[];

    @HasMany(() => PositionCustomSkill)
    Positions?: PositionCustomSkill[];
}
