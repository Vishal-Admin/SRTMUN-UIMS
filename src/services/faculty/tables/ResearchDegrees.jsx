import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import submit, { submitWithFile } from '../js/submit';
import refresh from '../js/refresh';
import Actions from './Actions';
import View from './View';
import handleEditWithFile from '../js/handleEditWithFile';
import { useQuery } from 'react-query';
import Loader from '../../../components/Loader';
import EmptyBox from '../../../components/EmptyBox';
import FormWrapper from '../components/FormWrapper';
import { Dialog, DialogContent } from '@mui/material';
import BulkExcel from '../../../components/BulkExcel';
import sortByAcademicYear from '../../../js/sortByAcademicYear';


const ResearchDegrees = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()
    const [res, setRes] = useState('')
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    //states

    const [degreeName, setDegreeName] = useState('')
    const [title, setTitle] = useState('')
    const [subject, setSubject] = useState('')
    const [university, setUniversity] = useState('')
    const [awardDate, setAwardDate] = useState('')
    const [degree, setDegree] = useState(null)
    const [degreeModal, setDegreeModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    // add new content
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('degreeName', degreeName)
        formData.append('title', title)
        formData.append('university', university)
        formData.append('awardDate', awardDate)
        formData.append('userId', user._id)
        formData.append('file', degree)
        formData.append('subject', subject)

        // upload degree
        submitWithFile(formData, 'Degree', refetch, setLoading, setDegreeModal, setIsFormOpen)

    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)

        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('degreeName', degreeName)
        formData.append('title', title)
        formData.append('university', university)
        formData.append('awardDate', awardDate)
        formData.append('file', degree)
        formData.append('subject', subject)

        handleEditWithFile(formData, 'Degree', setEditModal, refetch, setLoading, setIsFormOpen)


    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setDegreeName(item.degreeName)
                setTitle(item.title)
                setUniversity(item.university)
                setAwardDate(item.awardDate)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setDegreeName('')
        setTitle('')
        setUniversity('')
        setAwardDate('')
        setDegree(null)

    }

    let param = { model: 'Degree', userId: user._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))


    return (
        <div className="">


            {/* // HEADER */}


            <Header exceldialog={setOpen} add="Degree" editState={setEditModal} clearStates={clearStates} state={setDegreeModal} icon={<WorkspacePremiumIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Your Research Degree(s)" />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='DegreeFaculty' title='Research Degrees' SendReq='Degree' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />
            {/* // 2. FIELDS */}

            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setDegreeModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit Research Degree' : 'Add New Research Degree'}</p>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom01" className="form-label">Research Degree</label>
                            <input type="text" value={degreeName} onChange={(e) => { setDegreeName(e.target.value) }} className="form-control" id="validationCustom01" required />

                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Title</label>
                            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} className="form-control" id="validationCustom02" required />

                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">Subject</label>
                            <input type="text" value={subject} onChange={(e) => { setSubject(e.target.value) }} className="form-control" id="validationCustom02" required />
                        </div>

                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label">University</label>
                            <input type="text" value={university} onChange={(e) => { setUniversity(e.target.value) }} className="form-control" id="validationCustom02" required />

                        </div>


                        <div className="col-md-4">
                            <label htmlFor="validationCustom03" className="form-label">Award Date</label>
                            <input type="text" value={awardDate} onChange={(e) => { setAwardDate(e.target.value) }} className="form-control" id="validationCustom03" required />

                        </div>

                        <div className="col-md-4">
                            <label htmlFor="inputGroupFile01" className="form-label">Upload Degree<p className='text-sm text-gray'>{editModal ? "(Your previously uploaded degree is available, if you want to replace it with new one, please select)" : ""}</p></label>
                            <input type="file" name="file" onChange={(e) => { setDegree(e.target.files[0]); }} className="form-control" id="inputGroupFile01" />
                        </div>

                    </FormWrapper>
                </DialogContent>
            </Dialog>



            {/* // TABLE OF QUALIFICATIONS */}

            <div className='mt-2 overflow-auto change__scrollbar text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col">Sr.</th>
                            <th scope="col">Research Degree</th>
                            <th scope="col">Title</th>
                            <th scope="col">Subject</th>
                            <th scope="col">University</th>
                            <th scope="col">Award Year</th>
                            <th scope="col">Degree</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>

                    {data && sortByAcademicYear(data?.data?.data, 'year').map((item, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{item.degreeName}</td>
                                    <td>{item.title}</td>
                                    <td>{item.subject}</td>
                                    <td>{item.university}</td>
                                    <td>{item.awardDate}</td>
                                    <td>
                                        <View proof={item.proof} />
                                    </td>
                                    <td>
                                        <Actions item={item} model="Degree" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setDegreeModal} />
                                    </td>
                                </tr>
                            )
                        })
                        }

                    </tbody>
                </table>
                {
                    isLoading && <Loader />
                }
                {
                    (data && data?.data?.data === undefined) && <EmptyBox />
                }
            </div>


        </div>
    )
}

export default ResearchDegrees