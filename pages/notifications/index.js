import { useState, useEffect } from "react";
import styled from "styled-components";
import groupBy from "lodash/groupBy";
import { Divider, Space, List, Avatar, Typography } from "antd";

import withAuth from "../../components/hoc";
import MainLayout from "../../components/layout";
import Dot from "../../components/dot";

import { getNotifications } from "../../api";

const NotificationList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getNotifications().then((r) => r.json());
    setData(data);
  };

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
                    renderItem={(item) => {
                      const color =
                        item.quantity >= 10
                          ? "#87d068"
                          : item.quantity > 0
                          ? "orange"
                          : "red";

                      return (
                        <List.Item>
                          <List.Item.Meta
                            avatar={<Avatar src={item.product_image} />}
                            title={<span>{item.product_name}</span>}
                            description={
                              <DescWrapper>
                                <span>Price: {item.price} ฿</span>
                                <span>
                                  <Space>
                                    <Dot color={color} />
                                    Available stock: {item.quantity.toString()}{" "}
                                    item(s)
                                  </Space>
                                </span>
                              </DescWrapper>
                            }
                          />
                        </List.Item>
                      );
                    }}
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

export default withAuth(NotificationList);

const Root = styled.div`
  background: #fff;
  padding: 16px;
`;

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
