import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { memo } from "react";
import pickGuest from "./pickGuest.module.scss";

const PickGuest = ({ guests = 0, updateGuests = () => {} }) => {
  return (
    <Row
      className={pickGuest["container"]}
      align="middle"
      justify="space-between"
    >
      <Col>
        <p>Số khách</p>
      </Col>

      <Col>
        <button
          disabled={guests === 0}
          onClick={() => updateGuests(guests - 1)}
        >
          <MinusCircleOutlined />
        </button>

        <span className="data">{guests}</span>

        <button onClick={() => updateGuests(guests + 1)}>
          <PlusCircleOutlined />
        </button>
      </Col>
    </Row>
  );
};

export default memo(PickGuest);
