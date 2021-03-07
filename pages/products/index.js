import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Select, Row, Col, Divider, Modal } from "antd";

import MainLayout from "../../components/layout";
import ProductCard from "../../components/product-card";

import {
  getProductsByLocationId,
  buyProduct,
  getLocationOptions,
} from "../../api";

const { confirm } = Modal;

const ProductList = (props) => {
  const router = useRouter();
  const [products, setProducts] = useState(props.products);

  const {
    query: { location },
  } = router;

  const { options = [] } = props;

  useEffect(() => {
    router.push(`/products?location=${options[0]}`);
  }, []);

  const onChange = async (value) => {
    router.push(`/products?location=${value}`);
    const res = await getProductsByLocationId(value).then((r) => r.json());
    setProducts(res);
  };

  const onClickBuy = async (productId) => {
    const res = await buyProduct(location, productId).then((r) => r.json());
    setProducts(res.data);
  };

  const showConfirm = (productId) => {
    confirm({
      title: "Do you want to buy item?",
      icon: false,
      okText: "Buy",
      onOk() {
        onClickBuy(productId);
      },
      onCancel() {},
    });
  };

  return (
    <MainLayout>
      Select Location:{" "}
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select location"
        value={location}
        onChange={onChange}
        options={options.map((op) => {
          return { label: op, value: op };
        })}
      />
      <Divider style={{ borderColor: "#ccc" }} />
      <Root>
        <Row gutter={[16, 16]}>
          {products.map((p) => (
            <Col key={p.id} lg={8} xl={6}>
              <ProductCard {...p} onClickBuy={showConfirm} />
            </Col>
          ))}
        </Row>
      </Root>
    </MainLayout>
  );
};

ProductList.getInitialProps = async (ctx) => {
  const options = await getLocationOptions().then((r) => r.json());
  const products = await getProductsByLocationId(options[0]).then((r) =>
    r.json()
  );
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
