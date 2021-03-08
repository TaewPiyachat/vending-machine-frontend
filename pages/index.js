import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Avatar, Space, Typography, Button, Modal, Form, Input } from "antd";

import { UserOutlined } from "@ant-design/icons";

export default function Home() {
  const [isVisible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.removeItem("is_system_admin");
  }, []);

  const loginAsCustomer = () => {
    router.push("/products");
  };

  const loginAsSystemAdmin = () => {
    localStorage.setItem("is_system_admin", true);
    router.push("/products");
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  return (
    <Root>
      <Space direction="vertical" align="center">
        <Typography.Title level={4}>Login as:</Typography.Title>
        <Space>
          <Wrapper onClick={loginAsCustomer}>
            <Avatar size={128} icon={<UserOutlined />} />
            <Text>Customer</Text>
          </Wrapper>
          <Wrapper onClick={loginAsSystemAdmin}>
            <Avatar size={128} icon={<UserOutlined />} />
            <Text>System Admin</Text>
          </Wrapper>
        </Space>
      </Space>
      {isVisible && (
        <Modal
          title="Login as System Admin"
          visible={isVisible}
          footer={null}
          onCancel={() => setVisible(false)}
        >
          <Form name="basic" layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <ButtonWrapper>
              <Button type="primary" htmlType="submit">
                LOGIN
              </Button>
            </ButtonWrapper>
          </Form>
        </Modal>
      )}
    </Root>
  );
}

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 64px;
`;

const Wrapper = styled(Button)`
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 64px;
  border-radius: 8px;
`;

const Text = styled.span`
  font-size: 16px;
  margin-top: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
