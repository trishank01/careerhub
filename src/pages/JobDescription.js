
import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import { HIDE_LOADING, SHOW_LOADING } from "../redux/slice/alertSlice";
import {
    applyJobPost,
  getApplicationByJobId,
  getJobById,
} from "./apis/jobs";

const JobDescription = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);
  const [showApplyButton, setShowApplyButton] = useState(true);
 const [alreadyApplied, setAlreadyApplied] = useState(false)
  const user = JSON.parse(localStorage.getItem("user"));

  const getData = async () => {
    try {
      dispatch(SHOW_LOADING());
      const response = await getJobById(params.id);
      if (
        response.data.PostedByUserId ===
        JSON.parse(localStorage.getItem("user")).id
      ) {
        setShowApplyButton(false);
        
      }
      const applicationsResponse = await getApplicationByJobId(params.id);
      if (applicationsResponse.data.filter((item) => item.userId === user.id).length > 0) {
        setShowApplyButton(false);
        setAlreadyApplied(true)
      }
      dispatch(HIDE_LOADING());
      if (response.success) {
        setJobData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HIDE_LOADING());
    }
  };

  const applyNow = async () => {
     try {
        dispatch(SHOW_LOADING())
        const response = await applyJobPost(jobData)
        dispatch(HIDE_LOADING())
        if(response.success){
            message.success(response.message)
            navigate("/")
        }else{
            message.error(response.message)
        }
     } catch (error) {
          message.error(error.message)
          dispatch(HIDE_LOADING())
     }
  }

  useEffect(() => {
    if (params.id) {
      getData();
    } else {
      setJobData({});
    }
  }, []);

  return (
    jobData && (
      <div>
        <PageTitle title={jobData.title} />
        <Row>
          <Col span={24}>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between mt-1">
                <span>Company</span>
                <span>{jobData.company.toUpperCase()}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Location</span>
                <span>{jobData.location.toUpperCase()}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Salary</span>
                <span>{jobData.Salary}LPA</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Experience</span>
                <span>{jobData.experience} years</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Notice Period</span>
                <span>{jobData.noticePeriod} days</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Job Type</span>
                <span>{jobData.jobType}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Industry</span>
                <span>{jobData.industry.toUpperCase()}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Posted On</span>
                <span>{jobData.postedOn}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Last Date To Apply</span>
                <span>{jobData.lastDateToApply}</span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Posted By</span>
                <span>{jobData.PostedByUserName}</span>
              </div>
            </div>
          </Col>
          <div className="text-[22px] mt-4 uppercase underline tracking-wide">
            Job Description
          </div>
          <Col span={24} className="mt-3  tracking-wide">
            {jobData.jobDescription}
          </Col>
         
            {alreadyApplied && 
              <div className="bg-brand-green p-4 text-[16px] font-semibold text-white mt-5">
            <span>You have alredy applied for this job. you can view your application status in the applied job section</span>
            </div>
            }
           
        </Row>
        <div className="flex gap-2 my-4 pb-5 justify-end">
          <button
            className=" mt-2 bg-red-600 text-white border-none py-2 px-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            CANCEL
          </button>
          {showApplyButton && (
            <button className=" mt-2 bg-brand-green text-white border-none py-2 px-3 cursor-pointer" onClick={applyNow}>
              APPLY NOW
            </button>
          )}
        </div>
      </div>
    )
  );
};

export default JobDescription;
