import { Divider, Switch } from "antd";
import { Link, useLocation } from "react-router-dom";
import { paths } from "../../../constants";
import userPopupHome from "./userPopupHome.module.scss";
import userPopupCommon from "./userPopupCommon.module.scss";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { localGet } from "../../../helpers/localHandler";
import { localKeys, searchKeys } from "../../../constants/keys";
import { useDispatch } from "react-redux";
import { doLogout } from "../../../ducks/slices/authSlice";

const UserPopup = forwardRef((props, ref) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const isAuth = localGet(localKeys.ACCESS_TOKEN) !== "";

  const isHost = pathname.slice(0, paths.HOSTING.length) === paths.HOSTING;
  const isAtHome = pathname === paths.HOME;

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
  }, [pathname]);

  useImperativeHandle(ref, () => ({
    displayPopup() {
      setVisible(true);
    },
    hidePopup() {
      setVisible(false);
    },
  }));

  const handleSwitch = () => {
    const path = isHost ? paths.HOME : paths.HOSTING;

    setTimeout(() => {
      window.location.href = path;
    }, 500);
  };

  return (
    visible && (
      <div
        className={
          isAtHome ? userPopupHome["container"] : userPopupCommon["container"]
        }
      >
        {isAuth ? (
          <>
            <div className="switch">
              <span>Khách</span>

              <Switch defaultChecked={isHost} onChange={handleSwitch} />

              <span>Chủ nhà</span>
            </div>

            <Divider className="divider" />

            {isHost ? (
              <>
                <Link
                  className={`dropdown-btn${
                    pathname === paths.LISTINGS ? " active" : ""
                  }`}
                  to={paths.LISTINGS}
                >
                  Quản lý nhà/phòng cho thuê
                </Link>

                <Link
                  className={`dropdown-btn${
                    pathname === paths.HISTORY ? " active" : ""
                  }`}
                  to={paths.HISTORY}
                >
                  Lịch sử giao dịch
                </Link>
              </>
            ) : (
              <>
                <Link
                  className={`dropdown-btn${
                    pathname === paths.TRIPS ? " active" : ""
                  }`}
                  to={paths.TRIPS}
                >
                  Chuyến đi
                </Link>

                <Link
                  className={`dropdown-btn${
                    pathname === paths.FAV_LIST ? " active" : ""
                  }`}
                  to={paths.FAV_LIST}
                >
                  Danh sách yêu thích
                </Link>
              </>
            )}

            <Divider className="divider" />

            {isHost && (
              <Link
                className={`dropdown-btn${
                  pathname === paths.PROFILE ? " active" : ""
                }`}
                to={paths.PROFILE}
              >
                Hồ sơ
              </Link>
            )}

            {!isHost && (
              <Link
                className={`dropdown-btn${
                  pathname === paths.LISTINGS ? " active" : ""
                }`}
                to={paths.LISTINGS}
              >
                Quản lý nhà/phòng cho thuê
              </Link>
            )}

            <Link
              className={`dropdown-btn${
                pathname === paths.ACCOUNT ? " active" : ""
              }`}
              to={paths.ACCOUNT}
            >
              Tài khoản
            </Link>

            <Divider className="divider" />

            <span className="dropdown-btn" onClick={() => dispatch(doLogout())}>
              Đăng xuất
            </span>
          </>
        ) : (
          <>
            <Link className="dropdown-btn" to={paths.AUTH}>
              Đăng nhập
            </Link>

            <Divider className="divider" />

            <Link
              className="dropdown-btn"
              to={{
                pathname: paths.AUTH,
                search: `?${searchKeys.SIGNUP}=true`,
              }}
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    )
  );
});

export default UserPopup;
