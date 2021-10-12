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
export class PersonalityEnvironmentDetail extends Model<PersonalityEnvironmentDetail> {
    @Column({
        defaultValue: DataType.STRING,
        primaryKey: true,
        type: DataType.STRING
    })
    id: string;
    
    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description: string;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_en: string;
    
    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_es: string;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_as_employee: string;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_as_employee_en: string;
    
    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_as_employee_es: string;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_as_colleague: string;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_as_colleague_en: string;
    
    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_as_colleague_es: string;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_as_manager: string;

    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_as_manager_en: string;
    
    @AllowNull(true)
    @Column({
        type: DataType.TEXT
    })
    description_as_manager_es: string;
}
