import fieldContainer from "./fieldContainer.module.scss";
import { CloseOutlined, EditOutlined } from "@ant-design/icons";
import { forwardRef, useImperativeHandle, useState } from "react";
import { Button, Col, Row } from "antd";

const FieldContainer = forwardRef(
  ({ children, label, value, onSave, onClickEdit }, ref) => {
    const [editVisible, setEditVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useImperativeHandle(ref, () => ({
      toggleOn() {
        setEditVisible(true);
      },
      toggleOff() {
        if (isLoading) setIsLoading(false);
        setEditVisible(false);
      },
      loadingOn() {
        setIsLoading(true);
      },
    }));

    return (
      <Row className={fieldContainer["row"]} wrap={false}>
        <Col flex="160px" className={fieldContainer["cell"]}>
          <label>{label}</label>
        </Col>

        <Col flex="auto" className={fieldContainer["cell"]}>
          {editVisible ? (
            <>
              {children}
              <Button
                onClick={onSave}
                loading={isLoading}
                className={fieldContainer["save-btn"]}
              >
                Lưu
              </Button>
            </>
          ) : !!value ? (
            <span>{value}</span>
          ) : (
            <span style={{ color: "#00000060" }}>Chưa có dữ liệu</span>
          )}
        </Col>

        <Col flex="0px" className={fieldContainer["cell"]}>
          {!children ? (
            <></>
          ) : !editVisible ? (
            <EditOutlined
              onClick={onClickEdit}
              className={fieldContainer["btn"]}
            />
          ) : (
            <CloseOutlined
              onClick={() => setEditVisible(false)}
              className={fieldContainer["btn"]}
            />
          )}
        </Col>
      </Row>
    );
  }
);

export default FieldContainer;
