// import all the models here

// 1. Faculty Models
const User = require('../models/faculty-models/userModel')
const AppointmentsHeldPrior = require('../models/faculty-models/appointmentsHeldPrior');
const PostHeld = require('../models/faculty-models/postHeld')
const Lectures = require('../models/faculty-models/lectures');
const Online = require('../models/faculty-models/online');
const ResearchProject = require('../models/faculty-models/researchProjects');
const ResearchPaper = require('../models/faculty-models/researchPapers')
const BookAndChapter = require('../models/faculty-models/booksAndChapters')
const ResearchGuidance = require('../models/faculty-models/researchGuidance')
const PhdAwarded = require('../models/faculty-models/phdAwarded')
const JrfSrf = require('../models/faculty-models/jrfsrf')
const AwardRecognition = require('../models/faculty-models/awardAndRecognition')
const Patent = require('../models/faculty-models/patent')
const ConsultancyServices = require('../models/faculty-models/consultancyServices')
const Collaboration = require('../models/faculty-models/collaborations')
const InvitedTalk = require('../models/faculty-models/invitedTalk')
const ConferenceOrganized = require('../models/faculty-models/conferenceOrganized')
const Fellowship = require('../models/faculty-models/fellowship')
const Degree = require('../models/faculty-models/degreeModel')
const Qualification = require('./../models/faculty-models/qualificationModel')
const EContentDeveloped = require('../models/faculty-models/eContentDeveloped')
const PolicyDocuments = require('../models/faculty-models/policyDocuments')
const Experience = require('../models/faculty-models/experienceModel')

// 2. Director Models
const DirectorUser = require('../models/director-models/directorUser');
const Award = require('../models/director-models/awardSchema');
const CounselingAndGuidance = require('../models/director-models/counselingAndGuidanceSchema');
const DemandRatio = require('../models/director-models/demandRatioSchema');
const ProjectsInternships = require('../models/director-models/projectsInternshipsSchema');
const Employability = require('../models/director-models/employabilitySchema');
const ExtensionActivities = require('../models/director-models/extensionActivitysSchema');
const IctClassrooms = require('../models/director-models/ictClassroomsSchema')
const MoUs = require('../models/director-models/moUsSchema')
const ValueAddedCource = require('../models/director-models/valueAddedCourceSchema');
const SkillsEnhancementInitiatives = require('../models/director-models/skillsEnhancementInitiativesSchema');
const StudentSatisfactionSurvey = require('../models/director-models/studentSatisfactionSurveySchema');
const UgcSapCasDstFistDBTICSSR = require('../models/director-models/ugcSapCasDstFistDBTICSSRSchema');
const TrainingProgramsOrganized = require('../models/director-models/trainingProgramsOrganizedSchema');
const ResearchMethodologyWorkshops = require('../models/director-models/researchMethodologyWorkshopsSchema');
const ReservedSeats = require('../models/director-models/reservedSeatsSchema');
const QualifiedExams = require('../models/director-models/qualifiedExamSchema');
const ProgressionToHE = require('../models/director-models/progressionToHESchema');
const Placement = require('../models/director-models/placementSchema');
const SyllabusRevision = require('../models/director-models/syllabusRevisionSchema');
const AlumniContribution = require('../models/director-models/alumniContributionSchema')

// 3. Alumni Models
const Alumni = require('../models/alumni-models/alumniUserSchema')

// 4. Student Models
const Student  = require('../models/student-models/studentUserSchema')

let models = {
    User, Qualification, Degree, AppointmentsHeldPrior, PostHeld, Lectures, Online, ResearchProject, ResearchPaper, BookAndChapter, ResearchGuidance, PhdAwarded, JrfSrf, AwardRecognition, Patent, ConsultancyServices, Collaboration, InvitedTalk, ConferenceOrganized, Fellowship, EContentDeveloped, PolicyDocuments, Experience,
    DirectorUser,Award, MoUs, CounselingAndGuidance, ProgressionToHE, DemandRatio, ProjectsInternships, Employability, ReservedSeats, TrainingProgramsOrganized, UgcSapCasDstFistDBTICSSR, ResearchMethodologyWorkshops, ExtensionActivities, IctClassrooms, SyllabusRevision, Placement, ValueAddedCource, QualifiedExams, SkillsEnhancementInitiatives, StudentSatisfactionSurvey, 
    Alumni, Student, AlumniContribution
}

