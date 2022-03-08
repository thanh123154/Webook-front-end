import auth from "./auth.module.scss";
import { LogoDark } from "../../../assets/images";
import { Link, useHistory } from "react-router-dom";
import paths from "../../../constants/paths";
import { Button, Col, Form, Input, notification, Row, Switch } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetAuth, doLogin, doSignup } from "../../../ducks/slices/authSlice";
import { useQuery } from "../../../hooks";
import { searchKeys } from "../../../constants";

export default function Auth() {
  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const query = useQuery();

  const history = useHistory();

  const [isLogin, setIsLogin] = useState(!query.get(searchKeys.SIGNUP));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const { isOk, message } = authReducer;

    if (isOk === true) {
      setIsLoading(false);
      notification.success({
        message: isLogin
          ? "Chào mừng bạn trở lại We Book!"
          : "Chào mừng bạn đến với We Book!",
        placement: "bottomLeft",
      });
      history.push(paths.HOME);
    }

    if (isOk === false) {
      setIsLoading(false);
      notification.error({ message: message });
      dispatch(resetAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReducer]);

  const handleSwitch = (checked) => {
    setIsLogin(!checked);
    if (!checked) history.push(paths.AUTH);
    else
      history.push({
        pathname: paths.AUTH,
        search: `?${searchKeys.SIGNUP}=true`,
      });
  };

  const onFinish = (values) => {
    if (isLogin) {
      dispatch(doLogin(values));
    } else dispatch(doSignup(values));

    setIsLoading(true);
  };

  return (
    <div className={auth["container"]}>
      <div className={auth["wrapper"]}>
        <Link className={auth["logo"]} to={paths.HOME}>
          <img src={LogoDark} alt="" />
        </Link>

        <Row className={auth["feature"]} justify="space-between" align="middle">
          <Col
            flex="150px"
            style={{
              textAlign: "end",
            }}
          >
            <span className={auth["ftr-txt"]}>Đăng nhập</span>
          </Col>

          <Col>
            <Switch
              defaultChecked={query.get(searchKeys.SIGNUP)}
              onChange={handleSwitch}
              className={auth["switch"]}
            />
          </Col>

          <Col flex="150px">
            <span className={auth["ftr-txt"]}>Đăng ký</span>
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
                className={auth["input"]}
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
              className={auth["input"]}
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
              className={auth["input"]}
            />
          </Form.Item>

          <Button
            block
            htmlType="submit"
            className={auth["btn"]}
            loading={isLoading}
          >
            Tiếp tục
          </Button>
        </Form>
      </div>
    </div>
  );
}
