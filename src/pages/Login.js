import React from 'react'
import login from '../assests/images/login.png'
import {Form, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { LoginUser } from './apis/authentication'

const Login = () => {
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
    
      const response = await LoginUser(values)
      if(response.success){
          message.success(response.message)
          localStorage.setItem("user" , JSON.stringify(response.data))
          navigate("/")

      }else{
          message.error(response.message)
      }
     } catch (error) {
      message.error(error.message)
     }
  }
  return (
    <section className='w-screen flex flex-col md:flex-row  justify-center items-center min-h-screen  bg-brand-green-light'>
      <div className='w-1/2 flex flex-col mt-[50px] md:mt-0 items-center md:pl-[80px]'>
        <img className='w-[300px] scale-x-[-1]' src={login} alt="login"/>
      </div>
      <div className='w-1/2  flex flex-col items-center mt-5 md:mt-0 mb-10 md:mb-0'>
         <div className='w-[350px] md:w-[400px] bg-white shadow-lg p-5 rounded-md'>
          <h2 className='m-4 uppercase'>Career Hub Login</h2>
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item  className='mx-4' name="email" label="Email">
              <input className='border-[2px] border-brand-black w-[80%] focus:outline-none focus:border-[2px] focus:border-brand-green 
              py-2 pl-2' type="text"/>
            </Form.Item>
            <Form.Item className='mx-4'  name="password" label="Password">
              <input className='border-[2px] outline-none border-brand-black w-[80%] focus:outline-none  focus:border-brand-green 
              py-2 pl-2' type="text"/>
            </Form.Item>
            <button type='submit' className='border-none bg-brand-green px-4 py-3  mx-4 mb-4 rounded-md text-brand-black font-semibold cursor-pointer'>Login</button>
          </Form>
          <Link className='m-4 text-[12px]' to="/register">Not a member ? Click here to Register</Link>
         </div>
      </div>
    </section>
  )
}

export default Login