import { Avatar, Col, Row } from "antd";
import { useImperativeHandle } from "react";
import { useState } from "react";
import { forwardRef } from "react";
import notiPopup from "./notiPopup.module.scss";
import cn from "classnames";

const NotiPopup = forwardRef(({ className, isAtHome = false }, ref) => {
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    open() {
      setVisible(true);
    },
    close() {
      setVisible(false);
    },
  }));

  return visible ? (
    <div className={cn(notiPopup["container"], notiPopup["home"], className)}>
      <Row>
        <h3>Thông báo</h3>

        {sampleData.map((item) => (
          <Row
            className={notiPopup["card"]}
            gutter={20}
            wrap={false}
            align="middle"
          >
            <Col flex="50px">
              <Avatar size={50}></Avatar>
            </Col>

            <Col flex="auto">{item.title}</Col>
          </Row>
        ))}
      </Row>
    </div>
  ) : (
    <></>
  );
});

export default NotiPopup;

const sampleData = [
  ...Array.apply(null, Array(20)).map((_, i) => ({
    key: i,
    title:
      " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum, maiores!",
  })),
];
