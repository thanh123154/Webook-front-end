import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Col, notification, Row, Table, Tabs } from "antd";
import { useEffect, useState } from "react";
import { apis } from "../../../../constants";
import {
  requestGet,
  requestPatch,
  requestPost,
} from "../../../../helpers/requestHandler";
import moment from "moment";
import { milliToMoment } from "../../../../helpers/formatter";

const BookingList = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  useEffect(() => {
    apiGetAllBooking();
  }, []);

  const apiGetAllBooking = async () => {
    try {
      setLoadingTable(true);

      const response = await requestGet(apis.BOOKING);

      if (response.data.status) {
        setDataSource(
          response.data.result.map((booking) => ({
            ...booking,
            key: booking.id,
          }))
        );

        setLoadingTable(false);
      } else {
        console.log("Get all booking fail", response.data);
        setLoadingTable(false);
      }
    } catch (error) {
      console.log("Get all booking error", error);
      setLoadingTable(false);
    }
  };

  const apiUpdateBooking = async (booking = {}, is_denied) => {
    try {
      setLoadingTable(true);

      const requestData = {
        id: booking.id,
        is_denied,
      };

      const response = await requestPatch(apis.BOOKING, requestData);

      if (response.data.status) {
        setDataSource(
          response.data.result.map((booking) => ({
            ...booking,
            key: booking.id,
          }))
        );

        setLoadingTable(false);

        notification.success({
          message: `Bạn đã ${
            is_denied ? "từ chối" : "chấp nhận"
          } yêu cầu đặt phòng`,
          placement: "bottomLeft",
        });

        requestPost(apis.NEW_TRANSACTION, {
          ...booking,
          checkin: milliToMoment(booking.checkin),
          checkout: milliToMoment(booking.checkout),
        }).then((result) => {
          const resData = result.data;

          if (resData.status) {
            console.log("Create transaction success");
          } else {
            console.log("Create transaction fail");
          }
        });
      } else {
        console.log("Update booking fail", response.data);
        setLoadingTable(false);
      }
    } catch (error) {
      console.log("Update booking error", error);
      setLoadingTable(false);
    }
  };

  const columns = [
    {
      title: "Thời gian đặt",
      key: "create_at",
      dataIndex: "create_at",
      render: (create_at) =>
        moment(create_at).utcOffset(14).format("DD/MM/YYYY HH:mm"),
    },
    { title: "Khách thuê", key: "guest_name", dataIndex: "guest_name" },
    { title: "Nhà ở", key: "listing_name", dataIndex: "listing_name" },
    {
      title: "Ngày đến",
      key: "checkin",
      dataIndex: "checkin",
      render: (checkin) =>
        milliToMoment(checkin).utcOffset(14).format("DD/MM/YYYY"),
    },
    {
      title: "Ngày đi",
      key: "checkout",
      dataIndex: "checkout",
      render: (checkout) =>
        milliToMoment(checkout).utcOffset(14).format("DD/MM/YYYY"),
    },
    {
      title: "Số lượng khách",
      key: "guests",
      dataIndex: "guests",
      render: (guests) => `${guests} người`,
    },
    {
      title: "Tổng tiền",
      key: "total",
      dataIndex: "total",
      render: (total) => `${total} đ`,
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      render: (_, booking) => (
        <Row gutter={10}>
          <Col>
            <Button
              icon={<CheckOutlined />}
              type="primary"
              onClick={() => apiUpdateBooking(booking, false)}
            ></Button>
          </Col>

          <Col>
            <Button
              icon={<CloseOutlined />}
              type="primary"
              danger
              onClick={() => apiUpdateBooking(booking, true)}
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div>
      <h3>Danh sách đặt phòng</h3>
      <br />

      <Tabs defaultActiveKey="1" type="card">
        <Tabs.TabPane tab={`Hàng chờ phê duyệt (${dataSource.length})`} key="1">
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            loading={loadingTable}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab={`Hiện đang đón tiếp (0)`} key="2">
          <Table
            columns={columns}
            dataSource={[]}
            pagination={false}
            loading={loadingTable}
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default BookingList;
