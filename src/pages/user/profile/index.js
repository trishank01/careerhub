import { Tabs , Form, message } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import PageTitle from '../../../components/PageTitle'
import { HIDE_LOADING, SHOW_LOADING } from '../../../redux/slice/alertSlice'
import { getUserProfile, updateUserProfile } from '../../apis/users'
import Education from './Education'
import Experince from './Experince'
import PersonalInfo from './PersonalInfo'





const Profile =  () => {

  const dispatch = useDispatch()
  const [userData, setUserData] = useState(null)


const onfinish = async (values) => {
   console.log(values)
   try {
     dispatch(SHOW_LOADING())
     const response = await updateUserProfile(values)
     dispatch(HIDE_LOADING())
     if(response.success){
      message.success(response.message)
     }else{
      message.error(response.message)
     }
   } catch (error) {
     dispatch(HIDE_LOADING())
     message.error(error.message)
   }
}

const getData = async () => {
        try {
          dispatch(SHOW_LOADING())
          const user = JSON.parse(localStorage.getItem("user"))
          const response = await getUserProfile(user.id)
          dispatch(HIDE_LOADING())
          if(response.success){
            setUserData(response.data)
          }else {
            message.error(response.message)
          }
        } catch (error) {
          message.error(error.message)
        }
}

useEffect(() => {
      getData()
},[])


  return (
    <div>
        <PageTitle title="Profile"/>
  {userData &&  <Form layout="vertical" onFinish={onfinish} initialValues={userData}>
   <Tabs defaultActiveKey='1' >
            <TabPane tab="Personal Info" key="1">
                <PersonalInfo/>
            </TabPane>
            <TabPane tab="Education & Skill" key="2">
                <Education/>
            </TabPane>
            <TabPane tab="Experience" key="3">
                <Experince/>
            </TabPane>
        </Tabs>
         <div className="flex justify-end gap-3 pb-3">
          <button className="p-3 border-none font-semibold bg-red-500 text-white rounded-md cursor-pointer">Cancel</button>
          <button className="p-3 border-none font-semibold bg-brand-green text-white rounded-md cursor-pointer" type='submit'>Save</button>
         </div>
   </Form>}
    </div>
  )
}

export default Profile