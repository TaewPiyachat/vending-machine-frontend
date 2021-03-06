import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Layout, Menu, Badge, Typography } from "antd";
import {
  EnvironmentOutlined,
  ShopOutlined,
  NotificationOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { getNotifications } from "../../api";

const { Content, Sider } = Layout;

const paths = {
  "/products": {
    header: "Products",
    key: "1",
  },
  "/locations": {
    header: "Locations",
    key: "2",
  },
  "/notifications": {
    header: "Notifications",
    key: "3",
  },
};

const withLayout = (Component) => (props) => {
  const router = useRouter();
  const [isSystemAdmin, setIsSystemAdmin] = useState();
  const [notifications, setNotifications] = useState(0);
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = router;

  useEffect(() => {
    notify();
    setIsSystemAdmin(localStorage.getItem("is_system_admin") === "true");
  }, []);

  const notify = async () => {
    const res = await getNotifications().then((r) => r.json());
    setNotifications(res.data.length);
  };

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <Menu theme="dark" selectedKeys={[paths[pathname].key]} mode="inline">
          <Menu.Item
            key="0"
            style={{ margin: "32px 0" }}
            icon={
              <UserOutlined
                style={{ color: "#ccc", fontSize: 24, marginRight: 8 }}
              />
            }
          >
            <Typography.Text style={{ color: "#ccc" }}>
              Hello! {isSystemAdmin ? "System Admin" : "Customer"}
            </Typography.Text>
          </Menu.Item>
          <Menu.Item key="1" icon={<ShopOutlined />}>
            <Link href="/products">Products</Link>
          </Menu.Item>
          {isSystemAdmin && (
            <Menu.Item key="2" icon={<EnvironmentOutlined />}>
              <Link href="/locations">Locations</Link>
            </Menu.Item>
          )}
          {isSystemAdmin && (
            <Menu.Item key="3" icon={<NotificationOutlined />}>
              <Link href="/notifications">
                <span>
                  <Badge size="default" count={notifications} offset={[15, 0]}>
                    Notifications
                  </Badge>
                </span>
              </Link>
            </Menu.Item>
          )}
          <Menu.Item key="4" icon={<LogoutOutlined />}>
            <Link href="/">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Layout.Header
          className="site-layout-background"
          style={{ display: "flex", alignItems: "center" }}
        >
          <Typography.Title level={2} style={{ color: "white", margin: 0 }}>
            {paths[pathname].header}
          </Typography.Title>
        </Layout.Header>
        <Content style={{ margin: 16 }}>
          <Component {...props} notify={notify} />
        </Content>
      </Layout>
    </Layout>
  );
};

export default withLayout;

const Wrapper = styled.div`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  padding: 32px 0 16px 0;
`;
