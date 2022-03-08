import { Link, withRouter } from "react-router-dom";
import headerCommon from "./headerCommon.module.scss";
import { paths, searchKeys } from "../../../constants";
import { LogoLight } from "../../../assets/images";
import { useEffect, useRef, useState } from "react";
import { BellOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import UserPopup from "../userPopup/UserPopup";
import { ClickOutside, useQuery } from "../../../hooks";
import SearchBar from "../../../components/SearchBar/SearchBar";
import { Avatar, Badge, Row } from "antd";
import { useSelector } from "react-redux";
import NotiPopup from "../NotiPopup/NotiPopup";
import cn from "classnames";

const HeaderCommon = ({ location }) => {
  const userBtnRef = useRef();
  const userPopupRef = useRef();
  const query = useQuery();
  const authReducer = useSelector((state) => state.auth);
  const { pathname } = location;
  const notiBtnRef = useRef();
  const notiPopupRef = useRef();

  const destination = query.get(searchKeys.DESTINATION);
  const checkin = query.get(searchKeys.CHECKIN);
  const checkout = query.get(searchKeys.CHECKOUT);
  const guests = query.get(searchKeys.GUESTS);

  const isHost = pathname.slice(0, paths.HOSTING.length) === paths.HOSTING;
  const isAtResults = pathname === paths.RESULTS;
  const isAtListingView =
    pathname.slice(0, paths.LISTING_VIEW_nId.length) === paths.LISTING_VIEW_nId;

  const [isUserBtnActive, setIsUserBtnActive] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isNotiBtnActive, setIsNotiBtnActive] = useState(false);

  useEffect(() => {
    setIsSearchActive(false);
    setIsUserBtnActive(false);
  }, [location]);

  ClickOutside({
    ref: userBtnRef,
    onClickOutside: () => {
      userPopupRef.current && userPopupRef.current.hidePopup();
      setIsUserBtnActive(false);
    },
  });

  ClickOutside({
    ref: notiBtnRef,
    onClickOutside: () => {
      notiPopupRef.current && notiPopupRef.current.close();
      setIsNotiBtnActive(false);
    },
  });

  return (
    <>
      <div
        className={
          headerCommon["container"] +
          " " +
          (isSearchActive ? "active-search" : "")
        }
        onClick={() => isSearchActive && setIsSearchActive(false)}
      >
        <div className="inner" onClick={(e) => e.stopPropagation()}>
          <div className="main">
            <div className="logo">
              <Link to={isHost ? paths.HOSTING : paths.HOME}>
                <img src={LogoLight} alt="" />
              </Link>
            </div>

            {(isAtResults || isAtListingView) && !isSearchActive && (
              <div
                className="mini-search-bar"
                onClick={() => !isSearchActive && setIsSearchActive(true)}
              >
                <div className="content">
                  <p>Tìm kiếm ngay...</p>
                </div>

                <div className="btn">
                  <SearchOutlined className="icon" />
                </div>
              </div>
            )}

            <Row className={headerCommon["right-container"]}>
              <div
                ref={notiBtnRef}
                className={cn(
                  headerCommon["noti-container"],
                  isNotiBtnActive && headerCommon["active"]
                )}
                onClick={() => {
                  if (!isNotiBtnActive) {
                    setIsNotiBtnActive(true);
                    setIsSearchActive(false);
                    notiPopupRef.current.open();
                  }
                }}
                style={
                  !authReducer.isOk ? { visibility: "hidden", opacity: 0 } : {}
                }
              >
                <Badge
                  count={1}
                  overflowCount={10}
                  style={{ marginTop: -5, marginRight: -5 }}
                >
                  <div className={cn(headerCommon["noti-btn"])}>
                    <BellOutlined />
                  </div>
                </Badge>

                <NotiPopup ref={notiPopupRef} />
              </div>

              <div ref={userBtnRef} className="user-wrap">
                <div
                  className={cn("user-btn", isUserBtnActive && "active")}
                  onClick={() => {
                    userPopupRef.current && userPopupRef.current.displayPopup();
                    setIsUserBtnActive((bool) => !bool);
                    setIsSearchActive(false);
                  }}
                >
                  {!!authReducer.isOk ? (
                    <Avatar src={authReducer.user.avatar} size={35}>
                      {authReducer.user.name}
                    </Avatar>
                  ) : (
                    <UserOutlined className="icon" />
                  )}
                </div>

                <UserPopup ref={userPopupRef} />
              </div>
            </Row>
          </div>

          {isSearchActive && (
            <>
              <SearchBar
                destination={destination}
                checkin={checkin}
                checkout={checkout}
                guests={guests | 0}
              />
              <div style={{ height: "35px" }} />
            </>
          )}
        </div>
      </div>

      <div className={headerCommon["sp-fixed"]} />
    </>
  );
};

export default withRouter(HeaderCommon);
