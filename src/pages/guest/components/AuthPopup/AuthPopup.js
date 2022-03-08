import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Row,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import { useImperativeHandle } from "react";
import { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doLogin,
  doSignup,
  resetAuth,
} from "../../../../ducks/slices/authSlice";
import authPopup from "./authPopup.module.scss";

const AuthPopup = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.auth);

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
  }));

  useEffect(() => {
    const { isOk, message } = authReducer;

    if (isOk === true) {
      setIsLoading(false);
      setVisible(false);
    }

    if (isOk === false) {
      setIsLoading(false);
      notification.error({ message: message });
      dispatch(resetAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReducer]);

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    if (isLogin) {
      dispatch(doLogin(values));
    } else dispatch(doSignup(values));

    setIsLoading(true);
  };

  return (
    <Modal
      className={authPopup["container"]}
      visible={visible}
      title={null}
      footer={null}
      onCancel={onClose}
    >
      <h2>
        Vui lòng đăng nhập <br /> để đặt phòng!
      </h2>

      <Row
        className={authPopup["feature"]}
        justify="space-between"
        align="middle"
      >
        <Col
          flex="150px"
          style={{
            textAlign: "end",
          }}
        >
          <span className={authPopup["ftr-txt"]}>Đăng nhập</span>
        </Col>

        <Col>
          <Switch
            onChange={(val) => setIsLogin(!val)}
            className={authPopup["switch"]}
          />
        </Col>

        <Col flex="150px">
          <span className={authPopup["ftr-txt"]}>Đăng ký</span>
        </Col>
      </Row>

      <Form onFinish={onFinish}>
        {!isLogin && (
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Hãy nhập họ tên",
              },
            ]}
          >
            <Input
              placeholder="Họ và tên"
              prefix={<UserOutlined />}
              className={authPopup["input"]}
            />
          </Form.Item>
        )}

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Hãy nhập email",
            },
            {
              pattern: /\S+@\S+\.\S+/,
              message: "Hãy nhập đúng định dạng email",
            },
          ]}
        >
          <Input
            placeholder="Email"
            prefix={<MailOutlined />}
            className={authPopup["input"]}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Hãy nhập mật khẩu",
            },
          ]}
        >
          <Input.Password
            placeholder="Mật khẩu"
            prefix={<LockOutlined />}
            className={authPopup["input"]}
          />
        </Form.Item>

        <Button
          block
          htmlType="submit"
          className={authPopup["btn"]}
          loading={isLoading}
        >
          Tiếp tục
        </Button>
      </Form>
    </Modal>
  );
});

export default AuthPopup;
