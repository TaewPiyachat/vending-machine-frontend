import styled from "styled-components";
import { PlusOutlined } from "@ant-design/icons";
import { List as AntList, Button, Avatar, Space } from "antd";

import Dot from "../../components/dot";

const ListItem = (props) => {
  const { item, addItems } = props;
  const { price, quantity, product_image, product_name } = item;

  const color = quantity >= 10 ? "#87d068" : quantity > 0 ? "orange" : "red";

  return (
    <AntList.Item
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ borderRadius: 4 }}
          onClick={() => addItems(item)}
        >
          Add
        </Button>
      }
    >
      <AntList.Item.Meta
        avatar={<Avatar size={64} src={product_image} />}
        title={<span>{product_name}</span>}
        description={
          <DescWrapper>
            <span>Price: {price} ฿</span>
            <span>
              <Space>
                <Dot color={color} />
                Available stock: {quantity.toString()} item(s)
              </Space>
            </span>
          </DescWrapper>
        }
      />
    </AntList.Item>
  );
};

export default ListItem;

const DescWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
