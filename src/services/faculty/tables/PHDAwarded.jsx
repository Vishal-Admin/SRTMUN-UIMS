import React, { useEffect, useState } from 'react'
import CardMembershipRoundedIcon from '@mui/icons-material/CardMembershipRounded';
import { useSelector } from 'react-redux';
import Text from '../../../inputs/Text';
import File from '../../../inputs/File';
import Header from '../components/Header';
import Year from '../../../inputs/Year';
import { submitWithFile } from '../js/submit';
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
import sortByAcademicYear from '../../../js/sortByAcademicYear'
import GenderSelect, { CasteSelect } from '../../../inputs/GenderSelect';

const PHDAwarded = () => {
    const [phdModal, setPhdModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);


    //states
    const [scholarName, setScholarName] = useState('')
    const [departmentName, setDepartmentName] = useState('')
    const [guideName, setGuideName] = useState('')
    const [thesisTitle, setThesisTitle] = useState('')
    const [degreeName, setDegreeName] = useState('')
    const [awardSubmit, setAwardSubmit] = useState('')
    const [scholarYear, setScholarYear] = useState('')
    const [awardYear, setAwardYear] = useState('')
    const [rac, setRac] = useState('')
    const [gender, setGender] = useState('')
    const [category, setCategory] = useState('')
    const [proof, setProof] = useState(null)
    const [year, setYear] = useState('')
    const [editModal, setEditModal] = useState(false)
    const [itemToDelete, setItemToDelete] = useState('')
    const [isFormOpen, setIsFormOpen] = useState(false)

    const [res, setRes] = useState('')

    const user = useSelector(state => state.user.user);

    function handleSubmit(e) {
        e.preventDefault();

        setLoading(true)
        let formData = new FormData()
        formData.append('scholarName', scholarName)
        formData.append('departmentName', departmentName)
        formData.append('guideName', guideName)
        formData.append('degreeName', degreeName)
        formData.append('awardSubmit', awardSubmit)
        formData.append('rac', rac)
        formData.append('gender', gender)
        formData.append('category', category)
        formData.append('thesisTitle', thesisTitle)
        formData.append('yearOfScholar', scholarYear)
        formData.append('phdAwardYear', awardYear)
        formData.append('year', year)
        formData.append('file', proof)
        formData.append('userId', user._id)

        submitWithFile(formData, 'PhdAwarded', refetch, setLoading, setPhdModal, setIsFormOpen)
    }

    // make states together
    function handleChange(e) {
        e.preventDefault();
        setLoading(true)
        // arrange form Data
        let formData = new FormData()
        formData.append('itemId', itemToDelete._id)
        formData.append('proof', itemToDelete.proof)
        formData.append('scholarName', scholarName)
        formData.append('degreeName', degreeName)
        formData.append('awardSubmit', awardSubmit)
        formData.append('rac', rac)
        formData.append('gender', gender)
        formData.append('category', category)
        formData.append('departmentName', departmentName)
        formData.append('guideName', guideName)
        formData.append('thesisTitle', thesisTitle)
        formData.append('yearOfScholar', scholarYear)
        formData.append('phdAwardYear', awardYear)
        formData.append('year', year)
        formData.append('file', proof)


        handleEditWithFile(formData, 'PhdAwarded', setEditModal, refetch, setLoading, setIsFormOpen)

    }


    function pencilClick(itemId) {
        data?.data?.data?.forEach(function (item) {
            if (item._id === itemId) {
                setScholarName(item.scholarName)
                setDepartmentName(item.departmentName)
                setGuideName(item.guideName)
                setDegreeName(item.degreeName)
                setAwardSubmit(item.awardSubmit)
                setThesisTitle(item.thesisTitle)
                setScholarYear(item.yearOfScholar)
                setAwardYear(item.phdAwardYear)
                setRac(item.rac)
                setGender(item.gender)
                setCategory(item.category)

                setYear(item.year)
                setProof(item.file)

                setItemToDelete(item)
                setIsFormOpen(true)
            }
        })
    }

    // function to clear states to '' 
    function clearStates() {
        setScholarName('')
        setDepartmentName('')
        setGuideName('')
        setThesisTitle('')
        setDegreeName('')
        setAwardSubmit('')
        setScholarYear('')
        setRac('')
        setGender('')
        setCategory('')
        setAwardYear('')
        setYear('')
        setProof(null)

    }

    let param = { model: 'PhdAwarded', userId: user._id }

    // main fetcher
    const { data, isLoading, isError, error, refetch } = useQuery([param.model, param], () => refresh(param))



    return (
        <div>
            {/* // HEADER */}

            <Header exceldialog={setOpen} add="Degree" editState={setEditModal} clearStates={clearStates} state={setPhdModal} icon={<CardMembershipRoundedIcon className='text-lg' />} setIsFormOpen={setIsFormOpen} title="Research Guidance" />

            <BulkExcel data={data?.data?.data} proof='proof' sampleFile='PhdAwardedFaculty' title='Ph.D. Awarded' SendReq='PhdAwarded' refetch={refetch} module='faculty' department={user?._id} open={open} setOpen={setOpen} />

            {/* // 2. FIELDS */}
            <Dialog fullWidth maxWidth='lg' open={isFormOpen}>
                <DialogContent >
                    <FormWrapper action={editModal ? 'Editing' : 'Adding'} loading={loading} cancelFunc={editModal ? () => { setEditModal(false); clearStates() } : () => { setPhdModal(false) }} onSubmit={editModal ? handleChange : handleSubmit} setIsFormOpen={setIsFormOpen}>
                        <p className='text-2xl font-bold my-3'>{editModal ? 'Edit a Ph.D.' : 'Add a new Ph.D.'}</p>

                        <Text title='Scholar Name' state={scholarName} setState={setScholarName} />
                        <Text title='Department Name' state={departmentName} setState={setDepartmentName} />
                        <Text title='Guide Name' state={guideName} setState={setGuideName} />
                        <Text title='Thesis Title' state={thesisTitle} setState={setThesisTitle} />
                        <div className="col-md-4">
                            <label htmlFor="degreeName" className="form-label">Degree</label>
                            <select className="form-select" id="degreeName" required
                                value={degreeName} onChange={(e) => { setDegreeName(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="Ph.D.">Ph.D.</option>
                                <option value="M.Phil">M.Phil</option>
                                <option value="PG Dissertation">PG Dissertation</option>
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="awardSubmit" className="form-label">Awarded / Submitted / Ongoing</label>
                            <select className="form-select" id="awardSubmit" required
                                value={awardSubmit} onChange={(e) => { setAwardSubmit(e.target.value) }}>
                                <option selected disabled value="">Choose</option>
                                <option value="Awarded">Awarded</option>
                                <option value="Submitted">Submitted</option>
                                <option value="Ongoing">Ongoing</option>
                            </select>
                        </div>

                        <Text type="date" title='Date of Registration (RAC)' state={rac} setState={setRac} />

                        <GenderSelect className="col-md-4" title='Gender' state={gender} setState={setGender} showLabel={true} />

                        <CasteSelect className="col-md-4" title='Category' state={category} setState={setCategory} showLabel={true} />

                        <Year space="col-md-3" title='Year of Scholar Registration' state={scholarYear} setState={setScholarYear} />

                        <Text title='Year of Award' type="number" state={awardYear} setState={setAwardYear} />

                        <Year state={year} setState={setYear} />



                        <File space='col-md-6' title='Upload Proof' setState={setProof} />

                    </FormWrapper>
                </DialogContent>
            </Dialog>


            {/* TABLE */}

            <div className='mt-2 overflow-auto change__scrollbar mb-2  text-sm sm:text-base'>
                <table className="table table-bordered table-hover">
                    <thead className='table-dark'>
                        <tr>
                            <th scope="col"><div className="w-44">Scholar Name</div></th>
                            <th scope="col"><div className="w-36">Department Name</div></th>
                            <th scope="col"><div className="w-36">Guide Name</div></th>
                            <th scope="col"><div className="w-36">Thesis Title</div></th>
                            <th scope="col"><div className="w-36">Date of Registration (RAC)</div></th>
                            <th scope="col"><div className="w-36">Gender</div></th>
                            <th scope="col"><div className="w-36">Category</div></th>
                            <th scope="col"><div className="w-36">Degree</div></th>
                            <th scope="col"><div className="w-36">Awarded / Submitted / Ongoing</div></th>
                            <th scope="col"><div className="w-24">Year of Scholar Registration</div></th>
                            <th scope="col"><div className="w-16">Year of Award</div></th>
                            <th scope="col"><div className="w-20">Year</div></th>
                            <th scope="col">Uploaded Proofs</th>
                            <th scope="col">Action</th>


                        </tr>
                    </thead>
                    <tbody>
                        {data && sortByAcademicYear(data?.data?.data, 'year').map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.scholarName}</td>
                                    <td>{item.departmentName}</td>
                                    <td>{item.guideName}</td>
                                    <td>{item.thesisTitle}</td>
                                    <td>{item.rac}</td>
                                    <td>{item.gender}</td>
                                    <td>{item.category}</td>
                                    <td>{item.degreeName}</td>
                                    <td>{item.awardSubmit}</td>
                                    <td>{item.yearOfScholar}</td>
                                    <td>{item.phdAwardYear}</td>
                                    <td>{item.year}</td>
                                    <td><View proof={item.proof} /></td>
                                    <td><Actions item={item} model="PhdAwarded" refreshFunction={refetch} pencilClick={() => pencilClick(item._id)} editState={setEditModal} addState={setPhdModal} /></td>
                                </tr>
                            )
                        })}

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






export default PHDAwarded