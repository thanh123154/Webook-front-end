import { Button, Col, Drawer, Input, Row, Form, Rate } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";
import pastTripsConfig from "./pastTripsConfig.module.scss";
import { apis } from "../../../../constants";
import { requestPatch } from "../../../../helpers/requestHandler";

const PastTripsConfig = forwardRef(({ setCompletedPayout, onSuccess }, ref) => {
  const [visible, setVisible] = useState(false);
  const [form] = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [currentId, setCurrentId] = useState();

  useImperativeHandle(ref, () => ({
    open(data) {
      if (!!data) {
        form.setFields([
          { name: "review", value: data.review },
          { name: "rating", value: data.rating },
        ]);

        setCurrentId(data.id);
      }

      setVisible(true);
    },
  }));

  const updateData = async (dataRequest) => {
    setIsLoading(true);

    try {
      const dataResponse = await requestPatch(
        apis.UPDATE_PAST_TRIP + currentId,
        dataRequest
      );

      if (dataResponse.data.status) {
        // lấy cái result mới ra: dataResponse.data.result
        // setCompletedPayout(dataResponse.data.result)

        onSuccess();
        setIsLoading(false);
        onClose();
      } else {
        setIsLoading(false);
        console.log("Update fail", dataResponse);
      }
    } catch (error) {
      setIsLoading(false);
      console.log("Update error", error);
    }
  };

  const onFinish = (values) => {
    console.log(values);
    updateData(values);
  };

  const onClose = () => {
    form.resetFields();
    setCurrentId();
    setVisible(false);
  };

  return (
    <Drawer
      className={pastTripsConfig["container"]}
      visible={visible}
      title={"Review"}
      onClose={onClose}
      width={800}
      footer={
        <Row gutter={10}>
          <Col>
            <Button onClick={onClose} danger>
              Quay lại
            </Button>
          </Col>

          <Col>
            <Button
              onClick={() => form.submit()}
              type="primary"
              loading={isLoading}
            >
              Cập nhật
            </Button>
          </Col>
        </Row>
      }
    >
      <Form onFinish={onFinish} layout="vertical" form={form}>
        <Form.Item
          name="rating"
          label="Rate"
          rules={[{ required: true, message: "Hãy điền review" }]}
        >
          <Rate className={pastTripsConfig["rate_card"]} />
        </Form.Item>

        <Form.Item
          name="review"
          label="Đánh giá"
          rules={[{ required: true, message: "Hãy nhập đánh giá của bạn" }]}
        >
          <Input.TextArea placeholder="Nhập đánh giá" rows={4} />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default PastTripsConfig;
