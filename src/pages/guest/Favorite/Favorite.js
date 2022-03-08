import { Col, Row } from "antd";
import ListingCard from "../components/ListingCard/ListingCard";
import favorite from "./favorite.module.scss";

const Favorite = () => {
  return (
    <div className={favorite["container"]}>
      <h1>Danh sách yêu thích</h1>

      <br />

      <Row gutter={[20, 20]}>
        <Col span={8}>
          <ListingCard />
        </Col>

        <Col span={8}>
          <ListingCard />
        </Col>

        <Col span={8}>
          <ListingCard />
        </Col>

        <Col span={8}>
          <ListingCard />
        </Col>
      </Row>
    </div>
  );
};

export default Favorite;
