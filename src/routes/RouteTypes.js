import { localKeys, paths } from "../constants";
import { localGet } from "../helpers/localHandler";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { doGetUser } from "../ducks/slices/authSlice";

export const AuthRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localGet(localKeys.ACCESS_TOKEN) !== "";

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth ? <Redirect to={paths.HOME} /> : <Component {...props} />;
      }}
    />
  );
};

export const PrivateRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localGet(localKeys.ACCESS_TOKEN) !== "";

  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (isAuth && !authReducer.isOk) {
    dispatch(doGetUser());
  }

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth ? <Component {...props} /> : <Redirect to={paths.AUTH} />;
      }}
    />
  );
};

export const PublicRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localGet(localKeys.ACCESS_TOKEN) !== "";

  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (isAuth && !authReducer.isOk) {
    dispatch(doGetUser());
  }

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};
