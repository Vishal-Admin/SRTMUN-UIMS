import React from 'react'
import { DashbordButtons } from '../components/navcom'
import AdminHeader from './AdminHeader'
import { useSelector } from "react-redux";

import AdminDashboard from "./AdminDashboard"
import AdminFaculty from "./AdminFaculty"
import AdminDirector from "./AdminDirector"
import AdminAlumni from "./AdminAlumni"
import AdminStudent from "./AdminStudent"
import AdminMore from "./AdminMore"


const AdminMain = () => {
  const ComponentSetter = { "Dashboard": <AdminDashboard />, "Faculties": <AdminFaculty />, "Directors": <AdminDirector />, "Alumnis": <AdminAlumni />, "Students": <AdminStudent />, "More": <AdminMore /> }

  // title('SDM | School Data Management')
  const AdminActive = useSelector(state => state.adminActive.adminActive)
  return (<>
    <AdminHeader />

    {
      DashbordButtons?.map(item => item.name === AdminActive ? <div key={item}>{ComponentSetter[item.name]}</div> : null)
    }
  </>)
}

export default AdminMain