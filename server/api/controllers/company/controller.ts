import { Request, Response } from 'express';
import { ApiController } from '../api/controller';
import { Company } from '../../models/Company';
import { User } from '../../models/User';
import { Poll } from '../../models/Poll';
import { PollAnswer } from '../../models/PollAnswer';
import { CompanySubscription } from '../../models/CompanySubscription';
import { Like } from '../../models/Like';
import { Comment } from '../../models/Comment';
import { Club } from '../../models/Club';
import { Post } from '../../models/Post';
import { Lunchroulette } from '../../models/Lunchroulette';
import ClubMember from '../../models/ClubMember';


export class Controller extends ApiController {

    async details(req: Request, res: Response): Promise<void> {
        try {
            const company = await Company.findByPk(req.params.id);
            const users = await User.findAll({

                where: {
                    company_id: company.id
                }
            });
            const poll = await Poll.findAll({

                where: {
                    company_id: company.id
                },
                include: [{ model: PollAnswer }]
            });

            const likes = await Like.findAll({

                where: { company_id: company.id }
            })

            const comment = await Comment.findAll({

                where: { company_id: company.id }
            })

            const club = await Club.findAll({

                where: { company_id: company.id },
                include: [{ model: ClubMember }]
            })

            const post = await Post.findAll({
                where: { company_id: company.id }
            })


            const dataset = [];
            const label = ["sondages", "clubs", "commentaires", "publications", "likes par publication"];
            let pubmoyenne = Math.floor((likes.length / post.length));

            dataset.push(poll.length);
            dataset.push(club.length);
            dataset.push(comment.length);
            dataset.push(post.length);
            dataset.push(pubmoyenne)


            super.found(req, res, { company, users, poll, likes, comment, club, post, dataset, label });
        } catch (e) {
            super.error(req, res, 'could not find any company', e);
        }
    }



    async compnayList(req: Request, res: Response): Promise<void> {
        try {
            // Liste des sociétés
            let companyList = [];
            // Stats globales de la page
            let globalStats = {
                totalUsers: 0,
                totalMRR: 0,
                averageMRR: 0,
            }
            let statistiques = [];
            // Chargement de toutes les sociétés en base de données
            const companies = await Company.findAll();
            // Boucle pour chaque société
            for (const company of companies) {
                // Chargement de tous les utilisateurs de la société
                const companyUsers = await User.findAll({
                    where: { company_id: company.id }
                })
                // Chargement de l'abonnement de la société
                const companySubscription = await CompanySubscription.findOne({
                    where: { company_id: company.id }
                })
                const likes = await Like.findAll({
                    where: { company_id: company.id }
                })

                const comment = await Comment.findAll({
                    where: { company_id: company.id }
                })

                const club = await Club.findAll({
                    where: { company_id: company.id }
                })
                const clubmember = await ClubMember.findAll({
                    where: { company_id: company.id }
                })
                const post = await Post.findAll({
                    where: { company_id: company.id }
                })
                const lunchroulette = await Lunchroulette.findAll({
                    where: { company_id: company.id }
                })
                const poll = await Poll.findAll({
                    where: { company_id: company.id },
                    include: [{ model: PollAnswer }]
                })
                let answers = []
                for (const pol of poll) {
                    answers.push(pol.Answers)
                }
                const pollanswer = await PollAnswer.findAll({
                    where: {
                        company_id: company.id
                    }
                });
                // Calcul du taux d'activité du reseau social pour chaque entreprise
                let socialmedia = {
                    nblike: null,
                    nbcomment: null,
                    nbclub: null,
                    nbpoll: null,
                    nbpollanswer: null,
                    nblunch: null,
                    nbpost: null,
                    nbclubmember: null,
                    tauxDeReponseParentreprise: [],
                    tauxGlobal: null,
                    nbcompanies: null,
                    nbUsers: null,
                }
                socialmedia.nbUsers = companyUsers.length;
                socialmedia.nbcompanies = companies.length;
                socialmedia.nblike = likes.length;
                socialmedia.nbcomment = comment.length;
                socialmedia.nbclub = club.length;
                socialmedia.nbclubmember = clubmember.length;
                socialmedia.nbpost = post.length;
                socialmedia.nbpoll = poll.length;
                socialmedia.nbpollanswer = pollanswer.length;
                socialmedia.nblunch = lunchroulette.length;
                // Création d'un objet correspond au détails à afficher sur l'app angular
                let companyInfo = {
                    name: null,
                    userAmount: null,
                    monthlyMRR: null,
                    createdSince: null,
                    active: null,
                    companyId: null,
                    SocialMediaActivity: null,
                    nbPolls: null,
                    pollAnswersRate: null
                }
                // Attribution du nom de la société

                let dateDebut = company.created_at.getTime();
                let dateFin = new Date().getTime();
                const diffTime = Math.abs(dateFin - dateDebut);
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                companyInfo.createdSince = diffDays;
                companyInfo.name = company.name;
                companyInfo.companyId = company.id
                companyInfo.nbPolls = poll.length;

                // Attribution du nombre d'utilisateurs
                let userAmount = companyUsers.length;
                companyInfo.userAmount = userAmount
                globalStats.totalUsers += userAmount;

                socialmedia.tauxDeReponseParentreprise = answers.map(elem => (elem.length / companyInfo.userAmount) * 100);

                socialmedia.tauxGlobal = socialmedia.tauxDeReponseParentreprise.reduce((prev, next) => {
                    return prev + next
                }, 0)
                companyInfo.pollAnswersRate = (socialmedia.tauxGlobal / socialmedia.tauxDeReponseParentreprise.length).toFixed(2)

                const tauxprev = (((socialmedia.nbpost * 0.3)
                    + (socialmedia.nbcomment * 0.3)
                    + (socialmedia.nblike * 0.3)
                    + (socialmedia.nblunch)
                    + (socialmedia.nbclub * 0.5)
                    + (socialmedia.nbclubmember * 0.5)) / (0.3 + 0.3 + 0.3 + 0.5 + 0.5))

                companyInfo.SocialMediaActivity = tauxprev.toFixed(2)

                // Si la société est en subscription active (true) alors son chiffre d'affaire mensuel est de 6€ fois le nombre d'utilisateur
                // Sinon il est de 0€
                if (companySubscription.active) {
                    companyInfo.monthlyMRR = userAmount * 6;
                    companyInfo.active = true;
                    // Addition à la statistique globale
                    globalStats.totalMRR += userAmount * 6;
                    globalStats.averageMRR = (globalStats.totalMRR / companyInfo.monthlyMRR)
                } else {
                    companyInfo.monthlyMRR = 0;
                    companyInfo.active = false;
                }
                // Une fois les données récupérées, je push les informations de CETTE société dans mon tableau companyList
                companyList.push(companyInfo)
                statistiques.push(socialmedia)
            }

            super.found(req, res, { globalStats, companyList, statistiques });
        } catch (e) {
            super.error(req, res, 'could not load questions : ', e);
        }
    }

}
export default new Controller();