function feedback(app) {

    app.post('/api/get/dashboardData', function(req, res){
        const {model, filter} = req.body
        models[model].find(filter).sort({ $natural: -1 }).then((data)=>{
            if(data){
                res.send({status : 'success', data : data})
            }else{
                res.send({status : 'error', error : 'Data not found'})
            }
        })
    })

    app.post('/api/get/dashboardCount', async function(req, res){
        const {model, select} = req.body
        const docs = await models[model].find({}).select(select).lean()
        
        if(docs){
            res.send({status : 'success', data : docs})
        }else{
            res.send({status : 'error', error : 'Data not found'})
        }
    })

    app.post('/api/get/allSchoolData', async (req, res) => {

        const {school} = req.body
        const report = {}

        // Note : Count takes the count / length of whole model documents. It does not take the count from filtered variable.

        // get user
        const users = await User.find({})
        report.usersCount = users.length
        
        

        // get alumni
        const alumni = await Alumni.find({})
        report.AlumniCount = alumni.length
        report.Alumni = alumni

        // get alumni
        const student = await Student.find({})
        report.StudentCount = student.length
        report.Student = student

        // get qualifications
        const qualifications = await Qualification.find({}).populate('userId')
        report.QualificationCount = qualifications.length
        if(school){
            report.Qualification = qualifications.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        // get Experience
        const experience = await Experience.find({}).populate('userId')
        report.ExperienceCount = experience.length
        if(school){
            report.Experience = experience.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        // get degrees
        const degrees = await Degree.find({}).populate('userId')
        report.DegreeCount = degrees.length
        if(school){
            report.Degree = degrees.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        // get appointmentsHeldPrior
        const appointmentsHeldPrior = await AppointmentsHeldPrior.find({}).populate('userId')
        report.AppointmentsHeldPriorCount = appointmentsHeldPrior.length
        if(school){
            report.AppointmentsHeldPrior = appointmentsHeldPrior.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        // get post held
        const postHeld = await PostHeld.find({}).populate('userId')
        report.PostHeldCount = postHeld.length
        if(school){
            report.PostHeld = postHeld.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        // get lectures
        const lectures = await Lectures.find({}).populate('userId')
        report.LecturesCount = lectures.length
        if(school){
            report.Lectures = lectures.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        // get online fdp
        const online = await Online.find({}).populate('userId')
        report.OnlineCount = online.length
        if(school){
            report.Online = online.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        // get ResearchProject
        const researchProject = await ResearchProject.find({}).populate('userId')
        report.ResearchProjectCount = researchProject.length
        if(school){
            report.ResearchProject = researchProject.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        // get ResearchProject
        const researchPaper = await ResearchPaper.find({}).populate('userId')
        report.ResearchPaperCount = researchPaper.length
        if(school){
            report.ResearchPaper = researchPaper.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        // get ResearchProject
        const bookAndChapter = await BookAndChapter.find({}).populate('userId')
        report.BookAndChapterCount = bookAndChapter.length
        if(school){
            report.BookAndChapter = bookAndChapter.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        // get ResearchProject
        const researchGuidance = await ResearchGuidance.find({}).populate('userId')
        report.ResearchGuidanceCount = researchGuidance.length
        if(school){
            report.ResearchGuidance = researchGuidance.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        const phdAwarded = await PhdAwarded.find({}).populate('userId')
        report.PhdAwardedCount = phdAwarded.length
        if(school){
            report.PhdAwarded = phdAwarded.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        const jrfSrf = await JrfSrf.find({}).populate('userId')
        report.JrfSrfCount = jrfSrf.length
        if(school){
            report.JrfSrf = jrfSrf.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        const awardRecognition = await AwardRecognition.find({}).populate('userId')
        report.AwardRecognitionCount = awardRecognition.length
        if(school){
            report.AwardRecognition = awardRecognition.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        


        const patent = await Patent.find({}).populate('userId')
        report.PatentCount = patent.length
        if(school){
            report.Patent = patent.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        const consultancyServices = await ConsultancyServices.find({}).populate('userId')
        report.ConsultancyServicesCount = consultancyServices.length
        if(school){
            report.ConsultancyServices = consultancyServices.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        const collaboration = await Collaboration.find({}).populate('userId')
        report.CollaborationCount = collaboration.length
        if(school){
            report.Collaboration = collaboration.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        const invitedTalk = await InvitedTalk.find({}).populate('userId')
        report.InvitedTalkCount = invitedTalk.length
        if(school){
            report.InvitedTalk = invitedTalk.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        const conferenceOrganized = await ConferenceOrganized.find({}).populate('userId')
        report.ConferenceOrganizedCount = conferenceOrganized.length
        if(school){
            report.ConferenceOrganized = conferenceOrganized.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        const fellowship = await Fellowship.find({}).populate('userId')
        report.FellowshipCount = fellowship.length
        if(school){
            report.Fellowship = fellowship.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        const eContentDeveloped = await EContentDeveloped.find({}).populate('userId')
        report.EContentDevelopedCount = eContentDeveloped.length
        if(school){
            report.EContentDeveloped = eContentDeveloped.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        

        const policyDocuments = await PolicyDocuments.find({}).populate('userId')
        report.PolicyDocumentsCount = policyDocuments.length
        if(school){
            report.PolicyDocuments = policyDocuments.filter((doc) => doc.userId !== null && doc.userId.department === school)
        }
        
        res.send({ status: "success", data : report });

    })

    app.post('/api/get/alumniData', async (req, res) => {

        const {school} = req.body
        const report = {}
        const filterForAlumniModel = {schoolName : school}
        const filterForOtherModels = {SchoolName : school}


        // get alumni
        const alumni = await Alumni.find(filterForAlumniModel).sort({ $natural: -1 })
      
        report.AlumniCount = alumni.length
        report.Alumni = alumni
        report.Alumnus = alumni.filter((doc) => doc.userId !== null && doc.gender === 'Male')
        report.Alumna = alumni.filter((doc) => doc.userId !== null && doc.gender === 'Female')


        // get Placement
        const placements = await Placement.find(filterForOtherModels)
        report.PlacementCount = placements.length
        report.Placement = placements

        // get QualifiedExams
        const exams = await QualifiedExams.find(filterForOtherModels)
        report.QualifiedExamsCount = exams.length
        report.QualifiedExams = exams

        // get ProgressionToHE
        const education = await ProgressionToHE.find(filterForOtherModels)
        report.ProgressionToHECount = education.length
        report.ProgressionToHE = education

        // get AlumniContribution
        const contribution = await AlumniContribution.find(filterForOtherModels)
        report.AlumniContributionCount = contribution.reduce((sum, acc)=> sum + acc.Amount_of_contribution, 0)
        report.AlumniContribution = contribution
    

        res.send(({status : 'success', data: report}))
        
    })

}



module.exports = feedback