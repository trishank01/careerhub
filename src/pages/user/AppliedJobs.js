import { message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {AiFillDelete, AiFillEdit} from 'react-icons/ai'
import { HIDE_LOADING, SHOW_LOADING } from '../../redux/slice/alertSlice'
import { deleteJobById, getApplicationByUserId, getPostedJobsByUserId } from '../apis/jobs'
import PageTitle from '../../components/PageTitle'

const AppliedJobs = () => {
    const navigate = useNavigate()
     const dispatch = useDispatch()
    const [data , setData] = useState([])

    const getData = async () => {
      try {
        dispatch(SHOW_LOADING())
        const user = JSON.parse(localStorage.getItem("user"))
        const response = await getApplicationByUserId(user.id)
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

    

    const columns = [
        {
          title : "Job",
          dataIndex : "jobTitle",
        },
        {
          title : "Company",
          dataIndex : "company",
        },
        {
          title : "Applied On",
          dataIndex : "appliedOn"
        },
        {
          title : "Status",
          dataIndex : "status"
        },

    ]

  

    useEffect(() => {
      getData()
    },[])
  return (
    <div>
         <div className="flex w-[100%] justify-between">
            <PageTitle title="Applied Jobs"/>
         </div>
         <Table columns={columns} dataSource={data}></Table>
    </div>
  )
}

export default AppliedJobs