import React from 'react'
import {  Col, Form,  Row } from "antd";
import { CiCircleRemove } from "react-icons/ci";


const InputClass =
  "border-[2px] border-brand-black w-[95%] focus:outline-none focus:border-[2px] focus:border-brand-green py-2";

const Experince = () => {
  return (
    <div>
      <Form.List name="experinces">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} className="flex items-center">
                  <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, "company"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Company"
                  >
                    <input type="text"  className={`${InputClass}`} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, "designation"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Designation"
                  >
                    <input type="text"  className={`${InputClass}`} />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, "duration"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Duration"
                  >
                    <input type="text"  className={`${InputClass}`} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "place"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Place"
                  >
                    <input type="text"  className={`${InputClass}`} />
                  </Form.Item>
                </Col>
        
                <CiCircleRemove size={28} onClick={() => remove(name)} />
              </Row>
            ))}
            <Form.Item>
              <button
                className="p-3 border-none font-semibold bg-brand-green text-white rounded-md cursor-pointer"
                onClick={() => add()}
                block
              >
                ADD EXPERINCE
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>


      <Form.List name="projects">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} className="flex items-center">
                  <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, "title"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Title"
                  >
                    <input type="text"  className={`${InputClass}`} />
                  </Form.Item>
                </Col>         
              
                <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, "description"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Description"
                  >
                    <input type="text"  className={`${InputClass}`} />
                  </Form.Item>
                </Col>
                <Col span={8} className="mt-8">
                  <Form.Item
                    {...restField}
                    name={[name, "duration"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Duration"
                  >
                    <textarea type="text" rows={3}  className={`${InputClass}`} />
                  </Form.Item>
                </Col>
                <CiCircleRemove size={28} onClick={() => remove(name)} />
              </Row>
            ))}
            <Form.Item>
              <button
                className="p-3 border-none font-semibold bg-brand-green text-white rounded-md cursor-pointer"
                onClick={() => add()}
                block
              >
                ADD PORJECTS
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  )
}

export default Experince