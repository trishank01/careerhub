import { Col, Form, Row } from "antd";
import React from "react";

const InputClass =
  "border-[2px] border-brand-black w-[90%] focus:outline-none focus:border-[2px] focus:border-brand-green py-2 pl-2";

const PersonalInfo = () => {
  return (
    <Row
      layout="vertical"
      gutter={[10, 10]}
    >
      <Col span={8}>
        <Form.Item label="First Name" name="firstName"
        rules={[{required : true, message : "required"}]}
        >
          <input type="text" className={InputClass} />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Last Name" name="lastName" 
          rules={[{required : true, message : "required"}]}
        >
          <input type="text" className={InputClass} />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Email" name="email"
          rules={[{required : true, message : "required"}]}
        >
          <input disabled type="email" className={InputClass} />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Phone Number" name="phoneNumber" 
          rules={[{required : true, message : "required"}]}
        >
          <input type="text" className={InputClass} />
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item label="Portfolio" name="portfolio" 
          rules={[{required : true, message : "required"}]}
        >
          <input type="text" className={InputClass} />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="Carrier Objective" name="carrierObjective" 
          rules={[{required : true, message : "required"}]}
        >
          <textarea type="text" rows={3} className={InputClass} />
        </Form.Item>
      </Col>

      <Col span={24}>
        <Form.Item label="Address" name="address" 
          rules={[{required : true, message : "required"}]}
        >
          <textarea type="text" rows={3} className={InputClass} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default PersonalInfo;
