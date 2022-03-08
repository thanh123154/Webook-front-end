import { Col, Row } from "antd";
import searchBar from "./searchPopup.module.scss";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { paths } from "../../../constants";

export default function GuestsPopup({ guests, updateGuests }) {
  const { pathname } = useLocation();
  const isAtHome = pathname === paths.HOME;

  return (
    <div
      className={
        searchBar["pop-up"] +
        " " +
        searchBar["guest"] +
        " " +
        (isAtHome ? "home" : "")
      }
    >
      <Row className="wrap" align="middle" justify="space-between">
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
    </div>
  );
}
