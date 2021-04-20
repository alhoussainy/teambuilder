import {
    Table,
    Column,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    DataType,
    BelongsToMany,
    BelongsTo,
    ForeignKey,
    HasMany,
    Unique,
    NotNull,
    AllowNull, HasOne
} from 'sequelize-typescript';
import ClubMember from './ClubMember';
import { Company } from './Company';
import { Hobbies } from './Hobbies';
import { Personality } from './Personality';
import { UserHobbies } from './UserHobbies';
import { UserHighestSkill } from './UserHighestSkill'
import { UserSkills } from './UserSkills';
import { PersonalityCaracteristicAssoc } from './PersonalityCaracteristicAssoc';
import { PersonalityQualityAssoc } from './PersonalityQualityAssoc';
import { PersonalityQuality } from './PersonalityQuality';
import UserCustomSkill from './UserCustomSkill';
import { CustomSkill } from './CustomSkill';
import { UserService } from './UserService';
import { PRH_UserInterview } from './PRH_UserInterview'
import { UserPosition } from './UserPosition';
import { Offboarding } from './Offboarding'
import { UserContractType } from './UserContractType';
import { RHCS_CampaignAnswers } from './RHCS_CampaignAnswers';
import { UserProcessState } from './UserProcessState';


@Table
export class User extends Model<User> {
    @Column({
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
        type: DataType.UUID,
    })
    id: string;

    @Column({ type: DataType.UUID, references: { model: Company, key: 'id' } })
    company_id: string; //which company does this user belong to?

    @Column({ type: DataType.STRING, references: { model: Personality, key: 'id' } })
    tbr_personality: string;

    // @AllowNull(true)
    // @Column({ type: DataType.STRING, references: { model: User, key: 'id' } })
    // @ForeignKey(() => User)
    // ismanager: string;

    @AllowNull(true)
    @Column
    avatar_id: string;

    @AllowNull(false)
    @Column
    last_name: string;

    @AllowNull(false)
    @Column
    first_name: string;

    @AllowNull(false)
    @Column
    phone: string;

    @AllowNull(false)
    @Column({
        unique: true,
    })
    email: string;

    @AllowNull(false)
    @Column
    password: string;

    @AllowNull(false)
    @Column({type : DataType.BIGINT})
    birth_date: number;

    @AllowNull(true)
    @Column({type : DataType.BIGINT})
    arrival_date: number;

    @AllowNull(false)
    @Column
    position: string;

    @AllowNull(false)
    @Column
    qualifications: string;

    @AllowNull(false)
    @Column
    country: string;

    @AllowNull(false)
    @Column
    postal_code: string;
    
    @AllowNull(true)
    @Column
    description: string;
   
    @AllowNull(true)
    @Column
    contact_email: string;

    @AllowNull(true)
    @Column
    linkedin_link: string;

    @AllowNull(true)
    @Column({
        type: DataType.STRING(2)
    })
    language: string;

    @Column
    gender: number; 

    static genderMale = 0;
    static genderFemale = 1;
    static genderOther = 2;
    
    toJSON() {
        const attributes: any = Object.assign({}, this.get());
        attributes.password = undefined;
        return attributes;
    }


    // Relations

    @HasMany(() => UserCustomSkill)
    CustomSkill?:Array<UserCustomSkill>



    @HasMany(() => UserHobbies)
    Hobbies?: Array<UserHobbies>;

    // @HasMany(() => ClubMember)
    // Clubs?: ClubMember[];

    @HasOne(() => UserHighestSkill)
    UserHighestSkill?: UserHighestSkill;

    @HasOne(() => UserService)
    Service?: UserService;

    
    @HasOne(() => UserPosition)
    Position?: UserPosition;

    @HasOne(() => Offboarding)
    Offboarding?: Offboarding;

    @HasOne(() => UserProcessState)
    ProcessState?: UserProcessState;

    // @HasOne(() => User)
    // Manager?: User;

    @HasMany(() => UserSkills)
    Skill?: UserSkills;

    @HasOne(() => UserContractType)
    Contract: UserContractType;

    @BelongsTo(() => Personality, "tbr_personality")
    PersonalityQualityAssoc?: Personality;

    @CreatedAt
    created_at: Date;

    @UpdatedAt
    updated_at: Date;

    @DeletedAt
    deleted_at: Date;

}