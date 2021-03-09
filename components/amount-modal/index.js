import styled from "styled-components";
import { Modal, Form, Button, InputNumber } from "antd";

const AmountModal = (props) => {
  const { isVisible, setVisible, onFinish } = props;

  return (
    <Modal
      title="Add Items"
      visible={isVisible}
      footer={null}
      onCancel={() => setVisible(false)}
    >
      <Form name="basic" onFinish={onFinish} initialValues={{ amount: 1 }}>
        <Form.Item
          label="Amount"
          name="amount"
          rules={[{ required: true, message: "Please input your amount!" }]}
        >
          <InputNumber
            min={1}
            max={10}
            placeholder="Please input your amount"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <ButtonWrapper>
          <Button type="primary" htmlType="submit">
            Add
          </Button>
        </ButtonWrapper>
      </Form>
    </Modal>
  );
};

export default AmountModal;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
