import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import Coverage from "../pages/Home/Coverage/Coverage";
import ServicesDetails from "../pages/ServicesDetails/ServicesDetails";
import AuthLayouts from "../layouts/AuthLayouts";
import { Component } from "react";
import Login from "../pages/Auth/LoginModal/LoginModal";
import Register from "../pages/Auth/RegisterModal/RegisterModal";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/services",
        Component: Services,
      },
      {
        path: "/services/:serviceId",
        Component: ServicesDetails,
      },
      {
        path: "/coverage",
        element: <Coverage></Coverage>,
      },
    ],
  },
]);
