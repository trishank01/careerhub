import { Button, Col, Form, Input, Row, Space } from "antd";
import React from "react";
import { CiCircleRemove } from "react-icons/ci";

const InputClass =
  "border-[2px] border-brand-black w-[95%] focus:outline-none focus:border-[2px] focus:border-brand-green py-2 pl-2";

const Education = () => {
  return (
    <div>
      <Form.List name="Education ">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} className="flex items-center">
                  <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "degree"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Degree"
                  >
                    <input type="text"  className={`${InputClass}`} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "institution"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Institution"
                  >
                    <input type="text"  className={`${InputClass}`} />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    {...restField}
                    name={[name, "percentage"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Percentage"
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
                ADD EDUCATION
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>



      <Form.List name="Skills ">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Row gutter={[10, 10]} className="flex items-center">
                  <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "technology"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="Technology"
                  >
                    <input type="text"  className={`${InputClass}`} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...restField}
                    name={[name, "rating"]}
                    rules={[
                      {
                        required: true,
                        message: "required",
                      },
                    ]}
                    label="rating"
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
                ADD SKILLS
              </button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </div>
  );
};

export default Education;
