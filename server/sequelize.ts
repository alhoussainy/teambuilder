import { Sequelize } from 'sequelize-typescript';
import config from './common/config';
import { User } from './api/models/User';
import { Company } from './api/models/Company';
import { Post } from './api/models/Post';
import { Club } from './api/models/Club';
import { Like } from './api/models/Like';
import { Comment } from './api/models/Comment';
import ClubMember from './api/models/ClubMember';
import { Storage } from "./api/models/Storage";
import { Poll } from "./api/models/Poll";
import { Notification } from "./api/models/Notification";
import { PollOption } from "./api/models/PollOption";
import { PollAnswer } from "./api/models/PollAnswer";
import { Lunchroulette } from "./api/models/Lunchroulette";
import { Lunchrouletteuser } from "./api/models/Lunchrouletteuser";
import { LunchRouletteMessages } from './api/models/LunchRouletteMessages';
import { UserMessages } from './api/models/UserMessages';
import { Personality } from './api/models/Personality';
import { PersonalityCaracteristics } from './api/models/PersonalityCaracteristics';
import { PersonalityEnvironment } from './api/models/PersonalityEnvironment';
import { PersonalityIdealPosition } from './api/models/PersonalityIdealPosition';
import { PersonalityQuality } from './api/models/PersonalityQuality';
import { PersonalitySubType } from './api/models/PersonalitySubType';
import { PersonalityType } from './api/models/PersonalityType';
import { PersonalityQualityAssoc } from './api/models/PersonalityQualityAssoc';
import { PersonalityCaracteristicAssoc } from './api/models/PersonalityCaracteristicAssoc';
import { PersonalityEnvironmentAssoc } from './api/models/PersonalityEnvironmentAssoc';
import { PersonalityIdealpositionAssoc } from './api/models/PersonalityIdealpositionAssoc';
import { PersonalityQuizzQuestions } from './api/models/PersonalityQuizzQuestions';
import { PersonalityQuizzUserAnswers } from './api/models/PersonalityQuizzUserAnswers';
import { UserHighestSkill } from './api/models/UserHighestSkill';
import { Skills } from './api/models/Skills';
import { UserSkills } from './api/models/UserSkills';
import { Hobbies } from './api/models/Hobbies';
import { UserHobbies } from './api/models/UserHobbies';
import { LandingNewsletter } from './api/models/LandingNewsletter';
import { CompanySubscription } from './api/models/CompanySubscription';
import { CompanyInvitedUsers } from './api/models/CompanyInvitedUsers';
import { CustomSkill } from './api/models/CustomSkill';
import UserCustomSkill from './api/models/UserCustomSkill';
import { Experience } from './api/models/Experience';
import { Service } from './api/models/Service';
import { UserService } from './api/models/UserService';
import { LandingNewsletterEbook } from './api/models/LandingNewsletterEbook';
import { File } from './api/models/File';
import { UserFile } from './api/models/UserFile';
import { PRH_Process } from './api/models/PRH_Process'
import { PRH_ProcessCompany } from './api/models/PRH_ProcessCompany'
import { PRH_BeforeFirstDayStep } from './api/models/PRH_BeforeFirstDayStep'
import { PRH_Items } from './api/models/PRH_Items';
import { PRH_FirstDayStep } from './api/models/PRH_FirstDayStep'
import { PRH_PostDepartureStep } from './api/models/PRH_PostDepartureStep';
import { PRH_OffboardingStep } from './api/models/PRH_OffboardingStep';
import { PRH_AmazementReportStep } from './api/models/PRH_AmazementReportStep';
import { PRH_AmazementReportQuestion } from './api/models/PRH_AmazementReportQuestion'
import { PRH_AmazementReportAnswer } from './api/models/PRH_AmazementReportAnswer'
import { PRH_InterviewStep } from './api/models/PRH_InterviewStep'
import { PRH_UserInterview } from './api/models/PRH_UserInterview'
import { PRH_InterviewRhQuestion } from './api/models/PRH_InterviewRhQuestion'
import { PRH_InterviewQuestionAnswer } from './api/models/PRH_InterviewQuestionAnswer'
import { Filiere } from './api/models/Filiere';
import { CompanyPersonalityTest } from './api/models/CompanyPersonalityTest';
import { PersonalityQuizzWebAnswers } from './api/models/PersonalityQuizzWebAnswers';
import { FRH_CheckListTask } from './api/models/FRH_CheckListTask';
import { FRH_PostCheckList } from './api/models/FRH_PostCheckList';
import { FRH_UserDoneTask } from './api/models/FRH_UserDoneTask';
import { CompanyPost } from './api/models/CompanyPost';
import { UserPosition } from './api/models/UserPosition';
import { Offboarding } from './api/models/Offboarding';
import { PRH_OffboardingSurvey } from './api/models/PRH_OffboardingSurvey';
import { CompanyQuicklink } from './api/models/CompanyQuicklink';
import { ContractType } from './api/models/ContractType';
import { UserContractType } from './api/models/UserContractType';
import { UserManager } from './api/models/UserManager';
import { PRH_InterviewQuestionsCategory } from './api/models/PRH_InterviewQuestionsCategory';
import { PRH_OffboardingAnswers } from './api/models/PRH_OffboardingAnswers';
import { RelationScore } from './api/models/RelationScore';
import { RHCS_Model } from './api/models/RHCS_Models';
import { RHCS_Campaign } from './api/models/RHCS_Campaign';
import { RHCS_ModelQuestions } from './api/models/RHCS_ModelQuestions';
import { RHCS_ModelQuestionsOptions } from './api/models/RHCS_ModelQuestionsOptions';
import { RHCS_CampaignAnswers } from './api/models/RHCS_CampaignAnswers';
import { RHCS_CompaignUsers } from './api/models/RHCS_CampaignUsers';
import { FileCategory } from './api/models/FileCategory';
import { UserProcessState } from './api/models/UserProcessState';
import { PRH_InterviewGoals } from './api/models/PRH_InterviewGoals';
import { PRH_InterviewGoalsAnswers } from './api/models/PRH_InterviewGoalsAnswers';
import { OnesignalUsers } from './api/models/OnesignalUsers';
import { EnvironnementScore } from './api/models/EnvironnementScore';
import { EnvironnementScoreDetail } from './api/models/EnvironnementScoreDetail';
import { PersonalityEnvironmentDetail } from './api/models/PersonalityEnvironmentDetail';
import { CustomSkillCategory } from './api/models/CustomSkillsCategory';
import PositionCustomSkill from './api/models/PositionCustomSkill';
import { PRHCI_QuestionSet } from './api/models/PRHCI_QuestionSet';
import { PRHCI_SetQuestion } from './api/models/PRHCI_SetQuestion';
import { PRHCI_Interview } from './api/models/PRHCI_Interview';
import { PRHCI_InterviewSet } from './api/models/PRHCI_InterviewSet';
import { PRHCI_Process } from './api/models/PRHCI_Process';
import { PRHCI_ProcessAnswers } from './api/models/PRHCI_ProcessAnswers';
import { PRHCI_QuestionOption } from './api/models/PRHCI_QuestionOption';
import { BlogArticle } from './api/models/BlogArticle';

