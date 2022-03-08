import pickDateRange from "./pickDateRange.module.scss";
import Calendar from "../../../../../components/Calendar/Canlendar";
import { Button, Col, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import moment from "moment";
import { memo } from "react";

const PickDateRange = ({
  checkin,
  checkout,
  updateCheckin,
  updateCheckout,
}) => {
  const [offset, setOffset] = useState(0);
  const [isCheckinFilled, setIsCheckinFilled] = useState(false);

  useEffect(() => {
    if (checkin !== "") {
      setOffset(
        checkin
          .clone()
          .startOf("month")
          .diff(moment().startOf("month"), "month")
      );
    }
  }, [checkin]);

  const handleSelectDate = (val) => {
    if (!isCheckinFilled) {
      if (checkout !== "" && !!checkout && val.isAfter(checkout)) {
        updateCheckin(checkout);
        updateCheckout(val);
      } else updateCheckin(val);
      setIsCheckinFilled(true);
    } else if (isCheckinFilled) {
      if (checkin !== "" && !!checkin && val.isBefore(checkin)) {
        updateCheckout(checkin);
        updateCheckin(val);
      } else updateCheckout(val);
    }
  };

  return (
    <div className={pickDateRange["container"]}>
      <Row justify="space-between" align="middle">
        <button
          className="nav-btn"
          onClick={() => setOffset((i) => i - 1)}
          disabled={offset === 0}
        >
          <LeftOutlined />
        </button>

        <button className="nav-btn" onClick={() => setOffset((i) => i + 1)}>
          <RightOutlined />
        </button>
      </Row>

      <Row justify="space-between" gutter={{ sm: 50 }}>
        <Col span={12}>
          <Calendar
            offset={offset}
            chosenDate={[checkin, checkout]}
            onClick={handleSelectDate}
            className={pickDateRange["calendar"]}
          />
        </Col>

        <Col span={12}>
          <Calendar
            offset={offset + 1}
            chosenDate={[checkin, checkout]}
            onClick={handleSelectDate}
            className={pickDateRange["calendar"]}
          />
        </Col>
      </Row>

      <Row justify="end">
        <Button
          className={pickDateRange["del-btn"]}
          onClick={() => {
            updateCheckin("");
            updateCheckout("");
            setIsCheckinFilled(false);
          }}
        >
          Xoá ngày
        </Button>
      </Row>
    </div>
  );
};

export default memo(PickDateRange);
