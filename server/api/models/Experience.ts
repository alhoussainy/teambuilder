import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    ForeignKey,
    AllowNull, BelongsTo, HasMany
} from 'sequelize-typescript';
import { Company } from './Company';
import { User } from './User';


export class Experience extends Model<Experience> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this post belong to

    
    @Column({ type: DataType.UUID, references: { model: User, key: 'id' } })
    @ForeignKey(() => User)
    user_id: string;
    
    // Associations
    @BelongsTo(() => User, 'user_id')
    User?: User;

    @AllowNull(false)
    @Column
    poste: string;

    @AllowNull(false)
    @Column
    company: string;

    @AllowNull(true)
    @Column({ type: DataType.STRING})
    description: string;

    @AllowNull(false)
    @Column
    debut_date: Date;

    @AllowNull(false)
    @Column({ type: DataType.DATE})
    end_date: Date;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
    
}
