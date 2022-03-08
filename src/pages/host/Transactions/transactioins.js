import { Tabs, Table } from "antd";
import { apis } from "../../../constants";
import { requestGet } from "../../../helpers/requestHandler";
import { useState, useEffect } from "react";
import transactions from "./transactions.module.scss";
import moment from "moment";
import { formatNumberToPrice, momentToDate } from "../../../helpers/formatter";

export default function Transactions() {
  const completed = [
    {
      title: "Tên khách",
      key: "guest_name",
      dataIndex: "guest_name",
    },
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
  ];

  const upcoming = [
    {
      title: "Tên khách",
      key: "guest_name",
      dataIndex: "guest_name",
    },
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
  const [currentPayout, setCurrentPayout] = useState([]);

  useEffect(() => {
    requestGet(apis.TRANSACTIONS_HOST_CURRENT).then((result) => {
      const data = result.data;
      console.log(result);
      if (data.status) {
        setCurrentPayout(
          data.result.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    });
  }, []);

  useEffect(() => {
    requestGet(apis.TRANSACTIONS_HOST_PAST).then((result) => {
      const data = result.data;
      console.log(result);
      if (data.status) {
        setCompletedPayout(
          data.result.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    });
  }, []);

  useEffect(() => {
    requestGet(apis.TRANSACTIONS_HOST_UPCOMING).then((result) => {
      const data = result.data;
      console.log(result);
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

  const { TabPane } = Tabs;
  return (
    <div className={transactions["container"]}>
      <div className={transactions["top"]}>
        <h1>Lịch sử giao dịch</h1>
      </div>

      <Tabs type="card">
        <TabPane tab="Giao dịch quá khứ" key="1">
          <Table
            dataSource={completedPayout}
            columns={completed}
            pagination={false}
          />
        </TabPane>

        <TabPane tab="Giao dịch tương lai" key="2">
          <Table
            dataSource={upcomingPayout}
            columns={upcoming}
            pagination={false}
          />
        </TabPane>

        <TabPane tab="Giao dịch hiện tại" key="3">
          <Table
            dataSource={currentPayout}
            columns={upcoming}
            pagination={false}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}
