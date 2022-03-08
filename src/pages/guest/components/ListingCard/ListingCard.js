import { HeartFilled, HeartTwoTone, StarFilled } from "@ant-design/icons";
import { notification } from "antd";
import { useState } from "react";
import { memo } from "react";
import { Link } from "react-router-dom";
import { paths } from "../../../../constants";
import listingCard from "./listingCard.module.scss";

const ListingCard = ({ listing = {}, isHost = false }) => {
  const [favCheck, setFavCheck] = useState(false);

  return (
    <div className={listingCard["container"]}>
      <div className="thumbnail">
        <Link
          className={listingCard["container"]}
          to={paths.LISTING_VIEW_nId + listing.id}
        >
          <img
            src={!!listing.gallery ? JSON.parse(listing.gallery)[0] : undefined}
            alt=""
          />
        </Link>

        {!isHost &&
          (favCheck ? (
            <div
              className={listingCard["fav-wrap"]}
              onClick={(e) => {
                e.stopPropagation();
                setFavCheck(false);
                notification.open({
                  message: "Đã lưu vào danh sách yêu thích!",
                  placement: "bottomLeft",
                });
              }}
            >
              <HeartFilled className={listingCard["fav-check"]} />
            </div>
          ) : (
            <div
              className={listingCard["fav-wrap"]}
              onClick={(e) => {
                e.stopPropagation();
                setFavCheck(true);
                notification.open({
                  message: "Đã xoá khỏi danh sách yêu thích!",
                  placement: "bottomLeft",
                });
              }}
            >
              <HeartTwoTone
                className={listingCard["fav-check"]}
                twoToneColor="#ff4d4f"
              />
            </div>
          ))}
      </div>

      <div className="content">
        <div className="rating">
          <StarFilled className="icon" />
          {/* <p>5 (12)</p> */}
          <p>Mới</p>
        </div>

        <h3>{listing.name || "Unknowned Name"}</h3>

        {!isHost && (
          <p className="pricing">
            <span>{listing.price || "0"} VND</span> / đêm
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(ListingCard);
