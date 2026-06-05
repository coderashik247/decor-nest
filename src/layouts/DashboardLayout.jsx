import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaCalendarCheck,
  FaCog,
  FaArrowLeft,
  FaMoneyBillWave,
  FaClipboardList,
  FaUserShield,
} from "react-icons/fa";

import { MdOutlineAddBusiness } from "react-icons/md";

import LogoNavbar from "../assets/decor_nest_logo2_.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const DashboardLayout = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut } = useAuth();
  const [role] = useRole();
 

  const roleLabel = {
    user: "Customer",
    admin: "Admin",
    decorator: "Decorator",
  };

  const { data: users = [] } = useQuery({
    enabled: role === "admin",
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const currentUser = users.find(
    (u) => u.email?.toLowerCase() === user?.email?.toLowerCase()
  );

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
      isActive
        ? "bg-primary text-black font-semibold shadow-md"
        : "hover:bg-base-300 text-base-content/70 hover:text-primary"
    }`;

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN */}
      <div className="drawer-content flex flex-col">
        {/* TOP BAR */}
        <div className="sticky top-0 z-40 bg-base-100/80 backdrop-blur border-b border-base-300">
          <div className="navbar px-4 lg:px-8 h-20">
            <div className="navbar-start">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-circle btn-ghost lg:hidden"
              >
                ☰
              </label>

              <div>
                <h2 className="text-2xl font-black text-secondary">
                  Dashboard
                </h2>
                <p className="text-xs text-base-content/60">
                  Manage everything in one place
                </p>
              </div>
            </div>

            <div className="navbar-end">
              <div className="flex items-center gap-3 bg-base-200 px-3 py-2 rounded-2xl">
                <div className="avatar">
                  <div className="w-10 rounded-xl">
                    <img
                      src={
                        currentUser?.photoURL ||
                        user?.photoURL ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt="user"
                    />
                  </div>
                </div>

                <div className="hidden md:block">
                  <p className="text-sm font-semibold">
                    {currentUser?.displayName || user?.displayName || "User"}
                  </p>
                  <p className="text-xs text-base-content/50 capitalize">
                    {roleLabel[role] || "Customer"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 lg:p-8">
          <div className="bg-base-100 rounded-3xl border border-base-300 min-h-[80vh] p-6">
            <Outlet />
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-80 bg-base-100 border-r border-base-300 flex flex-col min-h-screen">
          {/* LOGO */}
          <Link
            to="/"
            className="h-20 flex items-center px-6 border-b border-base-300"
          >
            <img src={LogoNavbar} className="w-10 h-10" />
            <div className="ml-3">
              <h2 className="font-black text-lg text-secondary">
                DecorNest
              </h2>
              <p className="text-xs text-base-content/50">
                Premium Dashboard
              </p>
            </div>
          </Link>

          {/* MENU */}
          <div className="flex-1 px-4 py-6 space-y-6">
            {/* COMMON */}
            <div>
              <p className="text-xs uppercase tracking-[3px] text-base-content/40 mb-3">
                General
              </p>

              <ul className="space-y-2">
                <li>
                  <NavLink to="/dashboard" end className={navLinkClass}>
                    <FaHome />
                    Home
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/my-bookings"
                    className={navLinkClass}
                  >
                    <FaCalendarCheck />
                    My Bookings
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/payment-history"
                    className={navLinkClass}
                  >
                    <FaMoneyBillWave />
                    Payments
                  </NavLink>
                </li>
              </ul>
            </div>

            {/* DECORATOR */}
            {role === "decorator" && (
              <div>
                <p className="text-xs uppercase tracking-[3px] text-base-content/40 mb-3">
                  Decorator Panel
                </p>

                <ul className="space-y-2">
                  <li>
                    <NavLink
                      to="/dashboard/assigned-projects"
                      className={navLinkClass}
                    >
                      <MdOutlineAddBusiness />
                      Assigned Projects
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/completed-projects"
                      className={navLinkClass}
                    >
                      <MdOutlineAddBusiness />
                      Completed Projects
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}

            {/* ADMIN */}
            {role === "admin" && (
              <div>
                <p className="text-xs uppercase tracking-[3px] text-base-content/40 mb-3">
                  Admin Panel
                </p>

                <ul className="space-y-2">
                  <li>
                    <NavLink
                      to="/dashboard/add-service"
                      className={navLinkClass}
                    >
                      <MdOutlineAddBusiness />
                      Add Service
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/manage-bookings"
                      className={navLinkClass}
                    >
                      <FaClipboardList />
                      Manage Bookings
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/user-management"
                      className={navLinkClass}
                    >
                      <FaUserShield />
                      Users
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}

            {/* SETTINGS */}
            <div>
              <p className="text-xs uppercase tracking-[3px] text-base-content/40 mb-3">
                System
              </p>

              <ul className="space-y-2">
                <li>
                  <NavLink
                    to="/dashboard/settings"
                    className={navLinkClass}
                  >
                    <FaCog />
                    Settings
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>

          {/* LOGOUT */}
          <div className="p-4 border-t border-base-300">
            <button
              onClick={handleLogout}
              className="btn w-full rounded-2xl bg-base-200 hover:bg-error hover:text-white"
            >
              <FaArrowLeft />
              Logout
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;