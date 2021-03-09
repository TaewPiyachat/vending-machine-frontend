import styled from "styled-components";
import { useState, useEffect } from "react";
import { Divider, Space, List } from "antd";

import withAuth from "../../components/hoc/withAuth";
import withLayout from "../../components/hoc/withLayout";
import ListItem from "../../components/list";
import AmountModal from "../../components/amount-modal";

import { getProducts, addProducts } from "../../api";

const LocationList = (props) => {
  const [isVisible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const { notify } = props;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await getProducts().then((r) => r.json());
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
    setData(res.data);
    setVisible(false);
    if (res.notifyAdmin) notify();
  };

  const locationKeys = Object.keys(data);

  return (
    <Root>
      <Space direction="vertical" style={{ width: "100%" }}>
        {locationKeys.map((k) => {
          const products = data[k];
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

export default withAuth(withLayout(LocationList));

const Root = styled.div`
  background: #fff;
  padding: 16px;
`;
