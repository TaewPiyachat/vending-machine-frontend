import styled from "styled-components";
import groupBy from "lodash/groupBy";
import { Divider, Space, List, Avatar, Typography } from "antd";

import MainLayout from "../../components/layout";

import { getNotifications } from "../../api";

const NotificationList = (props) => {
  const { data } = props;

  const groups = groupBy(data, "location");
  const locationKeys = Object.keys(groups);

  return (
    <MainLayout>
      <Root>
        {locationKeys.length === 0 ? (
          <Typography.Title level={4} style={{ textAlign: "center" }}>
            No Notifications
          </Typography.Title>
        ) : (
          <Space direction="vertical">
            {locationKeys.map((k) => {
              const products = groups[k];
              return (
                <Space direction="vertical" key={k}>
                  <Divider orientation="left">Location: {k}</Divider>
                  <List
                    itemLayout="horizontal"
                    dataSource={products}
                    renderItem={(item) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={item.product_image} />}
                          title={<span>{item.product_name}</span>}
                          description={item.quantity.toString()}
                        />
                      </List.Item>
                    )}
                  />
                </Space>
              );
            })}
          </Space>
        )}
      </Root>
    </MainLayout>
  );
};

NotificationList.getInitialProps = async (ctx) => {
  const { data } = await getNotifications().then((r) => r.json());
  return {
    data,
  };
};

export default NotificationList;

const Root = styled.div`
  background: #fff;
  padding: 16px;
`;
