import React from 'react'
import AdminDashboard from "./AdminDashboard"
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LocalLibraryRoundedIcon from '@mui/icons-material/LocalLibraryRounded';
import SchoolRoundedIcon from '@mui/icons-material/SchoolRounded';
import BoyRoundedIcon from '@mui/icons-material/BoyRounded';
import MoreIcon from '@mui/icons-material/More';
import { DashbordButtons } from '../components/navcom';
import { useDispatch, useSelector } from 'react-redux';
import { setAdminActive} from '../../../redux/slices/AdminActiveSlice'

 

const AdminDrower = ({children}) => {
 const iconsSetter ={"Dashboard":<CollectionsBookmarkIcon/>, "Facultys":<PersonRoundedIcon />, "Directors": <LocalLibraryRoundedIcon />, "Alumnis": <BoyRoundedIcon />, "Students": <SchoolRoundedIcon />, "More": <MoreIcon/>}


 
 const dispatch = useDispatch();
 const AdminActive = useSelector(state => state.adminActive.adminActive)
  console.log(AdminActive)
  return (

    <>
      <div className='col-12'  style={{ height: "auto",display:'flex', }}>
      <div className='sidebar-admin-drower'>
        {
        DashbordButtons?.map(button =><button onClick={() => {dispatch(setAdminActive(button.name))}} className={`DashbordButtons ${AdminActive===button.name?'active':null}`}><span style={{paddingRight: "10px"}}>{iconsSetter[button.name]}</span>{button.title}</button>)
        }
      </div>
      {/* {<AdminDashboard/>} */}
      
      {
        children
      }
      
    </div>
    
    </>
    
        
    
  )
}

export default AdminDrower