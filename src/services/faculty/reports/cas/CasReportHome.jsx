import React, { useEffect, useState } from 'react'
import useAuth from '../../../../hooks/useAuth'
import AcademicScore from './content/AcademicScore'
import Teaching from './content/Teaching'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { IconButton, Tooltip } from '@mui/material'
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { useDispatch, useSelector } from 'react-redux'
import { setCasYear, setFetchYears } from '../../../../redux/slices/CASSlice'
import FinalPage from './content/FinalPage'
import { getCASData, saveEligibilityData } from './CASServices'
import Footer from '../../../../components/Footer'
import Year from '../../../../inputs/Year'
import Bred from '../../../../components/Bred'
import OnlyNav from '../../../../components/OnlyNav'
import StepStatus from '../../../../components/StepStatus'
import title from '../../../../js/title'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import SelectCASYear from './components/SelectCASYear'
import BasicInfo from './content/BasicInfo'
import siteLinks from '../../../../components/siteLinks'
import AgreePopup from './components/AgreePopup'
import ApplyLevel, { stageObj } from './components/ApplyLevel'
import { toast } from 'react-hot-toast';


const CasReportHome = () => {
    useAuth(false)
    const [tabName, setTabName] = useState('level')
    const [casYearState, setCasYearState] = useState(null)
    let links = [{ name: 'Welcome', link: '/' }, { name: 'Home', link: '/faculty' }, { name: 'CAS Report Form', link: '/service/cas-report' }]
    const steps = ['Eligibility', 'Basic Info', 'Select Year', 'Teaching Activities', 'Academic/ Research Score', 'Summary Sheet'];
    title("CAS Report")
    const [serverCasData, setServerCasData] = useState(null)
    const [serverCasError, setServerCasError] = useState(null)
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)
    const fetchYears = useSelector((state) => state.cas.fetchYears)
    const [activeStep, setActiveStep] = React.useState(0);
    const navigate = useNavigate()
    const [saveLoader, setSaveLoader] = useState(false)
    const [teachingData, setTeachingData] = useState({
        checkBoxCount: 0, checkBoxSelected: [], teachingGrade: null, totalClasses: null,
        classesTaught: null, teachingRemark: null, teachingRemarkColor: null, uploadInputs: {
            'file-A': null,
            'file-B': null,
            'file-C': null,
            'file-D': null,
            'file-E': null,
            'file-F': null,
            'file-G': null,
        },

        uploadedAttendance: null,
        selectedAttendance: null

    })
    const [firstYear, setFirstYear] = useState({ day: null, month: null })
    const [lastYear, setLastYear] = useState({ day: null, month: null })
    const [agreePopup, setAgreePopup] = useState(false)
    const [level, setLevel] = useState(null)
    const [eligData, setEligData] = useState({ supervisor: 'Main Supervisor' })
    const [fullCASData, setFullCASData] = useState(null)
    const [supervisor, setSupervisor] = useState('Main Supervisor')


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [tabName])


    const navigateTabs = () => {
        if (tabName === 'intro') {
            setTabName('level')
            handleBack()
        } else if (tabName === 'year') {
            setTabName('intro')
            handleBack()
        } else if (tabName === 'first') {
            setTabName('year')
            handleBack()
        } else if (tabName === 'second') {
            setTabName('first')
            handleBack()
        } else if (tabName === 'final') {
            setTabName('second')
            handleBack()
        }
        else if (tabName === 'saved') {
            setTabName('final')
            handleBack()
        }

    }

    useEffect(() => {
        setServerCasData((prev) => {
            return null
        })
        casYearState && getCASData(user?._id, setServerCasData, setServerCasError, true, casYearState)
    }, [casYearState])

    const verifyDates = () => {
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

        let july = 7
        months.forEach((month, index) => {
            if (firstYear.month === month) {
                if (index + 1 >= july) {
                    let newYear = `${parseInt(casYearState.slice(0, 4)) + 1}-${parseInt(casYearState.slice(5)) + 1}`
                    dispatch(setFetchYears([casYearState, newYear]))
                }
                else {
                    let newYear = `${parseInt(casYearState.slice(0, 4)) - 1}-${parseInt(casYearState.slice(5)) - 1}`
                    dispatch(setFetchYears([newYear, casYearState]))
                }

            }
        })
    }

    const saveEligibility = () => {

        if (level) {

            let shouldAbort = false

            if (level !== 'stage4') {
                // level validations
                stageObj[level].inputData.forEach((item) => {
                    if (eligData[item.name] === undefined || eligData[item.name] === false || eligData[item.name] === '' || eligData[item.name] === null) {
                        shouldAbort = true
                    }
                })

            } else {

                if (
                    (eligData['phdDegree'] === undefined || eligData['phdDegree'] === false || eligData['phdDegree'] === '' || eligData['phdDegree'] === null) || (eligData['isPublication'] === undefined || eligData['isPublication'] === false || eligData['isPublication'] === '' || eligData['isPublication'] === null)
                ) {
                    shouldAbort = true

                }


                if (shouldAbort === false) {
                    if (supervisor === 'Main Supervisor') {
                        if (
                            (eligData['guideProof1'] === undefined || eligData['guideProof1'] === false || eligData['guideProof1'] === '' || eligData['guideProof1'] === null)
                        ) {
                            shouldAbort = true
                        }
                    } else if (supervisor === 'Co-supervisor') {
                        if (
                            (eligData['guideProof1'] === undefined || eligData['guideProof1'] === false || eligData['guideProof1'] === '' || eligData['guideProof1'] === null) || (eligData['guideProof2'] === undefined || eligData['guideProof2'] === false || eligData['guideProof2'] === '' || eligData['guideProof2'] === null)
                        ) {
                            shouldAbort = true
                        }
                    }
                }


            }


            if (shouldAbort === false) {
                saveEligibilityData(level, user?._id, eligData)
                setTabName('intro'); handleNext()
            }
            else {
                toast.error('Complete your Eligibility by filling all the fields below.')
                return
            }


        } else {
            toast.error('Please choose Level')
        }

    }

    useEffect(() => {
        getCASData(user?._id, setFullCASData, setServerCasError, false, casYearState)
    }, [level])




    return (
        <div className="w-full">

            {/* CAS Navtools */}
            <div className='sticky-top bg-white'>
                <OnlyNav user={user} li={[siteLinks.facultyHome, siteLinks.pbas]}
                    logout={{ token: 'faculty-token', link: siteLinks.welcome.link }}>
                    <div className="flex items-center justify-start gap-2">
                        <div className={`${tabName === 'level' ? 'hidden' : 'block'}`}>
                            <IconButton onClick={() => { navigateTabs() }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <div className={`${tabName === 'level' ? 'block' : 'hidden'}`}>
                            <IconButton onClick={() => { navigate(siteLinks.facultyHome.link) }}>
                                <ArrowBackRoundedIcon />
                            </IconButton>

                        </div>
                        <span className="sm:text-sm md:text-lg font-bold">CAS Report Form {casYearState && <span>({casYearState})</span>}</span>

                        {
                            tabName === 'first' || tabName === 'second' || tabName === 'final' ? (saveLoader ? <div className='flex items-center justify-start gap-2 border-l-2 pl-5 ml-7'>
                                <Tooltip placement="bottom" title="Saving...">
                                    <LoadingOutlined style={{ fontSize: 20, }} spin />
                                </Tooltip>
                            </div> : <div className='border-l-2 pl-5 ml-5'>
                                <Tooltip title='Save Progress' placement='bottom'>
                                    <IconButton onClick={() => { setSaveLoader(true) }}>
                                        <SaveRoundedIcon />
                                    </IconButton>
                                </Tooltip>
                            </div>) : null
                        }
                    </div>
                </OnlyNav>
            </div>

            <div className='mt-2 mb-3'>
                <Bred links={[siteLinks.welcome, siteLinks.facultyHome, siteLinks.cas]} />
            </div>
            <div className='mt-3'>
                <StepStatus activeStep={activeStep} steps={steps} />
            </div>

            <div className={`${tabName === 'level' ? 'block' : 'hidden'}`}>
                <form className='w-full' onSubmit={(e) => {
                    e.preventDefault(); saveEligibility()
                }}>
                    <ApplyLevel setLevel={setLevel} level={level} setEligData={setEligData} eligData={eligData} fullCASData={fullCASData} setSupervisor={setSupervisor} supervisor={supervisor} saveEligibilityData={saveEligibilityData} />
                    <div className='flex items-center justify-center'>
                        <SaveButton title={'Save and Proceed'} />
                    </div>
                </form>
            </div>

            {/* BASIC INTRO */}
            <div className={`${tabName === 'intro' ? 'block' : 'hidden'}`}>
                <BasicInfo />

                <div className='mt-5'>
                    <SaveButton title={'Save and Proceed'}
                        onClickFunction={() => { setTabName('year'); handleNext() }} />
                </div>
            </div>




            {/* CONTENT */}

            <div className={`${tabName === 'year' ? 'block' : 'hidden'}`}>
                <div className='mt-3 flex-col items-center justify-center gap-3 w-full text-center h-screen'>

                    <form className='flex flex-col items-center justify-center mt-5' onSubmit={(e) => {
                        e.preventDefault();
                        setAgreePopup(true);
                    }}>
                        <SelectCASYear casYearState={casYearState} setCasYearState={setCasYearState} space='col-md-3' title="Choose CAS Year" lastYear={lastYear} setLastYear={setLastYear} firstYear={firstYear} setFirstYear={setFirstYear} userAllDuration={{ firstYear, lastYear }} />

                        <div className='mt-5'>
                            <SaveButton title={'Save and Proceed'}
                                onClickFunction={() => { verifyDates(); }} />
                        </div>

                    </form>
                    {
                        casYearState && <AgreePopup agreePopup={agreePopup} setAgreePopup={setAgreePopup} setTabName={setTabName} handleNext={handleNext} fetchYears={fetchYears} casYearState={casYearState} duration={{ firstYear, lastYear }} />
                    }
                </div>
            </div>

            <div className={`${tabName === 'first' ? 'block' : 'hidden'}`}>
                <Teaching setTabName={setTabName} tabName={tabName} handleNext={handleNext} serverCasData={serverCasData && serverCasData} casYearState={casYearState} teachingData={teachingData} setTeachingData={setTeachingData} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
            </div>

            <div className={`${tabName === 'second' ? 'block' : 'hidden'}`}>
                <AcademicScore setTabName={setTabName} tabName={tabName} handleNext={handleNext} serverCasData={serverCasData && serverCasData} casYearState={casYearState} teachingData={teachingData} setTeachingData={setTeachingData} saveLoader={saveLoader} setSaveLoader={setSaveLoader} />
            </div>

            <div className={`${tabName === 'final' ? 'block' : 'hidden'}`}>
                <div>
                    <FinalPage casYear={casYearState} handleNext={handleNext} setTabName={setTabName} casYearState={casYearState} setSaveLoader={setSaveLoader} />
                </div>
            </div>


            <Footer />
        </div >
    )
}

export default CasReportHome



const SaveButton = ({ title, onClickFunction, icon = <ArrowForwardRoundedIcon /> }) => {
    return (
        <button className="flex items-center justify-start p-2 rounded-xl text-blue-900 font-bold bg-blue-200 hover:gap-2 duration-200 ease-in-out" type="submit" onClick={onClickFunction}><span className='mr-2'>{title}</span> {icon}</button>
    )
}

export { SaveButton }