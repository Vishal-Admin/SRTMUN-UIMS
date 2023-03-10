import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import getReq from '../../../components/requestComponents/getReq'
import AdminAcordinTable from '../components/AdminAcordinTable';
import AdminExcelExoprt from '../components/AdminExcelExoprt'
import AdminTable from '../components/AdminTable'

const tableHead = { index: 'Sr.No.', "userId.username": "Username", "userId.name": "Name Of Faculty", "userId.department": "School Of Faculty", exam: 'Exams', institute: 'Institute/Boards', year: 'Year', percentage: 'Percentage', subjects: 'Subjects', }

const Qualification = ({id, setState, yearFilter, schoolName}) => {

  const SendReq = "Qualification"
  const module = "Admin"
  
  let condition = schoolName===""? null :{department: schoolName}

  const params = { model: SendReq, id: "", module, filterConditios: condition }

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
    <AdminAcordinTable  Heading='Qualification' data={data?.data} SendReq={SendReq} tableHead={tableHead} module='faculty' isLoading={isLoading} />
    
  )
}
export default Qualification