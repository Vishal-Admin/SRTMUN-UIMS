import { Avatar } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import serverLinks from '../js/serverLinks'
import siteLinks from './siteLinks'

const LoggedInUsers = () => {

    const users = useSelector((state) => state.user)

    useEffect(() => {
        console.log('Users :', users)
    }, [users])

    const navigate = useNavigate()

    const redirectLinks = {
        user: { homeLink: siteLinks.facultyHome.link, serviceName: 'faculty' },
        directorUser: { homeLink: siteLinks.directorHome.link, serviceName: 'director' },
        studentUser: { homeLink: siteLinks.studentHome.link, serviceName: 'student' },
        alumniUser: { homeLink: siteLinks.alumniHome.link, serviceName: 'faculty' },
        proUser: { homeLink: siteLinks.proHome.link, serviceName: 'news' },
    }

    return (
        <div>
            {
                users && <div className="text-center bg-gray-100 rounded-md border py-1 px-3 inline-block w-[auto] mx-auto">
                    <div className='flex items-center justify-center gap-2'>

                        {
                            Object.keys(users).map((serviceName) => {
                                return users[serviceName] && <div className='cursor-pointer'
                                    onClick={() => navigate(redirectLinks[serviceName].homeLink)}>
                                    <Avatar src={serverLinks.showFile(users[serviceName]?.photoURL, redirectLinks[serviceName].serviceName)} sx={{ fontSize: '15px' }} />
                                </div>
                            })
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default LoggedInUsers