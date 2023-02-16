import React, { useState } from 'react'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import PlagiarismRoundedIcon from '@mui/icons-material/PlagiarismRounded';
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded';
import Diversity3RoundedIcon from '@mui/icons-material/Diversity3Rounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import ScienceRoundedIcon from '@mui/icons-material/ScienceRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import VideoChatRoundedIcon from '@mui/icons-material/VideoChatRounded';
import SafetyDividerRoundedIcon from '@mui/icons-material/SafetyDividerRounded';
import PermContactCalendarRoundedIcon from '@mui/icons-material/PermContactCalendarRounded';
import LightbulbRoundedIcon from '@mui/icons-material/LightbulbRounded';
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchSchoolData } from '../js/fetchData';
import { useEffect } from 'react';
import { Skeleton } from '@mui/material';

const dashboardCards = [
    {
        id: 1,
        title: 'Faculties',
        countModelName: 'usersCount',
        color: 'cyan',
        url: `/dashboard/select-department/info`,
        icon: <GroupsRoundedIcon sx={{ color: 'green', fontSize: '45px' }} />
    },
    {
        id: 2,
        title: 'Student',
        countModelName: 'StudentCount',
        color: 'orange',
        url: `/dashboard/select-department/students`,
        icon: <GroupRoundedIcon sx={{ color: 'orange', fontSize: '45px' }} />
    },
    {
        id: 3,
        title: 'Registered Alumni',
        countModelName: 'AlumniCount',
        color: 'cyan',
        url: `/dashboard/select-department/alumni`,
        // url: `/dashboard/alumni-information`,
        icon: <Diversity3RoundedIcon sx={{ color: 'red', fontSize: '45px' }} />
    },
    {
        id: 5,
        title: 'Books & Chapters',
        countModelName: 'BookAndChapterCount',
        color: 'pink',
        icon: <AutoStoriesRoundedIcon sx={{ color: 'purple', fontSize: '45px' }} />
    },
    {
        id: 6,
        title: 'Research Papers',
        countModelName: 'ResearchPaperCount',
        color: 'blue',
        icon: <StickyNote2RoundedIcon sx={{ color: 'darkcyan', fontSize: '35px' }} />
    },
    {
        id: 2,
        title: 'Research Projects',
        countModelName: 'ResearchProjectCount',
        color: 'lime',
        icon: <ScienceRoundedIcon sx={{ color: 'blue', fontSize: '35px' }} />
    },
    {
        id: 3,
        title: 'E-content Developed',
        countModelName: 'EContentDevelopedCount',
        color: 'emerald',
        icon: <LanguageRoundedIcon sx={{ color: 'green', fontSize: '35px' }} />
    },
    {
        id: 4,
        title: 'Patents Published',
        countModelName: 'PatentCount',
        color: 'teal',
        icon: <BookmarkAddedRoundedIcon sx={{ color: 'brown', fontSize: '35px' }} />
    },
    {
        id: 5,
        title: 'Conference Organized',
        countModelName: 'ConferenceOrganizedCount',
        color: 'cyan',
        icon: <VideoChatRoundedIcon sx={{ color: 'DeepPink', fontSize: '35px' }} />
    },
    {
        id: 6,
        title: 'Total Invited Talks ',
        countModelName: 'InvitedTalkCount',
        color: 'fuchsia',
        icon: <LightbulbRoundedIcon sx={{ color: 'fuchsia', fontSize: '35px' }} />
    },
    {
        id: 7,
        title: 'Ph.D. Awarded ',
        countModelName: 'PhdAwardedCount',
        color: 'rose',
        icon: <CardMembershipRoundedIcon sx={{ color: 'MediumVioletRed', fontSize: '35px' }} />
    },
    {
        id: 8,
        title: 'Fellowships ',
        countModelName: 'FellowshipCount',
        color: 'maroon',
        icon: <AttachMoneyRoundedIcon sx={{ color: 'green', fontSize: '35px' }} />
    },

]

const Dashboard = () => {

    const newParam = { school: false }
    const { data, isLoading, isError, } = useQuery([newParam.school, newParam],
        () => { return fetchSchoolData(newParam) })

    useEffect(() => {
        console.log('Data in dashboard is : ', data?.data?.data)
    }, [data])

    return (
        <div>



            {
                data?.data?.data ? <div className='flex items-center justify-between flex-wrap gap-8'>
                    <DashboardCard data={data?.data?.data} />
                </div> : <div className='flex items-center justify-between flex-wrap gap-8'>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                    <div className='flex-auto'> <Skeleton variant="rounded" width={210} height={80} /></div>
                </div>
            }

        </div>
    )
}

export default Dashboard


const DashboardCard = ({ data }) => {
    const navigate = useNavigate()
    return (

        <>

            {
                dashboardCards.map((card, index) => {
                    return <div className={`mt-3 p-3 flex-auto rounded-md cursor-pointer bg-gray-100 duration-200 ease-in-out hover:bg-gray-50`} key={`dashboardCard-${index}`}
                        onClick={() => { card.url && navigate(card.url) }}>
                        <div className='w-full'>
                            <div className='flex items-start justify-start gap-2 flex-col'>
                                <div className='flex items-center justify-start gap-2'>{card.icon} <span className='text-4xl font-bold'>{data[card.countModelName] ? data[card.countModelName] : 0}</span></div>
                                <p className='text-center'>{card.title}</p>
                            </div>
                        </div>
                    </div>
                })
            }

        </>
    )
}