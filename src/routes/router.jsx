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
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ManageBookings from "../pages/Dashboard/Admin/ManageBookings/ManageBookings";
import AdminRoute from "./AdminRoute";
import UserManagement from "../pages/Dashboard/Admin/UserManagement/UserManagement";
import BecomeADecorator from "../pages/BecomeADecorator/BecomeADecorator";
import AddService from "../pages/Dashboard/Admin/AddService/AddService";
import ApproveDecorators from "../pages/Dashboard/Admin/ApproveDecorators/ApproveDecorators";

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
        loader: () => fetch("serviceCenters.json").then((res) => res.json()),
      },
      {
        path: "/coverage",
        element: <Coverage></Coverage>,
      },
      {
        path: "/become-a-decorator",
        Component: BecomeADecorator,
        loader: () => fetch("serviceCenters.json").then((res) => res.json()),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        {" "}
        <DashboardLayout></DashboardLayout>{" "}
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-bookings",
        Component: MyBookings,
      },
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-history",
        Component: PaymentHistory,
      },
      // Admin routes only
      {
        path: "add-service",
        element: (
          <AdminRoute>
            <AddService></AddService>
          </AdminRoute>
        ),
      },
      {
        path: "approve-decorators",
        element: (
          <AdminRoute>
            <ApproveDecorators></ApproveDecorators>
          </AdminRoute>
        ),
      },
      {
        path: "manage-bookings",
        element: (
          <AdminRoute>
            {" "}
            <ManageBookings></ManageBookings>{" "}
          </AdminRoute>
        ),
      },
      {
        path: "user-management",
        element: (
          <AdminRoute>
            {" "}
            <UserManagement></UserManagement>{" "}
          </AdminRoute>
        ),
      },
    ],
  },
]);
