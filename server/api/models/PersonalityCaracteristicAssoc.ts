import {
    Table,
    ForeignKey,
    Model,
    Column,
    BelongsToMany, DataType, HasMany, BelongsTo
} from 'sequelize-typescript';
import { PersonalityCaracteristics } from './PersonalityCaracteristics';
import { PersonalityType } from './PersonalityType';

@Table({
    timestamps: false,
    indexes: [
        {
            unique: true,
            fields: ['type_id', 'caracteristic_id'],
        },
    ],
})
export class PersonalityCaracteristicAssoc extends Model<PersonalityCaracteristicAssoc> {

    @Column({ type: DataType.INTEGER, references: { model: PersonalityType, key: 'id' } })
    @ForeignKey(() => PersonalityType)
    type_id: number;

    @Column({ type: DataType.INTEGER, references: { model: PersonalityCaracteristics, key: 'id' } })
    @ForeignKey(() => PersonalityCaracteristics)
    caracteristic_id: number;

    @BelongsTo(() => PersonalityCaracteristics)
    PersonalityCaracteristics?: PersonalityCaracteristics[];

    @BelongsTo(() => PersonalityType)
    PersonalityType?: PersonalityType[];
}
