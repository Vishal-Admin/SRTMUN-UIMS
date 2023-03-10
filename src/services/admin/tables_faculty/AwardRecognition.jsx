import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';
import AdminExcelExoprt from '../components/AdminExcelExoprt';
import AdminTable from '../components/AdminTable';

const tableHead = { index: 'Sr.No.',"userId.username": "Username","userId.name": "Name Of Faculty", "userId.department": "School Of Faculty" , teacherName: 'Name of full-time teachers receiving award', awardYear: 'Award Date', pan: 'PAN', designation: 'Designation', awardName: 'Name of the Award, Fellowship, received', isNat: 'National / International',agencyName:"Award Agency Name",incentive:"Incentives/Type of incentive given by the HEI in recognition of the award",year: "Year", proof: 'Uploaded Proof' }

const AwardRecognition = ({id, setState, yearFilter, schoolName, Heading}) => {
 const SendReq = 'AwardRecognition'
 const module = 'Admin'
 
let condition = schoolName===""? null :{department: schoolName}
let filter = yearFilter === ""? null : {year: yearFilter}

 const params = { model: SendReq, id: '', module, filter: filter, filterConditios: condition}
 
 const { data, isLoading, isError, error, refetch } = useQuery([SendReq, params], () => getReq(params))

 useEffect(() => {
  setState((pri) => {
    return {
        ...pri,
        [id]: data?.data
    }
})
}, [data && data])

 return ( 
  <AdminAcordinTable  Heading= {Heading} data={data?.data} SendReq={SendReq} proof="proof" tableHead={tableHead} year="year" module="faculty" isLoading={isLoading} />
 )
 }
export default AwardRecognition