import React, { useEffect } from 'react'
import Footer from '../components/Footer';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';
import SportsHandballRoundedIcon from '@mui/icons-material/SportsHandballRounded';
import BusinessRoundedIcon from '@mui/icons-material/BusinessRounded';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { useNavigate } from 'react-router';
import useScroll from '../hooks/useScroll';
import { useDispatch, useSelector } from 'react-redux';
import title from '../js/title';
import { setDirectorUser, setUser, setAlumniUser, setStudentUser } from '../redux/slices/UserSlice';
import siteLinks from '../components/siteLinks';
import { FloatButton, Tooltip } from 'antd';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import DialogBox from '../components/DialogBox';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import RichText from '../services/director/reports/academic-audit/inputs/RichText'
import Axios from 'axios'
import Dashboard from '../services/dashboard/pages/Dashboard';
import useUserIsLoggedIn from '../hooks/useUserIsLoggedIn';

const Index = () => {
    let iconProps = { fontSize: '65px', color: '#fc4829', borderRadius: '50%', margin: '10px', padding: '5px', }
    useScroll()
    const users = useSelector(state => state.user)
    const [feedbackModal, setFeedbackModal] = useState(false)
    const [feedback, setFeedback] = useState({ content: '' })
    const [feedbackEmail, setFeedbackEmail] = useState(null)
    useUserIsLoggedIn()
    title("Welcome")

    let serviceList = [
        {
            icon: <PersonRoundedIcon sx={iconProps} />,
            title: 'Faculty Profile',
            phrase: 'Login to the individual Faculty Profile by entering your valid Employee ID and Password.',
            user: users.user ? users.user : null,
            profileUrl: siteLinks.facultyHome.link,
            tokenId: 'faculty-token',
            dispatchFunction: setUser,
            loginUrl: siteLinks.facultyLogin.link,
        },
        {
            icon: <DescriptionRoundedIcon sx={iconProps} />,
            title: 'CAS / PBAS',
            phrase: 'Fill Career Advancement Scheme report of any year and and generate Single or consolidate CAS Report in a click.',
            user: users.user ? users.user : null,
            profileUrl: siteLinks.cas.link,
            dispatchFunction: setUser,
            tokenId: 'faculty-token',
            loginUrl: siteLinks.facultyLogin.link,
        },
        {
            icon: <LocalLibraryRoundedIcon sx={iconProps} />,
            title: 'Director',
            phrase: 'Login to the individual Director Profile by entering your valid allotted Director ID and Password.',
            user: users.directorUser ? users.directorUser : null,
            profileUrl: siteLinks.directorHome.link,
            dispatchFunction: setDirectorUser,
            tokenId: 'director-token',
            loginUrl: siteLinks.directorLogin.link,
        },
        {
            icon: <LocalLibraryRoundedIcon sx={iconProps} />,
            title: 'Administrative & Academic Audit (AAA)',
            phrase: 'Login to the individual Director Profile by entering your valid allotted Director ID and Password.',
            user: users.directorUser ? users.directorUser : null,
            profileUrl: siteLinks.aaa.link,
            tokenId: 'director-token',
            dispatchFunction: setDirectorUser,
            loginUrl: siteLinks.directorLogin.link,
        },

        {
            icon: <SchoolRoundedIcon sx={iconProps} />,
            title: 'Student Profile',
            phrase: 'Login to student profile for giving feedbacks of your school and many different activities.',
            user: users.studentUser ? users.studentUser : null,
            profileUrl: siteLinks.studentHome.link,
            tokenId: 'student-token',
            loginUrl: '/student-login',
            dispatchFunction: setStudentUser
        },
        {
            icon: <BoyRoundedIcon sx={iconProps} />,
            title: 'Alumni Profile',
            phrase: 'Login to Alumni profile for giving feedbacks of your school and many different activities.',
            user: users.alumniUser ? users.alumniUser : null,
            profileUrl: siteLinks.alumniHome.link,
            tokenId: 'alumni-token',
            loginUrl: '/alumni-login',
            dispatchFunction: setAlumniUser

        },
        {
            icon: <DirectionsRunIcon sx={iconProps} />,
            title: 'Training & Placement',
            phrase: 'Login to avail Training & Placement services with your ID and Password.',
            user: users.placement ? users.placement : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/training-and-placement-login'
        },
        {
            icon: <GroupsRoundedIcon sx={iconProps} />,
            title: 'Board of Examination and Evaluation(BoEE)',
            phrase: 'Login to Board of Examination and Evaluation(BoEE)',
            user: users.boee ? users.boee : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/boee-login'
        },
        {
            icon: <AutoStoriesRoundedIcon sx={iconProps} />,
            title: 'Knowledge Resource Center (KRC)',
            phrase: 'Login to the SRTMUN KRC with valid ID & Password',
            user: users.krc ? users.krc : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/library-login'
        },
        {
            icon: <BusinessRoundedIcon sx={iconProps} />,
            title: 'Establishment Department',
            phrase: 'Login to Establishment Department section',
            user: users.establishment ? users.establishment : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/establishment-login'
        },
        {
            icon: <AutoGraphRoundedIcon sx={iconProps} />,
            title: 'Department of Student Development (DSD)',
            phrase: 'Login to Department of Student Development for Student Development related activities.',
            user: users.dsd ? users.dsd : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/dsd-login'
        },
        {
            icon: <GroupsRoundedIcon sx={iconProps} />,
            title: 'National Service Scheme (NSS)',
            phrase: 'Login to National Service Scheme to know more about NSS',
            user: users.nss ? users.nss : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/nss-login'
        },
        {
            icon: <SportsHandballRoundedIcon sx={iconProps} />,
            title: 'Sports Department',
            phrase: 'Login to Sports Department for various Sports related activities & information',
            user: users.sports ? users.sports : null,
            profileUrl: '/UnderDevelopment',
            tokenId: 'faculty-token',
            loginUrl: '/sports-login'
        },


    ]

    const sendFeedback = () => {
        if (feedbackEmail === null || feedbackEmail === '' || feedbackEmail === undefined) {
            toast.error('Please provide your email address')
            return
        }
        else if (feedback.content === '' || feedback.content === null || feedback.content === undefined) {
            toast.error('Please provide a valid feedback')
            return
        }

        let url = `${process.env.REACT_APP_MAIN_URL}/api/userFeedback`
        Axios.post(url, { email: feedbackEmail, feedback: feedback.content }).then((res) => {
            res.data.status === 'success' ? toast.success('Feedback sent successfully') : toast.error(res.data.error)
        }).catch((err) => {
            toast.error('Internal Server Error')
        })

        setFeedbackModal(false)
    }


    return (
        <>
            <div className="w-full mt-4">

                {/* MAIN DIV */}

                <div className='z-30'>
                    <div className={`text-center ${sessionStorage.getItem('animate') === 'false' ? '' : 'main__index__heading'}`}>
                        <p className='text-xs text-gray-500'>Welcome to</p>
                        <h2 className='font-bold text-blue-500 text-3xl md:text-6xl sm:text-4xl gradient'>SRTMUN-UIMS</h2>
                        <p className='text-[#fc4829] md:text-xl sm:text-lg text-base md:w-1/2 sm:w-2/3 text-center mx-auto'>University Information Management System</p>
                    </div>



                </div>


                <div className='mt-5 z-30 '>


                    <div className={`${sessionStorage.getItem('animate') === 'false' ? '' : 'main__cards'}`}>
                        <div className='md:p-5 sm:p-4 p-3 bg-[#8080802e] rounded-lg mt-5'>
                            <Dashboard />
                        </div>
                    </div>


                    <div className={`flex-wrap flex items-center mt-9 justify-between ${sessionStorage.getItem('animate') === 'false' ? '' : 'main__cards'}`}>
                        {serviceList.map((item, index) => {
                            return <MainService data={item} key={index} />
                        })}
                    </div>


                    <div className="mt-40">
                        <Footer />
                    </div>

                </div>



            </div>

            <div>

                <DialogBox title='Share your valuable feedback / suggestion' buttonName='Send Feedback / Suggestion' isModalOpen={feedbackModal} setIsModalOpen={setFeedbackModal} onClickFunction={sendFeedback}>
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label for="feedbackEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" value={feedbackEmail} onChange={(e) => { setFeedbackEmail(e.target.value) }} id="feedbackEmail" placeholder='youremail@example.com' />
                        </div>
                        <RichText setState={setFeedback} state={feedback} note="Write a short note about the Feedback, Suggestion or a Bug" />
                    </form>
                </DialogBox>

                <FloatButton
                    icon={<ForumRoundedIcon sx={{ color: 'blue' }} />}
                    description="FEED BACK"
                    shape="square"
                    style={{ right: 24 }}
                    onClick={() => { setFeedbackModal(true); setFeedbackEmail(null); setFeedback({ content: '' }) }} className='bg-blue-200'
                />
            </div>


        </>
    )
}

export default Index


const MainService = ({ data }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    return (


        <div className="indexCard">
            <div className='indexCardIcon'>
                {data.icon}

            </div>
            <div className='indexCardBody'>
                <div>
                    <p className='indexCardPUp'>{data.title}</p>
                    <p className='indexCardPDown'>{data.phrase}</p>
                </div>
                <div className='indexBtnOuter'>
                    <button onClick={() => {
                        navigate(data.user ? data.profileUrl : data.
                            loginUrl)
                    }} className={`indexBtn ${data.user ? 'indexBtnHalf' : 'indexBtnFull'} duration-200 ease-in-out`}>
                        {data.user ? 'Visit Profile' : 'Login Now'}
                    </button>
                    {data.user && <button onClick={() => {
                        dispatch(data.dispatchFunction(null))
                        localStorage.removeItem(data.tokenId)
                        navigate('/')

                    }} className='indexBtn indexBtnHalf duration-200 ease-in-out' style={{ backgroundColor: "#f88e7b" }}>
                        Logout
                    </button>
                    }
                </div>
            </div>
        </div>


    )
}