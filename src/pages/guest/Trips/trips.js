import { Tabs, Table, Button } from "antd";
import { apis } from "../../../constants";
import { requestGet } from "../../../helpers/requestHandler";
import { useState, useEffect, useRef } from "react";
import trips from "./trips.module.scss";
import { EditOutlined } from "@ant-design/icons";
import PastTripsConfig from "./PastTripsConfig/PastTripsConfig";
import { formatNumberToPrice, momentToDate } from "../../../helpers/formatter";
import moment from "moment";

export default function Trips() {
  const configRef = useRef();

  const completed = [
    {
      title: "Tên nơi ở",
      key: "listing_name",
      dataIndex: "listing_name",
    },
    {
      title: "Ngày check-in",
      key: "checkin",
      dataIndex: "checkin",
      render: (checkin) => momentToDate(moment(checkin)),
    },
    {
      title: "Ngày check-out",
      key: "checkout",
      dataIndex: "checkout",
      render: (checkout) => momentToDate(moment(checkout)),
    },
    {
      title: "Số khách",
      key: "guests",
      dataIndex: "guests",
    },
    {
      title: "Tổng tiền",
      key: "price",
      dataIndex: "price",
      render: (price) => `${formatNumberToPrice(price)} đ`,
    },
    {
      title: "Đánh giá",
      key: "rating",
      dataIndex: "rating",
    },
    {
      title: "Bình luận",
      key: "review",
      dataIndex: "review",
    },
    {
      title: "",
      key: "action",
      dataIndex: "active",
      render: (active, trip) => (
        <Button
          icon={<EditOutlined />}
          type="primary"
          onClick={() => configRef.current.open(trip)}
        ></Button>
      ),
    },
  ];

  const upcoming = [
    {
      title: "Tên nơi ở",
      key: "listing_name",
      dataIndex: "listing_name",
    },
    {
      title: "Ngày check-in",
      key: "checkin",
      dataIndex: "checkin",
      render: (checkin) => momentToDate(moment(checkin)),
    },
    {
      title: "Ngày check-out",
      key: "checkout",
      dataIndex: "checkout",
      render: (checkout) => momentToDate(moment(checkout)),
    },
    {
      title: "Số khách",
      key: "guests",
      dataIndex: "guests",
    },
    {
      title: "Tổng tiền",
      key: "price",
      dataIndex: "price",
      render: (price) => `${formatNumberToPrice(price)} đ`,
    },
  ];

  const [completedPayout, setCompletedPayout] = useState([]);
  const [upcomingPayout, setUpcomingPayout] = useState([]);

  useEffect(() => {
    apiGetPastTrip();
  }, []);

  useEffect(() => {
    requestGet(apis.TRIPS_GUEST_UPCOMING).then((result) => {
      const data = result.data;

      console.log("Get Upcoming Trip", result.data);

      if (data.status) {
        setUpcomingPayout(
          data.result.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    });
  }, []);

  const apiGetPastTrip = async () => {
    try {
      const dataResponse = await requestGet(apis.TRIPS_GUEST_PAST);

      if (dataResponse.data.status) {
        const data = dataResponse.data;

        console.log("Get Past Trip", dataResponse.data);

        setCompletedPayout(
          data.result.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    } catch (error) {}
  };

  const { TabPane } = Tabs;
  return (
    <div className={trips["container"]}>
      <div className={trips["top"]}>
        <h1>Chuyến đi</h1>
      </div>

      <Tabs type="card">
        <TabPane tab="Chuyến đi đã qua" key="1">
          <Table dataSource={completedPayout} columns={completed} />
        </TabPane>

        <TabPane tab="Chuyến đi sắp tới" key="2">
          <Table dataSource={upcomingPayout} columns={upcoming} />
        </TabPane>
      </Tabs>

      <PastTripsConfig
        ref={configRef}
        onSuccess={apiGetPastTrip}
        setCompletedPayout={setCompletedPayout}
      />
    </div>
  );
}
