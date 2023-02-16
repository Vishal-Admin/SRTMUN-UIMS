import React from 'react'
import { useDispatch } from 'react-redux'
import { setEditModal } from '../redux/slices/ModalSlice'


const EditModal = () => {
    const dispatch = useDispatch()
    return (
        <div className="bg-[#39557375] w-full rounded-lg absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
            <div className='bg-white p-4 rounded-lg w-1/3 z-10'>
                <form className="row g-3 w-[575px]">
                    <div className="col-md-5">
                        <label htmlFor="validationDefault01" className="form-label">Exam</label>
                        <input type="text" className="form-control" id="validationDefault01" value="Mark" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="validationDefault02" className="form-label">University/Board</label>
                        <input type="text" className="form-control" id="validationDefault02" value="Otto" required />
                    </div>

                    <div className="col-md-5">
                        <label htmlFor="validationDefault03" className="form-label">Year</label>
                        <input type="text" className="form-control" id="validationDefault03" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="validationDefault03" className="form-label">Subjects</label>
                        <input type="text" className="form-control" id="validationDefault03" required />
                    </div>
                    <div className="col-md-5">
                        <label htmlFor="validationDefault03" className="form-label">Percentage</label>
                        <input type="text" className="form-control" id="validationDefault03" required />
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="invalidCheck2" required />
                            <label className="form-check-label" htmlFor="invalidCheck2">
                                Checked your information?
                            </label>
                        </div>
                    </div>
                    <div className="col-12 flex items-center justify-start gap-3">
                        <button type="submit" className="bg-green-800 text-white px-4 rounded-full p-2">Edit Now</button>
                        <button className="bg-red-800 text-white px-4 rounded-full p-2" onClick={() => { dispatch(setEditModal(false)) }}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditModal