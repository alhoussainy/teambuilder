import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasOne, BelongsTo
} from 'sequelize-typescript';
import { User } from './User';
import { CustomSkill } from './CustomSkill';
import { CompanyPost } from './CompanyPost';

@Table({
    indexes: [
        {
            unique: true,
            fields: ['position_id', 'customskill_id'],
        },
    ],
})
export default class PositionCustomSkill extends Model<PositionCustomSkill> {

    @Column({ type: DataType.UUID, references: { model: CompanyPost, key: 'id' } })
    @ForeignKey(() => CompanyPost)
    position_id: string;

    @Column({ type: DataType.UUID, references: { model: CustomSkill, key: 'id' } })
    @ForeignKey(() => CustomSkill)
    customskill_id: string;

    @BelongsTo(() => CustomSkill)
    CustomSkill?: CustomSkill[];
    
    @BelongsTo(() => CompanyPost)
    CompanyPost?: CompanyPost[];
}
