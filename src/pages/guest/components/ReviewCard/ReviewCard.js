import { Avatar, Col, Row } from "antd";
import reviewCard from "./reviewCard.module.scss";

const ReviewCard = ({ review = {} }) => {
  return (
    <div className={reviewCard["container"]}>
      <Row gutter={20} align="middle">
        <Col>
          <Avatar size={50}>{review.name}</Avatar>
        </Col>

        <Col>
          <h4>{review.name}</h4>
          <span className={reviewCard["date"]}>{review.date}</span>
        </Col>
      </Row>

      <p>{review.content}</p>
    </div>
  );
};

export default ReviewCard;
