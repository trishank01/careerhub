import { message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PageTitle from '../../../components/PageTitle'
import { HIDE_LOADING, SHOW_LOADING } from '../../../redux/slice/alertSlice'
import { deleteJobById, getPostedJobsByUserId } from '../../apis/jobs'
import {AiFillDelete, AiFillEdit} from 'react-icons/ai'

const Postedjobs = () => {
    const navigate = useNavigate()
     const dispatch = useDispatch()
    const [data , setData] = useState([])
    const [showAppliedCandidates , setShowappliedCandidates] = useState(false)

    const getData = async () => {
      try {
        dispatch(SHOW_LOADING())
        const user = JSON.parse(localStorage.getItem("user"))
        const response = await getPostedJobsByUserId(user.id)
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
            <div className='flex gap-3 cursor-pointer'>
               <AiFillEdit size={20} onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}/>
               <AiFillDelete size={20} onClick={() => deleteJob(record.id)}/>
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
            <PageTitle title="Posted Jobs"/>
            <button className='bg-brand-green border-none py-3 px-4 text-white font-semibold tracking-wide rounded-md cursor-pointer' onClick={() => navigate("/posted-jobs/new")}>NEW JOBS</button>
         </div>
         <Table columns={columns} dataSource={data}></Table>
    </div>
  )
}

export default Postedjobs