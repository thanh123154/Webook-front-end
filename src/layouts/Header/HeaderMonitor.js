import { withRouter } from "react-router-dom";
import { paths } from "../../constants";
import HeaderCommon from "./headerCommon/HeaderCommon";
import HeaderHome from "./headerHome/HeaderHome";

const HeaderMonitor = ({ location }) => {
  const { pathname } = location;

  const isAtHome = pathname === paths.HOME;
  const isAtAuth = pathname === paths.AUTH;

  if (isAtAuth) return null;

  return isAtHome ? <HeaderHome /> : <HeaderCommon />;
};

export default withRouter(HeaderMonitor);
