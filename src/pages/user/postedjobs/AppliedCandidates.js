import { message, Modal, Table } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { HIDE_LOADING, SHOW_LOADING } from '../../../redux/slice/alertSlice'
import { changeApplicationsStatus } from '../../apis/jobs'

const AppliedCandidates = ({showAppliedCandidates ,setShowappliedCandidates , appliedCandidates , reloadData}) => {
 
  const dispatch = useDispatch()

  const changeStatus = async (applicationId , jobId ,  status) => {
         try {
             dispatch(SHOW_LOADING())
             const response = await changeApplicationsStatus({id:applicationId , status})
             dispatch(HIDE_LOADING())
             if(response.success){
              message.success(response.message)
              reloadData(jobId)
             }else{
              message.error(response.message)
             }
         } catch (error) {
          dispatch(HIDE_LOADING)
             message.error("Something went Wrong")
         }
  }

  
  const columns = [
    {
      title : "Name",
      dataIndex : "userName",
      render : (text , record) => {
        return <Link to={`/profile/${record.userId}`}>{text}</Link>
      }
    },
    {
      title : "Email",
      dataIndex : "email",
    },
    {
      title : "Phone",
      dataIndex : "phoneNumber",
    },
    {
      title : "Status",
      dataIndex : "status",
    },
    {
      title : "Action",
      dataIndex : "action",
      render : (text , record)=> {
     return (
      <div>
        {record.status === "pending" && <span className='underline cursor-pointer' onClick={() => changeStatus(record.id ,record.jobId ,  "approved")}>Approve
        </span>}

      </div>
     )
      }
    }
  ]


  return (
    <div>
      <Modal title="Applied Candidates" open={showAppliedCandidates} onCancel={() => setShowappliedCandidates(false)} footer={null} width={1000}>
        <Table columns={columns} dataSource={appliedCandidates} rowKey="id"/>
      </Modal>
    </div>
  )
}

export default AppliedCandidates