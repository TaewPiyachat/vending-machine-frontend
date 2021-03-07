import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Layout, Menu } from "antd";
import { EnvironmentOutlined, ShopOutlined } from "@ant-design/icons";

const { Content, Sider } = Layout;

const paths = {
  "/products": '1',
  "/locations": '2',
};

const MainLayout = ({ children }) => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const { pathname } = router;

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        {/* <div className="logo" /> */}
        <Menu theme="dark" selectedKeys={[paths[pathname]]} mode="inline">
          <Menu.Item key='1' icon={<ShopOutlined />}>
            <Link href="/products">Products</Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<EnvironmentOutlined />}>
            <Link href="/locations">Locations</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
        <Content style={{ margin: 16 }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
