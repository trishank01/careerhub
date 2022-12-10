import { Col, Form, message, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { HIDE_LOADING, SHOW_LOADING } from "../../../redux/slice/alertSlice";
import {
  addNewJobPost,
  editJobsDetails,
  getJobById,
} from "../../apis/jobs";

const InputClass =
  "border-[2px] border-brand-black w-[98%] focus:outline-none focus:border-[2px] focus:border-brand-green py-2 pl-2";

const NewEditJob = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [jobData, setJobData] = useState(null);

  const onFinish = async (values) => {
    try {
      console.log(values)
      dispatch(SHOW_LOADING());
      let response = null;
      if (params.id) {
        response = await editJobsDetails({...values , id : params.id})
      } else {
        response = await addNewJobPost(values);
      }
      console.log(response)
      if (response.success) {
        message.success(response.message);
        navigate("/posted-jobs");
      } else {
        message.error(response.message);
      }
      dispatch(HIDE_LOADING());
    } catch (error) {
      dispatch(HIDE_LOADING());
      message.error(error.message);
      
    }
  };

  const getData = async () => {
    try {
      dispatch(SHOW_LOADING());
      const response = await getJobById(params.id);
      dispatch(HIDE_LOADING());
      if (response.success) {
        setJobData(response.data);
      }else{
        message.error(response.message)
      }
    } catch (error) {
      message.error(error.message);
      dispatch(HIDE_LOADING());
    }
  };

  useEffect(() => {
   if(params.id){
    getData();
   }else {
    setJobData({})
   }
  }, []);
  return (
    <div>
      <PageTitle title={params.id ? "Edit Job Post" : "Add New Job Post"} />
    {jobData &&   <Form layout="vertical" className="mt-5" onFinish={onFinish} initialValues={jobData}>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" className={InputClass} />
            </Form.Item>
          </Col>
          <Col span={6} className="mt-[-10px]">
            <Form.Item
              label="Industry"
              name="industry"
              rules={[{ required: true, message: "required" }]}
              className={InputClass}
            >
              <select name="" id="" className={InputClass}>
                <option value="name">select</option>
                <option value="it">IT</option>
                <option value="Finance">Finance</option>
                <option value="marketing">Marketing</option>
                <option value="realestate">Real Estate</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6} className="mt-[-10px]">
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "required" }]}
              className={InputClass}
            >
              <select name="" id="" className={`${InputClass} `}>
                <option value="">Select</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
                <option value="remote">remote</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Company Name"
              name="company"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" className={InputClass} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Salary"
              name="Salary"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" className={InputClass} />
            </Form.Item>
          </Col>

          <Col span={6} className="mt-[-10px]">
            <Form.Item
              label="Job Type"
              name="jobType"
              rules={[{ required: true, message: "required" }]}
              className={InputClass}
            >
              <select name="" id="" className={InputClass}>
                <option value="name">select</option>
                <option value="fulltime">Full Time</option>
                <option value="parttime">Part Time</option>
                <option value="contract">contract</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Last Date To Apply"
              name="lastDateToApply"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="date" className={InputClass} />
            </Form.Item>
          </Col>

          {/* <Col span={6}>
            <Form.Item label="Company Logo" name="companyLog">
              <input type="url" className={InputClass} />
            </Form.Item>
          </Col> */}

          <Col span={6}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" className={InputClass} />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Notice Period"
              name="noticePeriod"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" className={InputClass} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Job Description"
              name="jobDescription"
              rules={[{ required: true, message: "required" }]}
            >
              <textarea type="text" rows={3} className={InputClass} />
            </Form.Item>
          </Col>

          <div className="flex justify-end gap-3 pb-3">
            <button
              className="p-3 border-none font-semibold bg-red-500 text-white rounded-md cursor-pointer"
              onClick={() => navigate("/posted-jobs")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-3 border-none font-semibold bg-brand-green text-white rounded-md cursor-pointer"
            >
              Save
            </button>
          </div>
        </Row>
      </Form>}
    </div>
  );
};

export default NewEditJob;
