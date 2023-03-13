import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = {
  index: "Sr.No.",
  'userId.username': 'Username',
  'userId.name': 'Faculty Name',
  'userId.department': 'Faculty School',
  programTitle: 'Program Title',
  schoolName: 'School Name',
  fundedBy: 'Funded By',
  isNational: 'National / International',
  noOfParticipants: 'No of Participants',
  year: 'Year',
  proof: "Uploaded Proof"
}

const ConferenceOrganised = ({id, setState, yearFilter, schoolName, Heading}) => {
  const SendReq = 'ConferenceOrganized'
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
    <AdminAcordinTable  Heading={Heading} data={data?.data} SendReq={SendReq} proof='proof' tableHead={tableHead} year='year' module='faculty'  />
  )
}

export default ConferenceOrganised