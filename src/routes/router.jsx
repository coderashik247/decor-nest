import { createBrowserRouter } from "react-router-dom";
import RootLayouts from "../layouts/RootLayouts";
import Home from "../pages/Home/Home";
import Services from "../pages/Services/Services";
import Coverage from "../pages/Home/Coverage/Coverage";
import ServicesDetails from "../pages/ServicesDetails/ServicesDetails";
import { Component } from "react";
import ErrorPage from "../components/ErrorPage/ErrorPage";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import MyBookings from "../pages/Dashboard/MyBookings/MyBookings";
import PaymentSuccess from "../pages/Dashboard/PaymentSuccess/PaymentSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayouts,
    errorElement: <ErrorPage></ErrorPage>,
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
  {
    path: 'dashboard',
    element: <PrivateRoute> <DashboardLayout></DashboardLayout> </PrivateRoute>,
    children: [
        {
            path: 'my-bookings',
            Component: MyBookings
        },
        {
            path: 'payment-success',
            Component: PaymentSuccess
        }
    ]
    
  }
]);
