import styled from "styled-components";
import { Divider, Space, List, Avatar } from "antd";

import MainLayout from "../../components/layout";

import { getProducts } from "../../api";

const LocationList = (props) => {
  const { data } = props;
  const locationKeys = Object.keys(data);

  return (
    <MainLayout>
      <Root>
        <Space direction="vertical">
          {locationKeys.map((k) => {
            const products = data[k];
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
      </Root>
    </MainLayout>
  );
};

LocationList.getInitialProps = async (ctx) => {
  const { data } = await getProducts().then((r) => r.json());
  return {
    data,
  };
};

export default LocationList;

const Root = styled.div`
  background: #fff;
  padding: 16px;
`;
