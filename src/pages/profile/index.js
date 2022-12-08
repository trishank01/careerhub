import { Tabs , Form } from 'antd'
import TabPane from 'antd/es/tabs/TabPane'
import React from 'react'
import PageTitle from '../../components/PageTitle'
import Education from './Education'
import Experince from './Experince'
import PersonalInfo from './PersonalInfo'

const onfinish = (values) => {
   console.log(values)
}


const Profile = () => {
  return (
    <div>
        <PageTitle title="Profile"/>
   <Form layout="vertical" onFinish={onfinish}>
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
   </Form>
    </div>
  )
}

export default Profile