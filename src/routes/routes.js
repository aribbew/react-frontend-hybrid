import routerAdmin from "./routes.admin";
import routerClient from "./routes.client";
import { basicLayout } from "../layout";
import { Error404 } from "../pages";
const routes = [
  ...routerAdmin,
  ...routerClient,
  {
    layout: basicLayout,
    component: Error404,
  },
];

export default routes;
