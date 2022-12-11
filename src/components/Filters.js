import { message } from 'antd';
import React from 'react'
import { useDispatch } from 'react-redux';
import { getAllJobs } from '../pages/apis/jobs';
import { HIDE_LOADING, SHOW_LOADING } from '../redux/slice/alertSlice';

const InputClass =
  "border-[2px] border-brand-black w-[60%] focus:outline-none focus:border-[2px] focus:border-brand-green py-2 pl-2";


 
const Filters = ({filters , setFilters , setData}) => {
  
  const dispatch = useDispatch()

  const filterData = async(filters) => {
    try {
         dispatch(SHOW_LOADING())
         const response = await getAllJobs(filters)
         if(response.success){
          const approvedJobs = response.data.filter((job) => job.status === "approevd")
          setData(approvedJobs)
         }
         dispatch(HIDE_LOADING())
    } catch (error) {
        dispatch(HIDE_LOADING())
        message.error(error.message)
    }
  }
  return (
    <div >
           <div className='flex justify-center gap-3 my-5'>
              <select name='' id='' value={filters.location} onChange={(e) => setFilters({...filters , location: e.target.value})} className={InputClass}>
                  <option value="">Location</option>
                  <option value="india">India</option>
                  <option value="usa">USA</option>
                  <option value="uk">UK</option>
                  <option value="remote">Remote</option>
              </select>
              <select name='' id='' value={filters.industry} onChange={(e) => setFilters({...filters , industry: e.target.value})} className={InputClass}>
                  <option value="">Industry</option>
                  <option value="it">IT</option>
                  <option value="finance">Finance</option>
                  <option value="marketing">Sales</option>
              </select>
              <select name='' id='' value={filters.experience} onChange={(e) => setFilters({...filters , experience: e.target.value})} className={InputClass}>
                  <option value="">Experience</option>
                  <option value="0">Fresher</option>
                  <option value="1">0-1 year</option>
                  <option value="3">1-3 years</option>
                  <option value="5">3-5 years</option>
              </select>

              <button className='bg-brand-green text-white  font-semibold px-4 py-2' onClick={() => filterData()}>Filter</button>
           </div>
    </div>
  )
}

export default Filters