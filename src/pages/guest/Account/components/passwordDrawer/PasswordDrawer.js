import { Button, Drawer, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { forwardRef, useImperativeHandle, useState } from "react";
import { apis } from "../../../../../constants";
import { requestPost } from "../../../../../helpers/requestHandler";
import { codeFormatter } from "../../../../../helpers/formatter";
import passwordDrawer from "./passwordDrawer.module.scss";

const PasswordDrawer = forwardRef((props, ref) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();

  useImperativeHandle(ref, () => ({
    openDrawer() {
      setDrawerVisible(true);
    },
  }));

  const onFinish = (values) => {
    console.log(values);

    const { currentPass, newPass, retypePass } = values;

    if (newPass !== retypePass) {
      form.setFields([
        { name: "retypePass", errors: ["Mật khẩu nhập lại không khớp"] },
      ]);
    } else {
      setIsLoading(true);

      requestPost(apis.USER, { currentPass, newPass }).then((result) => {
        const data = result.data;

        if (!data.status) {
          setIsLoading(false);
          form.setFields([
            {
              name: "currentPass",
              errors: [codeFormatter(data.code)],
            },
          ]);
        } else {
          setIsLoading(false);
          setDrawerVisible(false);
        }
      });
    }
  };

  return (
    <Drawer
      visible={drawerVisible}
      onClose={() => setDrawerVisible(false)}
      width={350}
    >
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <h2>Đổi mật khẩu</h2>

        <br />

        <Form.Item
          label="Mật khẩu cũ"
          name="currentPass"
          rules={[{ required: true, message: "Hãy điền đầy đủ" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Mật khẩu mới"
          name="newPass"
          rules={[{ required: true, message: "Hãy điền đầy đủ" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu mớI"
          name="retypePass"
          rules={[{ required: true, message: "Hãy điền đầy đủ" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            loading={isLoading}
            className={passwordDrawer["update-btn"]}
            block
          >
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default PasswordDrawer;
