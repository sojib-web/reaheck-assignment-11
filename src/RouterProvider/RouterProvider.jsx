import { createBrowserRouter } from "react-router";
import MainLayout from "../MainLayout/MainLayout";
import Home from "../Home/Home";
import SignUp from "../Components/SignUp/SignUp";
import Register from "../Components/register/register";
import AddServices from "../Components/AddServices/AddServices";
import PrivateRoute from "../Components/PrivateRoute/PrivateRoute";
import AllServicesPage from "../Components/AllServicesPage/AllServicesPage";
import ServiceDetailsPage from "../Components/ServiceDetailsPage/ServiceDetailsPage";
import MyServicesPage from "../Components/MyServicesPage/MyServicesPage";

import MyReviews from "../Components/MyReviews/MyReviews";
import NotFound from "../Components/NotFound/NotFound";
import Loading from "../Components/Loading/Loading";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        Component: Home,
        loader: () =>
          fetch(
            "https://service-review-system-server-nine.vercel.app/services"
          ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "login",
        Component: SignUp,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "services",
        element: (
          <PrivateRoute>
            <AddServices />
          </PrivateRoute>
        ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "allServices",
        Component: AllServicesPage,
        loader: () =>
          fetch(
            "https://service-review-system-server-nine.vercel.app/services"
          ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "/services/:id",

        element: (
          <PrivateRoute>
            <ServiceDetailsPage></ServiceDetailsPage>
          </PrivateRoute>
        ),
      },
      {
        path: "MyServices",
        element: (
          <PrivateRoute>
            <MyServicesPage></MyServicesPage>
          </PrivateRoute>
        ),
        loader: () =>
          fetch(
            "https://service-review-system-server-nine.vercel.app/services"
          ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "MyReviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),

        loader: () =>
          fetch(
            "https://service-review-system-server-nine.vercel.app/services"
          ),
        hydrateFallbackElement: <Loading />,
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
