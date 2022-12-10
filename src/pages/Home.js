import { Col, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Filters from "../components/Filters";
import PageTitle from "../components/PageTitle";
import { HIDE_LOADING, SHOW_LOADING } from "../redux/slice/alertSlice";
import { getAllJobs, getPostedJobsByUserId } from "./apis/jobs";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      dispatch(SHOW_LOADING());
      const response = await getAllJobs();
      if (response.success) {
        setData(response.data);
      }
      dispatch(SHOW_LOADING());
    } catch (error) {
      dispatch(HIDE_LOADING());
      message.error(error.message);
    }
    dispatch(HIDE_LOADING());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <PageTitle title="Welcome to CareerHub" />
      <Filters />
      <Row gutter={[15, 15]} className="mt-2">
        {data.map((job) => {
          return (
            <Col span={8} key={data.id}>
              <div className="border-2 border-solid p-3">
                <h3 className="uppercase text-[18px]">{job.title}</h3>
                <div style={{ borderBottom: "2px solid black" }}></div>
                  
                  <div className="flex flex-col gap-2">

                <div className="flex justify-between mt-1">
                  <span>Company</span>
                  <span>{job.company}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Location</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Salary</span>
                  <span>{job.Salary}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Posted On</span>
                  <span>{job.postedOn}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Last Date To Apply</span>
                  <span>{job.lastDateToApply}</span>
                </div>
                </div> 
                <button className="w-[100%] mt-2 bg-brand-green text-white border-none py-2 px-3 cursor-pointer" onClick={() => navigate(`/job-description/${job.id}`)}>Apply Now</button>
              </div>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Home;
