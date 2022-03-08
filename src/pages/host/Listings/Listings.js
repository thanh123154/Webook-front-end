import listings from "./listings.module.scss";
import { Table, Row, Button, Tag, Col } from "antd";
import { useState, useEffect, useRef } from "react";
import {
  requestGet,
  requestPatch,
  requestPost,
} from "../../../helpers/requestHandler";
import { apis } from "../../../constants";
import { EditOutlined, SyncOutlined } from "@ant-design/icons";
import ListingConfig from "./ListingConfig/ListingConfig";
import moment from "moment";
import SwitchState from "./components/SwitchState/SwitchState";

export default function Listings() {
  const configRef = useRef();
  const switchRef = useRef();

  const [listingList, setListingList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    requestGet(apis.LISTING_HOST)
      .then((result) => {
        const data = result.data;

        if (data.status) {
          setListingList(
            data.data.map((item) => ({
              ...item,
              key: item.id,
            }))
          );
        }

        setIsLoading(false);
      })
      .catch((err) => console.log("get listing fail", err));
  }, []);

  const columns = [
    { title: "Tên nơi ở", key: "name", dataIndex: "name" },
    {
      title: "Trạng thái",
      key: "active",
      dataIndex: "active",
      render: (active) =>
        active > 0 ? (
          <Tag color="green">Hoạt động</Tag>
        ) : (
          <Tag color="red">Tạm dừng</Tag>
        ),
    },
    { title: "Vị trí", key: "address", dataIndex: "address" },
    {
      title: "Giá/đêm",
      key: "price",
      dataIndex: "price",
      render: (price) => `${price | 0}đ`,
    },
    {
      title: "Sửa đổi lần cuối",
      key: "updated_at",
      dataIndex: "updated_at",
      render: (updated_at) =>
        moment(updated_at).utcOffset(14).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: "",
      key: "action",
      dataIndex: "active",
      width: "0px",
      render: (active, listing) => (
        <Row gutter={10} wrap={false}>
          <Col>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => configRef.current.open(listing)}
            ></Button>
          </Col>

          <Col>
            <Button
              icon={<SyncOutlined />}
              type="primary"
              danger
              onClick={() => switchRef.current.open(listing)}
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  const handleCreate = async (dataReq = {}) => {
    try {
      const res = await requestPost(apis.LISTING_HOST, dataReq);
      const resData = res.data;

      if (resData.status) {
        setListingList(
          resData.data.map((item) => ({
            ...item,
            key: item.id,
          }))
        );
      }
    } catch (error) {
      console.log("create listing fail", error);
    }
  };

  const handleUpdate = async (id, dataReq = {}) => {
    if (!!id) {
      try {
        const res = await requestPatch(apis.LISTING_HOST + "/" + id, dataReq);
        const resData = res.data;

        if (resData.status) {
          setListingList(
            resData.data.map((item) => ({
              ...item,
              key: item.id,
            }))
          );
        }
      } catch (error) {
        console.log("update listing fail", error);
      }
    }
  };

  return (
    <div className={listings["container"]}>
      <Row justify="space-between" className={listings["top"]}>
        <h1>Danh sách nơi ở</h1>

        <Button
          className={listings["btn"]}
          onClick={() => configRef.current.open()}
          type="primary"
        >
          Tạo mới
        </Button>
      </Row>

      <Table
        dataSource={listingList}
        columns={columns}
        loading={isLoading}
        pagination={false}
      />

      <ListingConfig
        ref={configRef}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
      />

      <SwitchState ref={switchRef} onSwitch={handleUpdate} />
    </div>
  );
}
