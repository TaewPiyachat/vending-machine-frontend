import styled from "styled-components";
import { Typography, Button as AntButton, Space } from "antd";

import Dot from "../dot";

const { Paragraph, Title, Text } = Typography;

const ProductCard = (props) => {
  const {
    id,
    product_name,
    product_image,
    price,
    quantity,
    onClickBuy,
  } = props;

  const color = quantity >= 10 ? "#87d068" : quantity > 0 ? "orange" : "red";

  return (
    <Root>
      <Image>
        <img src={product_image} alt={product_name} />
      </Image>
      <Paragraph
        strong
        ellipsis
        style={{ margin: 0, width: "100%", textAlign: "center" }}
      >
        {product_name}
      </Paragraph>
      <Space>
        <Dot color={color} />
        <Title level={4} style={{ margin: 0 }}>
          {price} ฿
        </Title>
        <Text>({quantity})</Text>
      </Space>
      <Button
        type="primary"
        style={{ marginTop: 8 }}
        disabled={!quantity}
        onClick={() => onClickBuy(id)}
      >
        {!quantity ? "OUT OF STOCK" : "BUY"}
      </Button>
    </Root>
  );
};

export default ProductCard;

const Root = styled.div`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Image = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  margin: 8px 0;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Button = styled(AntButton)`
  width: 150px;
  border-radius: 4px;
`;
