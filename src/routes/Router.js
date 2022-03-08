import { BrowserRouter, Switch } from "react-router-dom";
import { paths } from "../constants";
import { Header } from "../layouts";
import { Auth, NotFound } from "../pages";
import { AuthRoute, PrivateRoute, PublicRoute } from "./RouteTypes";
import GuestRoutes from "./GuestRoutes";
import HostRoutes from "./HostRoutes";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />

      <Switch>
        <PublicRoute exact path={paths.NOT_FOUND} component={NotFound} />
        <AuthRoute exact path={paths.AUTH} component={Auth} />
        <PrivateRoute path={paths.HOSTING} component={HostRoutes} />
        <PublicRoute path={paths.HOME} component={GuestRoutes} />
      </Switch>
    </BrowserRouter>
  );
}
