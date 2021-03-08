import styled from "styled-components";
import { Divider, Space, List, Avatar } from "antd";

import MainLayout from "../../components/layout";
import Dot from "../../components/dot";

import { getProducts } from "../../api";

const LocationList = (props) => {

  const { data } = props;
  const locationKeys = Object.keys(data);

  return (
    <MainLayout>
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
                    const color =
                      item.quantity >= 10
                        ? "#87d068"
                        : quantity > 0
                        ? "orange"
                        : "red";

                    return (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar size={64} src={item.product_image} />}
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

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
