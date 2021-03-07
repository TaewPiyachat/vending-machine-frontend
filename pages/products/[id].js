import { useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Select, Row, Col, Divider } from "antd";

import MainLayout from "../../components/layout";
import ProductCard from "../../components/product-card";

import { getProducts, buyProduct, getLocationOptions } from "../../api";

const ProductList = (props) => {
  const [products, setProducts] = useState(props.products);
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { options = [] } = props;

  const onChange = async (value) => {
    router.push(`/products/${value}`);
    const res = await getProducts(value).then((r) => r.json());
    setProducts(res);
  };

  const onClickBuy = async (productId) => {
    const res = await buyProduct(id, productId).then((r) => r.json());
    setProducts(res.data);
  };

  return (
    <MainLayout>
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select location"
        defaultValue={id}
        onChange={onChange}
        options={options.map((op) => {
          return { label: op, value: op };
        })}
      />
      <Divider />
      <Root>
        <Row gutter={16}>
          {products.map((p) => (
            <Col key={p.id} span={6}>
              <ProductCard {...p} onClickBuy={onClickBuy} />
            </Col>
          ))}
        </Row>
      </Root>
    </MainLayout>
  );
};

ProductList.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const [products, options] = await Promise.all([
    getProducts(query.id).then((r) => r.json()),
    getLocationOptions().then((r) => r.json()),
  ]);
  return {
    options,
    products,
  };
};

export default ProductList;

const Root = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
`;
