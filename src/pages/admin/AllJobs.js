import { message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'



import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { deleteJobById, editJobsDetails, getAllJobs } from '../apis/jobs'
import { HIDE_LOADING, SHOW_LOADING } from '../../redux/slice/alertSlice'
import PageTitle from '../../components/PageTitle'


const AllJobs = () => {
    const navigate = useNavigate()
     const dispatch = useDispatch()
    const [data , setData] = useState([])

    const getData = async () => {
      try {
        dispatch(SHOW_LOADING())
        const response = await getAllJobs()
        if(response.success){
          setData(response.data)
        }
        dispatch(SHOW_LOADING())
      } catch (error) {
        dispatch(HIDE_LOADING())
        message.error(error.message)
      }
       dispatch(HIDE_LOADING())
    }

    const deleteJob = async (id) => {
      try {
        dispatch(SHOW_LOADING())
        const response = await deleteJobById(id)
        if(response.success){
          setData(response.data)
          getData()
        }
        dispatch(SHOW_LOADING())
      } catch (error) {
        dispatch(HIDE_LOADING())
        message.error(error.message)
      }
       dispatch(HIDE_LOADING())
    }

    const changeStatus = async (id , status) => {
        try {
            dispatch(SHOW_LOADING())
            const response = await editJobsDetails({id , status})
            if(response.success){
              setData(response.data)
              getData()
            }
            dispatch(SHOW_LOADING())
          } catch (error) {
            dispatch(HIDE_LOADING())
            message.error(error.message)
          }
           dispatch(HIDE_LOADING())
    }
  

    const columns = [
        {
          title : "Title",
          dataIndex : "title",
        },
        {
          title : "Company",
          dataIndex : "company",
        },
        {
          title : "Posted On",
          dataIndex : "postedOn"
        },
        {
          title : "Last Date to Apply",
          dataIndex : "lastDateToApply"
        },
        {
          title : "Status",
          dataIndex : "status"
        },
        {
          title : "Action",
          dataIndex : "action",
          render : (text , record) => (
            <div className='flex gap-3 items-center'>
               <AiFillDelete className='cursor-pointer' size={20} onClick={() => deleteJob(record.id)}/>
              {record.status === "approved" && <span className='underline cursor-pointer underline-offset-2' onClick={() => changeStatus(record.id , "rejected")}>
                Reject</span>}
                {(record.status === "pending" || record.status === "rejected")  && <span className='underline cursor-pointer underline-offset-2' onClick={() => changeStatus(record.id , "approved")}>
                Approve</span>}
            </div> 
          )
        }

    ]


   

    useEffect(() => {
      getData()
    },[])
  return (
    <div>
         <div className="flex w-[100%] justify-between">
            <PageTitle title="All Jobs"/>
            <button className='bg-brand-green border-none py-3 px-4 text-white font-semibold tracking-wide rounded-md cursor-pointer' onClick={() => navigate("/posted-jobs/new")}>NEW JOBS</button>
         </div>
         <Table className='mt-5' columns={columns} dataSource={data}></Table>
    </div>
  )
}

export default AllJobs