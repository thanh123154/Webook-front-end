import {
  HomeFilled,
  MailFilled,
  PhoneFilled,
  StarFilled,
} from "@ant-design/icons/lib/icons";
import { Avatar, Button, Col, Divider, Input, Row, Tabs } from "antd";
import { Link } from "react-router-dom";
import profile from "./profile.module.scss";
import paths from "../../../constants/paths";
import { useState } from "react";
import ListingCard from "../../guest/components/ListingCard/ListingCard";
import ReviewCard from "../../guest/components/ReviewCard/ReviewCard";

const Profile = () => {
  // eslint-disable-next-line no-unused-vars
  const [isSaving, setIsSaving] = useState(false);

  return (
    <Row className={profile["container"]}>
      <Col flex="350px" className={profile["left-col"]}>
        <div className={profile["avatar"]}>
          <Avatar size={130}>TQN</Avatar>

          <br />
          <br />

          <h3>Trần Quang Nguyên</h3>
          <span>20 tuổi</span>
        </div>

        <Row gutter={10} className={profile["more-info"]} align="middle">
          <Col>
            <MailFilled />
          </Col>

          <Col>tranquangnguyen2811@gmail.com</Col>
        </Row>

        <Row gutter={10} className={profile["more-info"]} align="middle">
          <Col>
            <PhoneFilled />
          </Col>
          <Col>0902223120</Col>
        </Row>

        <Row gutter={10} className={profile["more-info"]} align="middle">
          <Col>
            <HomeFilled />
          </Col>
          <Col>Thanh Xuân, Hà Nội</Col>
        </Row>

        <br />

        <Row justify="center">
          <Link to={paths.ACCOUNT}>
            <Button type="primary">Cài đặt tài khoản</Button>
          </Link>
        </Row>
      </Col>

      <Col flex="auto">
        <h1>Xin chào, tôi là Trần Quang Nguyên</h1>
        <span>Bắt đầu tham gia vào năm 2021</span>

        <br />
        <br />
        <br />

        <h2>Giới thiệu</h2>

        <Input.TextArea rows={4} />

        <br />
        <br />

        <Row justify="end">
          <Button type="primary" loading={isSaving}>
            Lưu
          </Button>
        </Row>

        <Divider />

        <Row align="middle" justify="space-between">
          <h2 style={{ marginBottom: 0 }}>
            Nhà/phòng cho thuê của Trần Quang Nguyên
          </h2>

          <Link to={paths.LISTINGS}>
            <Button type="primary">Cài đặt</Button>
          </Link>
        </Row>
        <br />

        <Row gutter={[20, 20]}>
          <Col span={12}>
            <ListingCard isHost />
          </Col>

          <Col span={12}>
            <ListingCard isHost />
          </Col>
        </Row>

        <Divider />

        <Row align="middle" gutter={10}>
          <Col>
            <StarFilled style={{ fontSize: 20 }} />
          </Col>

          <Col>
            <h2 style={{ marginBottom: 0 }}>0 đánh giá</h2>
          </Col>
        </Row>

        <br />

        <Tabs type="card">
          <Tabs.TabPane tab={`Từ khách (0)`} key="1">
            <br />

            <Row gutter={[20, 20]}>
              <Col span={12}>
                <ReviewCard />
              </Col>

              <Col span={12}>
                <ReviewCard />
              </Col>

              <Col span={12}>
                <ReviewCard />
              </Col>

              <Col span={12}>
                <ReviewCard />
              </Col>
            </Row>
          </Tabs.TabPane>

          <Tabs.TabPane tab={`Từ chủ nhà (0)`} key="2">
            <br />

            <Row gutter={[20, 20]}>
              <Col span={12}>
                <ReviewCard />
              </Col>

              <Col span={12}>
                <ReviewCard />
              </Col>

              <Col span={12}>
                <ReviewCard />
              </Col>

              <Col span={12}>
                <ReviewCard />
              </Col>
            </Row>
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};

export default Profile;