const sequelize = new Sequelize({
    repositoryMode: false,
    database: config.db_database,
    dialect: config.db_dialect,
    username: config.db_user,
    password: config.db_password,
    host: config.db_host,
    logging: false,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    }
    // models: [__dirname + '/api/models'],
});

sequelize.addModels([
    BlogArticle,
    PersonalityType,
    Personality,
    Company,
    User,
    Club,
    Filiere,
    Post,
    Comment,
    Like,
    ClubMember,
    Storage,
    Poll,
    PollOption,
    PollAnswer,
    Lunchroulette,
    Lunchrouletteuser,
    LunchRouletteMessages,
    Notification,
    UserMessages,
    PersonalityCaracteristics,
    PersonalityEnvironment,
    PersonalityIdealPosition,
    PersonalityQuality,
    PersonalityQualityAssoc,
    PersonalityCaracteristicAssoc,
    PersonalityEnvironmentAssoc,
    PersonalityIdealpositionAssoc,
    PersonalityQuizzQuestions,
    PersonalityQuizzUserAnswers,
    CompanyPersonalityTest,
    PersonalityQuizzWebAnswers,
    Skills,
    ContractType,
    Hobbies,
    UserProcessState,
    UserHighestSkill,
    UserHobbies,
    UserSkills,
    UserContractType,
    LandingNewsletter,
    CompanySubscription,
    CompanyInvitedUsers,
    Service,
    CompanyPost,
    CustomSkillCategory,
    CustomSkill,
    PositionCustomSkill,
    UserCustomSkill,
    Experience,
    UserService,
    LandingNewsletterEbook,
    FileCategory,
    File,
    UserFile,
    UserPosition,
    PRH_BeforeFirstDayStep,
    PRH_Items,
    PRH_FirstDayStep,
    PRH_AmazementReportStep,
    PRH_AmazementReportQuestion,
    PRH_AmazementReportAnswer,
    PRH_InterviewStep,
    PRH_UserInterview,
    PRH_InterviewQuestionsCategory,
    PRH_InterviewRhQuestion,
    PRH_InterviewQuestionAnswer,
    PRH_OffboardingStep,
    PRH_PostDepartureStep,
    PRH_Process,
    PRH_ProcessCompany,
    PRH_OffboardingSurvey,
    PRH_OffboardingAnswers,
    PRH_InterviewGoals,
    PRH_InterviewGoalsAnswers,
    FRH_PostCheckList,
    FRH_CheckListTask,
    FRH_UserDoneTask,
    Offboarding,
    CompanyQuicklink,
    UserManager,
    RelationScore,
    RHCS_Model,
    RHCS_ModelQuestions,
    RHCS_ModelQuestionsOptions,
    RHCS_Campaign,
    RHCS_CampaignAnswers,
    RHCS_CompaignUsers,
    OnesignalUsers,
    EnvironnementScore,
    EnvironnementScoreDetail,
    PersonalityEnvironmentDetail,
    PRHCI_QuestionSet,
    PRHCI_SetQuestion,
    PRHCI_QuestionOption,
    PRHCI_Interview,
    PRHCI_InterviewSet,
    PRHCI_Process,
    PRHCI_ProcessAnswers,


]);

export default sequelize;
