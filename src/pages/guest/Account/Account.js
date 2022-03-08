import { LockOutlined } from "@ant-design/icons";
import { Button, Input, Row, Form, Select, DatePicker } from "antd";
import account from "./account.module.scss";
import AvatarUser from "./components/avatarUser/AvatarUser";
import FieldContainer from "./components/fieldContainer/FieldContainer";
import { useMemo, useRef, useState } from "react";
import PasswordDrawer from "./components/passwordDrawer/PasswordDrawer";
import { useForm } from "antd/lib/form/Form";
import { useSelector, useDispatch } from "react-redux";
import { doEditUser, resetAuth } from "../../../ducks/slices/authSlice";
import { authCodes } from "../../../constants";
import {
  milliToDate,
  milliToMoment,
  momentToMilli,
} from "../../../helpers/formatter";

const fieldKeys = {
  AVATAR: "avatar",
  NAME: "name",
  GENDER: "gender",
  DOB: "dob",
  EMAIL: "email",
  PHONE: "phone",
  ADDRESS: "address",
};

export default function Account() {
  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [currentActiveField, setCurrentActiveField] = useState();
  const drawerRef = useRef();
  const [form] = useForm();

  const fieldRefs = {
    [fieldKeys.NAME]: useRef(),
    [fieldKeys.GENDER]: useRef(),
    [fieldKeys.DOB]: useRef(),
    [fieldKeys.EMAIL]: useRef(),
    [fieldKeys.PHONE]: useRef(),
    [fieldKeys.ADDRESS]: useRef(),
  };

  const userData = useMemo(
    () => {
      if (!!authReducer.isOk) {
        if (authReducer.message === authCodes["010"]) {
          if (!!currentActiveField) {
            fieldRefs[currentActiveField].current.toggleOff();
            setCurrentActiveField();
          }
          dispatch(resetAuth());
        }
        return authReducer.user;
      }
      return {};
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [authReducer]
  );

  const onFinish = (values) => {
    if (Object.keys(values)[0] === fieldKeys.DOB) {
      values[fieldKeys.DOB] = momentToMilli(values[fieldKeys.DOB]);
    }
    console.log(values);
    fieldRefs[Object.keys(values)[0]].current.loadingOn();
    dispatch(doEditUser(values));
  };

  const handleToggle = (key) => {
    if (!!currentActiveField) fieldRefs[currentActiveField].current.toggleOff();

    if (key === fieldKeys.DOB && !!userData[key]) {
      form.setFields([{ name: key, value: milliToMoment(userData[key]) }]);
    } else form.setFields([{ name: key, value: userData[key] }]);

    fieldRefs[key].current.toggleOn();

    setCurrentActiveField(key);
  };

  return (
    <div className={account["container"]}>
      <Row justify="space-between">
        <h1>Tài khoản</h1>

        <Button
          icon={<LockOutlined />}
          className={account["pass-btn"]}
          onClick={() => drawerRef.current.openDrawer()}
        >
          Đổi mật khẩu
        </Button>
      </Row>

      <div className={account["avatar"]}>
        <AvatarUser
          src={userData[fieldKeys.AVATAR]}
          txt={userData[fieldKeys.NAME]}
        />
      </div>

      <Form
        className={account["field-container"]}
        form={form}
        onFinish={onFinish}
      >
        <FieldContainer
          label="Họ và tên"
          value={userData[fieldKeys.NAME]}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.NAME]}
          onClickEdit={() => handleToggle(fieldKeys.NAME)}
        >
          <Form.Item
            name={fieldKeys.NAME}
            rules={[
              {
                required: true,
                message: "Hãy điền đầy đủ họ và tên",
              },
            ]}
          >
            <Input placeholder="Điền họ và tên của bạn" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Giới tính"
          value={userData[fieldKeys.GENDER]}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.GENDER]}
          onClickEdit={() => handleToggle(fieldKeys.GENDER)}
        >
          <Form.Item
            name={fieldKeys.GENDER}
            rules={[
              {
                required: true,
                message: "Hãy chọn giới tính",
              },
            ]}
          >
            <Select placeholder="Chọn giới tính của bạn">
              <Select.Option value="Nam">Nam</Select.Option>
              <Select.Option value="Nữ">Nữ</Select.Option>
              <Select.Option value="Khác">Khác</Select.Option>
            </Select>
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Ngày sinh"
          value={
            !!userData[fieldKeys.DOB]
              ? milliToDate(userData[fieldKeys.DOB])
              : ""
          }
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.DOB]}
          onClickEdit={() => handleToggle(fieldKeys.DOB)}
        >
          <Form.Item
            name={fieldKeys.DOB}
            rules={[
              {
                required: true,
                message: "Hãy chọn ngày tháng năm sinh",
              },
            ]}
          >
            <DatePicker format="DD/MM/YYYY" placeholder="DD/MM/YYYY" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Email"
          value={userData[fieldKeys.EMAIL]}
        ></FieldContainer>

        <FieldContainer
          label="Số điện thoại"
          value={userData[fieldKeys.PHONE]}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.PHONE]}
          onClickEdit={() => handleToggle(fieldKeys.PHONE)}
        >
          <Form.Item
            name={fieldKeys.PHONE}
            rules={[
              {
                required: true,
                message: "Hãy điền số điện thoại",
              },
              {
                pattern: /^[0]?[35789]\d{8}$/,
                message: "Hãy điền đúng định dạng số điện thoại",
              },
            ]}
          >
            <Input placeholder="Điền số điện thoại của bạn" />
          </Form.Item>
        </FieldContainer>

        <FieldContainer
          label="Địa chỉ"
          value={userData[fieldKeys.ADDRESS]}
          onSave={() => form.submit()}
          ref={fieldRefs[fieldKeys.ADDRESS]}
          onClickEdit={() => handleToggle(fieldKeys.ADDRESS)}
        >
          <Form.Item
            name={fieldKeys.ADDRESS}
            rules={[
              {
                required: true,
                message: "Hãy điền địa chỉ",
              },
            ]}
          >
            <Input placeholder="Điền địa chỉ sinh sống của bạn" />
          </Form.Item>
        </FieldContainer>
      </Form>

      <PasswordDrawer ref={drawerRef} />
    </div>
  );
}
