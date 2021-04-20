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
import { User } from './User';

@Table
export class Company extends Model<Company> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({
        allowNull: false,
        unique: true
    })
    code: string; //code that the employees can use to register for this company
   
    @Column({
        allowNull: true,
    })
    owner_id: string;

    @Column
    enabled: boolean;

    @Column
    name: string;
    
    @Column
    siret: string;

    @Column
    ceo_firstname: string;

    @Column
    ceo_lastname: string;
    
    @Column
    city: string;
    
    @Column
    address: string;
    
    @Column({
        allowNull: true,
    })
    socialFb: string;
    
    @Column({
        allowNull: true,
    })
    socialIg: string;
    
    @Column({
        allowNull: true,
    })
    socialTw: string;
    
    @Column({
        allowNull: true,
    })
    socialYt: string;
    
    @Column({
        allowNull: true,
    })
    socialLn: string;
    
    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;
}
