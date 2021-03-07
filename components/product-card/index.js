import styled from "styled-components";
import { Typography, Button } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";

const { Title } = Typography;

const ProductCard = (props) => {
  const {
    product_name,
    product_image,
    price,
    quantity,
    amount = 0,
    addProduct,
    removeProduct,
  } = props;
  return (
    <Root>
      <Image>
        <img src={product_image} alt={product_name} />
      </Image>
      <Title level={4}>{product_name}</Title>
      <Text>ราคา: {price} บาท</Text>
      <Text>จำนวน: {quantity} ขวด</Text>
      <ButtonGroup>
        <Button
          shape="circle"
          icon={<MinusOutlined />}
          onClick={addProduct}
        />
        <Amount strong>{amount}</Amount>
        <Button
          shape="circle"
          icon={<PlusOutlined />}
          onClick={removeProduct}
        />
      </ButtonGroup>
      <Button type="primary">BUY</Button>
    </Root>
  );
};

export default ProductCard;

const Root = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid #333;
  border-radius: 8px;
`;

const Image = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 8px;
  margin: 8px 0;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Text = styled(Typography.Text)`
  align-self: flex-start;
`;

const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const Amount = styled(Typography.Text)`
  color: #333;
  font-size: 24px;
  margin: 16px;
`;
