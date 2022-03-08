import { Switch, Redirect } from "react-router-dom";
import { paths } from "../constants";
import {
  Account,
  Favorite,
  Home,
  ListingView,
  ProfileView,
  Results,
  Trips,
} from "../pages";
import { PrivateRoute, PublicRoute } from "./RouteTypes";

export default function GuestRoutes() {
  return (
    <Switch>
      <PublicRoute exact path={paths.HOME} component={Home} />
      <PublicRoute exact path={paths.RESULTS} component={Results} />
      <PublicRoute path={paths.LISTING_VIEW_wId} component={ListingView} />
      <PublicRoute path={paths.PROFILE_VIEW_wId} component={ProfileView} />
      <PrivateRoute exact path={paths.ACCOUNT} component={Account} />
      <PrivateRoute exact path={paths.TRIPS} component={Trips} />
      <PrivateRoute exact path={paths.FAV_LIST} component={Favorite} />
      <Redirect to={paths.NOT_FOUND} />
    </Switch>
  );
}
