import {
    Table,
    Model,
    Column,
    DataType,
    BelongsToMany, NotNull, AllowNull, CreatedAt, UpdatedAt, DeletedAt, HasMany, Length,
} from 'sequelize-typescript';
import { PersonalityEnvironmentAssoc } from './PersonalityEnvironmentAssoc';
import { Personality } from './Personality';

@Table({
    timestamps: false,
})
export class PersonalityEnvironment extends Model<PersonalityEnvironment> {
    @Column({
        defaultValue: DataType.INTEGER,
        primaryKey: true,
        type: DataType.INTEGER,
        autoIncrement: true,
    })
    id: number;

    @Column
    name: string;

    @Column
    name_en: string;
    
    @Column
    name_es: string;
    
    @Column
    isBeneficial: boolean; // Can be good (true) or bad (false)


}
