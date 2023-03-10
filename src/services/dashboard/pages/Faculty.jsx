import React from 'react'
import { useParams } from 'react-router-dom'
import GoBack from '../../../components/GoBack'
import Header from '../../../templates/faculty/cas-report/Header'
import Tables from '../../../templates/faculty/faculty-report/Tables'
import Axios from 'axios'
import { useEffect, useState } from 'react'
import title from '../../../js/title'


const Faculty = () => {
    const [academicData, setAcademicData] = useState(null)
    const { userId } = useParams()

    title(academicData ? `${academicData.user?.salutation} ${academicData.user?.name}` : 'Your Faculty Profile')


    // get all the academic data for tables
    useEffect(() => {

        if (userId) {
            const URL = `${process.env.REACT_APP_MAIN_URL}/api/getAllData`
            Axios.post(URL, { userId, fetchYears: 'all' })
                .then((res) => {
                    res.data.status = 'success' ? setAcademicData(res.data.data) : setAcademicData(null)
                }).catch((err) => {
                    return 'Something went wrong...'
                })
        }

    }, [userId])

    return (
        <div>


            {(academicData) && <div>
                <div className='bg-white sticky-top'>
                    <GoBack backUrl={-1} pageTitle={`About ${academicData && `${academicData.user?.salutation} ${academicData.user?.name}`}`} />
                </div>
                <Header user={academicData.user} title="Faculty Report" subTitle={null} directorData={academicData} userType="faculty" showPersonalDetails={false} />
                <Tables academicData={academicData} showProof={false} />
            </div>}
        </div>
    )
}

export default Faculty