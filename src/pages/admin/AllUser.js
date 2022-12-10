import { message, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {  editJobsDetails } from '../apis/jobs'
import { HIDE_LOADING, SHOW_LOADING } from '../../redux/slice/alertSlice'
import PageTitle from '../../components/PageTitle'

import { getAllUsers, updateUserProfile } from '../apis/users'


const AllUsers = () => {
     const dispatch = useDispatch()
    const [data , setData] = useState([])
   

    const getData = async () => {
      try {
        dispatch(SHOW_LOADING())
        const response = await getAllUsers()
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


    const changeStatus = async (id , status) => {
        try {
            dispatch(SHOW_LOADING())
            const response = await updateUserProfile({id , status})
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
          title : "Name",
          dataIndex : "name",
        },
        {
            title : "Email",
            dataIndex : "email",
          },
          {
            title : "User Id",
            dataIndex : "id",
          },
          {
            title : "Role",
            dataIndex : 'isAdmin',
            render :(text , value) => (
                <div>{`${text === true ? "admin" : "user"}`}</div>
            )
          },
          {
            title : "Status",
            dataIndex : "status",
          },
          {
            title : "Action",
            dataIndex : "action",
            render : (text , record) => (
              <div className='flex gap-3 items-center'>
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
            <PageTitle title="All Users"/>
         </div>
         <Table className='mt-5' columns={columns} dataSource={data}></Table>
    </div>
  )
}

export default AllUsers