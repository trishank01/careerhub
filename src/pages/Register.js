import React from 'react'
import register from '../assests/images/register.png'
import {Form, message} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUser } from './apis/authentication'
import { useDispatch } from 'react-redux'
import { HIDE_LOADING, SHOW_LOADING } from '../redux/slice/alertSlice'


const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async(values) => {
    try {
      dispatch(SHOW_LOADING())
      const response = await RegisterUser(values)
      dispatch(HIDE_LOADING())
      if(response.success){
          message.success(response.message)
          navigate("/login")
      }else{
          message.error(response.message)
      }
     } catch (error) {
      message.error(error.message)
      dispatch(HIDE_LOADING())
     }

  }
  return (
    <section className='w-screen flex flex-col md:flex-row  justify-center items-center min-h-screen  bg-brand-green-light'>
      <div className='w-1/2  flex flex-col items-center mt-[50px] md:mt-0'>
         <div className='w-[350px] md:w-[400px] bg-white shadow-lg p-5 rounded-md'>
          <h2 className='m-4 uppercase'>Career Hub Register</h2>
          <Form layout='vertical' onFinish={onFinish}>
          <Form.Item  className='mx-4' name="name" label="Name">
              <input className='border-[2px] border-brand-black w-[80%] focus:outline-none focus:border-[2px] focus:border-brand-green 
              py-2 pl-2' type="text"/>
            </Form.Item>
            <Form.Item  className='mx-4' name="email" label="Email">
              <input className='border-[2px] border-brand-black w-[80%] focus:outline-none focus:border-[2px] focus:border-brand-green 
              py-2 pl-2' type="text"/>
            </Form.Item>
            <Form.Item className='mx-4'  name="password" label="Password">
              <input className='border-[2px] outline-none border-brand-black w-[80%] focus:outline-none  focus:border-brand-green 
              py-2 pl-2' type="text"/>
            </Form.Item>
            <button type='submit' className='border-none bg-brand-green px-4 py-3  mx-4 mb-4 rounded-md text-brand-black font-semibold cursor-pointer'>Register</button>
          </Form>
          <Link className='m-4 text-[12px]' to="/login">Already register ? Click here to Login</Link>
         </div>
      </div>
      <div className='w-1/2 flex flex-col mt-[50px] md:mt-0 items-center md:pr-[80px]'>
        <img className='w-[300px]' src={register} alt="login"/>
      </div>
    </section>
  )
}

export default Register