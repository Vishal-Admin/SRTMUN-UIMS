import React, { useEffect } from 'react'
import { useQuery } from 'react-query';
import getReq from '../../../components/requestComponents/getReq';
import AdminAcordinTable from '../components/AdminAcordinTable';

const tableHead = {
  index: 'Sr.No.',
  'userId.username': 'Username',
  'userId.name': 'Faculty Name',
  'userId.department': 'Faculty School',
  moduleName: 'Name of the Module / Course developed',
  creationType: 'Type of Creation',
  platform: 'Platform on which the module is developed',
  year: 'Academic Year',
  link: 'Link to the content',
}

const EContentDeveloped = ({id, setState, yearFilter, schoolName, Heading}) => {
 const SendReq = 'EContentDeveloped'
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
      <AdminAcordinTable  Heading={Heading} data={data?.data} SendReq={SendReq} proof="link" tableHead={tableHead} year='year' module='faculty' isLoading={isLoading} />
 )
}

export default EContentDeveloped