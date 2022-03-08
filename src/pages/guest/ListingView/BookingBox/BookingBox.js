import { Button, Col, Divider, notification, Row } from "antd";
import { memo, useRef, useState } from "react";
import bookingBox from "./bookingBox.module.scss";
import { DownOutlined } from "@ant-design/icons";
import cn from "classnames";
import PickDateRange from "./PickDateRange/PickDateRange";
import { ClickOutside } from "../../../../hooks";
import PickGuest from "./PickGuest/PickGuest";
import { requestPost } from "../../../../helpers/requestHandler";
import { apis, localKeys } from "../../../../constants";
import { useSelector } from "react-redux";
import AuthPopup from "../../components/AuthPopup/AuthPopup";
import { StarFilled } from "@ant-design/icons";
import { localGet } from "../../../../helpers/localHandler";

const BookingBox = ({ listing_id = "", price = 0 }) => {
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState(0);
  const [visiblePickDate, setVisiblePickDate] = useState(false);
  const [visiblePickGuest, setVisiblePickGuest] = useState(false);
  const dateRangeRef = useRef();
  const guestRef = useRef();
  const authReducer = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const authRef = useRef();

  ClickOutside({
    ref: dateRangeRef,
    onClickOutside: () => {
      setVisiblePickDate(false);
    },
  });

  ClickOutside({
    ref: guestRef,
    onClickOutside: () => {
      setVisiblePickGuest(false);
    },
  });

  // console.log(authReducer);

  const apiCreateBooking = async () => {
    if (!!authReducer.isOk) {
      try {
        setIsLoading(true);

        const request = {
          guest_id: authReducer.user.id,
          listing_id: listing_id,
          checkin: checkin.valueOf(),
          checkout: checkout.valueOf(),
          total: Math.round(price * checkout.diff(checkin, "days")),
          guests: guests,
        };

        let accessToken = localGet(localKeys.ACCESS_TOKEN);

        if (accessToken === "") {
          accessToken = authReducer.accessToken;
        }

        const response = await requestPost(apis.BOOKING, request, {
          Authorization: "bearer " + accessToken,
        });

        if (response.data.status) {
          notification.success({
            message:
              "Đã gửi yêu cầu đặt phòng! Vui lòng chờ đợi chủ nhà xác nhận.",
            placement: "bottomLeft",
          });

          setCheckin("");
          setCheckout("");
          setGuests(0);
          setIsLoading(false);
        } else {
          console.log("Booking fail", response.data);

          setIsLoading(false);
        }
      } catch (error) {
        console.log("Booking error", error);

        setIsLoading(false);
      }
    } else {
      authRef.current.open();
    }
  };

  return (
    <div className={bookingBox["container"]}>
      <Row align="middle" justify="space-between">
        <h3 className={bookingBox["price"]}>
          {price} <span>đ / đêm</span>
        </h3>

        <Row align="middle">
          <StarFilled style={{ marginRight: 5 }} />
          <span>Mới</span>
        </Row>
      </Row>

      <Row
        className={cn(
          bookingBox["pick-date"],
          visiblePickDate && bookingBox["active"]
        )}
        onClick={() => setVisiblePickDate(true)}
        ref={dateRangeRef}
      >
        <Col span={12} className={bookingBox["left-col"]}>
          <label>Nhận phòng</label>
          <p
            className={cn(
              bookingBox["data"],
              checkin !== "" && bookingBox["filled"]
            )}
          >
            {checkin !== "" ? checkin.format("DD/MM/YYYY") : "Thêm ngày"}
          </p>
        </Col>

        <Col span={12} className={bookingBox["right-col"]}>
          <label>Trả phòng</label>
          <p
            className={cn(
              bookingBox["data"],
              checkout !== "" && bookingBox["filled"]
            )}
          >
            {checkout !== "" ? checkout.format("DD/MM/YYYY") : "Thêm ngày"}
          </p>
        </Col>

        {visiblePickDate && (
          <PickDateRange
            checkin={checkin}
            checkout={checkout}
            updateCheckin={setCheckin}
            updateCheckout={setCheckout}
          />
        )}
      </Row>

      <Divider
        style={{
          margin: 0,
          backgroundColor: `#000000${
            !visiblePickDate && !visiblePickGuest ? "30" : ""
          }`,
        }}
      />

      <Row
        className={cn(
          bookingBox["pick-guest"],
          visiblePickGuest && bookingBox["active"]
        )}
        align="middle"
        justify="space-between"
        onClick={() => setVisiblePickGuest(true)}
        ref={guestRef}
      >
        <Col>
          <label>Khách</label>
          <p
            className={cn(
              bookingBox["data"],
              guests !== 0 && bookingBox["filled"]
            )}
          >
            {guests === 0 ? "Thêm khách" : `${guests} khách`}
          </p>
        </Col>

        <Col>
          <DownOutlined />
        </Col>

        {visiblePickGuest && (
          <PickGuest guests={guests} updateGuests={setGuests} />
        )}
      </Row>

      <Button
        block
        className={bookingBox["book-btn"]}
        onClick={apiCreateBooking}
        loading={isLoading}
        disabled={
          !authReducer.isOk
            ? false
            : checkin === "" || checkout === "" || guests === 0
        }
      >
        {!!authReducer.isOk ? "Đặt phòng" : "Đăng nhập để đặt phòng"}
      </Button>

      {checkin !== "" && checkout !== "" && guests !== 0 && (
        <div className={bookingBox["price-cal"]}>
          <Row align="middle" justify="space-between" gutter={10}>
            <Col>
              {price}đ x {checkout.diff(checkin, "days")} đêm
            </Col>
            <Col>{price * checkout.diff(checkin, "days")}đ</Col>
          </Row>

          <Row align="middle" justify="space-between" gutter={10}>
            <Col>Phụ phí</Col>
            <Col>0đ</Col>
          </Row>

          <Divider style={{ marginBlock: 15 }} />

          <Row
            align="middle"
            justify="space-between"
            gutter={10}
            className={bookingBox["total"]}
          >
            <Col>Tổng</Col>
            <Col>{Math.round(price * checkout.diff(checkin, "days"))}đ</Col>
          </Row>
        </div>
      )}

      <AuthPopup ref={authRef} />
    </div>
  );
};

export default memo(BookingBox);
