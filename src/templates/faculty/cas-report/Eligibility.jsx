import React from 'react'
import { stageObj } from '../../../services/faculty/reports/cas/components/ApplyLevel'
import { ViewFile } from './Tables'
import TableComponent from '../../../components/TableComponent'

const Eligibility = ({ eligData, level }) => {
    console.log('Eligibility :', eligData)
    return (
        <div>
            <p className="academic-start"></p>
            <p className='text-center bg-[#00987936] text-[#009879] p-2'>
                <span className="font-bold">Your Eligibility</span>
            </p>

            <div className='mt-3 mb-5'>
                <p className='text-center mb-3 mt-5'>Applying for <b>{stageObj?.[level]?.title}</b></p>
                <TableComponent tableHeads={["Title", "Proof"]} tableColor="bg-[#009879]">
                    {
                        level !== 'stage4' && stageObj?.[level]?.inputData?.map((inputData) => {
                            return <tr>
                                <td></td>
                                <td className='w-[70%]'>{inputData.title}</td>
                                <td >{eligData?.[inputData.name]?.[0]?.filename ? <ViewFile fileName={eligData?.[inputData.name]?.[0]?.filename} type="casDirURL" /> : 'Yes'}</td>
                            </tr>
                        })
                    }

                    {
                        level === 'stage4' && stageObj?.[level]?.inputData?.map((inputData, index) => {
                            return (index === 2 && eligData['supervisor'] === 'Main Supervisor') ? null : <tr>
                                <td></td>
                                <td className='w-[70%]'>{inputData.title} {inputData.name.includes('guideProof') && <span className='font-semibold mx-3'>{`(${eligData['supervisor']})`}</span>} </td>
                                <td >{eligData?.[inputData.name]?.[0]?.filename ? <ViewFile fileName={eligData?.[inputData.name]?.[0]?.filename} type="casDirURL" /> : 'Yes'}</td>
                            </tr>
                        })
                    }
                </TableComponent>
            </div>
        </div>
    )
}

export default Eligibility