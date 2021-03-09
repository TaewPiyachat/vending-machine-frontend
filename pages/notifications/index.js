import { useState, useEffect } from "react";
import styled from "styled-components";
import groupBy from "lodash/groupBy";
import { Divider, Space, List, Typography } from "antd";

import withAuth from "../../components/hoc/withAuth";
import withLayout from "../../components/hoc/withLayout";
import ListItem from "../../components/list";
import AmountModal from "../../components/amount-modal";

import { getNotifications, addProducts } from "../../api";

const NotificationList = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const { notify } = props;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getNotifications().then((r) => r.json());
    setData(data);
  };

  const addItems = (item) => {
    setVisible(item);
  };

  const onFinish = async (values) => {
    const { id, location } = isVisible;
    const res = await addProducts(location, id, values.amount).then((r) =>
      r.json()
    );
    fetchData();
    setVisible(false);
    if (res.notifyAdmin) notify();
  };

  const groups = groupBy(data, "location");
  const locationKeys = Object.keys(groups);

  return (
    <Root>
      {locationKeys.length === 0 ? (
        <Typography.Title level={4} style={{ textAlign: "center" }}>
          No Notifications
        </Typography.Title>
      ) : (
        <Space direction="vertical" style={{ width: "100%" }}>
          {locationKeys.map((k) => {
            const products = groups[k];
            return (
              <Space direction="vertical" key={k} style={{ width: "100%" }}>
                <Divider orientation="left">Location: {k}</Divider>
                <List
                  itemLayout="horizontal"
                  dataSource={products}
                  renderItem={(item) => {
                    return <ListItem item={item} addItems={addItems} />;
                  }}
                />
              </Space>
            );
          })}
        </Space>
      )}
      {isVisible && (
        <AmountModal
          isVisible={isVisible}
          setVisible={setVisible}
          onFinish={onFinish}
        />
      )}
    </Root>
  );
};

export default withAuth(withLayout(NotificationList));

const Root = styled.div`
  background: #fff;
  padding: 16px;
`;
