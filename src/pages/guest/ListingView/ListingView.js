import { Link, useParams } from "react-router-dom";
import listingView from "./listingView.module.scss";
import { useState, useEffect } from "react";
import { requestGet } from "../../../helpers/requestHandler";
import { apis, paths } from "../../../constants";
import {
  Avatar,
  Col,
  Divider,
  Image,
  Row,
  Skeleton,
  Tooltip,
  Button,
} from "antd";
import {
  AppstoreOutlined,
  EnvironmentOutlined,
  HeartOutlined,
  QuestionCircleOutlined,
  StarFilled,
} from "@ant-design/icons";
import GalleryModal from "./GalleryModal/GalleryModal";
import { useRef } from "react";
import BookingBox from "./BookingBox/BookingBox";
import { useHistory } from "react-router-dom";
import ReviewCard from "../components/ReviewCard/ReviewCard";

export default function ListingView() {
  const { id } = useParams();
  const galleryRef = useRef();
  const history = useHistory();

  const [listing, setListing] = useState({
    gallery: "[]",
    place: {},
    amenity: [],
    host: {},
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id !== "undefined") {
      requestGet(apis.LISTING_GUEST + "/" + id)
        .then((res) => {
          const dataRes = res.data;

          if (dataRes.status) {
            setListing(dataRes.result);
            setIsLoading(false);
          }
        })
        .catch((err) => console.log("get listing detail error", err));
    } else {
      history.goBack();
    }
  }, [history, id]);

  return !isLoading ? (
    <div className={listingView["container"]}>
      <div className={listingView["top"]} justify="space-between">
        <h1 className={listingView["head"]}>{listing.name}</h1>

        <Row justify="space-between">
          <Row align="middle">
            <EnvironmentOutlined />
            <p className={listingView["sub-head"]}>{listing.destination}</p>
          </Row>

          <Button icon={<HeartOutlined />} className={listingView["save-btn"]}>
            Lưu
          </Button>
        </Row>
      </div>

      <div className={listingView["gallery"]}>
        {JSON.parse(listing.gallery)
          .slice(0, 3)
          .map((src, i) => (
            <Image
              src={src}
              alt=""
              className={listingView["gallery-item"]}
              key={i}
            />
          ))}

        <Button
          icon={<AppstoreOutlined />}
          onClick={() => galleryRef.current.open(JSON.parse(listing.gallery))}
        >
          Hiển thị đầy đủ
        </Button>
      </div>

      <Row className={listingView["mid"]}>
        <Col span={16} style={{ paddingRight: 100 }}>
          <Row align="middle">
            <h2>{listing.place.name}</h2>
            <Tooltip placement="top" title={listing.place.desc}>
              <QuestionCircleOutlined />
            </Tooltip>
          </Row>

          <Row>
            <span className={listingView["num"]}>{listing.guests} khách</span>

            <span className={listingView["num"]}>
              {listing.bedrooms} phòng ngủ
            </span>

            <span className={listingView["num"]}>{listing.beds} giường</span>

            <span className={listingView["num"]}>
              {listing.bathrooms} phòng tắm
            </span>
          </Row>

          <Divider />

          <h2 style={{ marginBottom: 10 }}>Mô tả</h2>
          <p className={listingView["desc"]}>{listing.detail}</p>

          <Divider />

          <h2 style={{ marginBottom: 10 }}>Tiện nghi</h2>
          <Row gutter={[20, 10]}>
            {listing.amenity.map((item) => (
              <Col span={12} key={item.id}>
                <span className={listingView["amenity"]}>{item.name}</span>
              </Col>
            ))}
          </Row>

          <Divider />

          <Row align="middle">
            <Link to={paths.PROFILE_VIEW_nId + listing.host.id}>
              <Avatar size={60} src={listing.host.avatar}>
                {listing.host.name}
              </Avatar>
            </Link>

            <Link to={paths.PROFILE_VIEW_nId + listing.host.id}>
              <h3 style={{ marginLeft: 20 }}>Chủ nhà {listing.host.name}</h3>
            </Link>
          </Row>
        </Col>

        <Col span={8}>
          <BookingBox price={listing.price} listing_id={listing.id} />
        </Col>
      </Row>

      <div className={listingView["reviews-container"]}>
        <Divider style={{ marginTop: -25 }} />

        <h2 className={listingView["reviews"]}>
          <StarFilled />{" "}
          {sampleData.length > 0 ? (
            <>
              5<span className={listingView["counts"]}>20 đánh giá</span>
            </>
          ) : (
            "Mới (chưa có đánh giá)"
          )}
        </h2>

        {sampleData.length > 0 && (
          <>
            <br />

            <Row gutter={[50, 30]}>
              {sampleData.map((review) => (
                <Col span={12} key={review.key}>
                  <ReviewCard review={review} />
                </Col>
              ))}
            </Row>

            <br />

            <Button>Xem thêm</Button>
          </>
        )}
      </div>

      <GalleryModal ref={galleryRef} />
    </div>
  ) : (
    <div className={listingView["container-preview"]}>
      <div className={listingView["wrapper"]}>
        <Skeleton.Button
          active
          shape="round"
          size="large"
          className={listingView["title"]}
        />

        <Skeleton.Button
          active
          shape="round"
          className={listingView["sub-title"]}
        />
      </div>

      <Row className={listingView["gallery"]} wrap={false}>
        <Skeleton.Avatar
          active
          shape="square"
          className={listingView["gallery-item"]}
        />

        <Skeleton.Avatar
          active
          shape="square"
          className={listingView["gallery-item"]}
        />

        <Skeleton.Avatar
          active
          shape="square"
          className={listingView["gallery-item"]}
        />
      </Row>
    </div>
  );
}

const sampleData = [
  ...Array.apply(null, Array(0)).map((_, i) => ({
    key: i,
    name: "Lorem ipsum",
    date: "31/12/2021",
    rating: "5",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla, sequi.",
  })),
];
