import React from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaCalendarCheck,
  FaCog,
  FaBars,
  FaBell,
  FaSearch,
  FaArrowLeft,
  FaMoneyBillWave,
  FaClipboardList,
  FaUserShield,
} from "react-icons/fa";

import LogoNavbar from "../assets/decor_nest_logo2_.png";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import { MdOutlineAddBusiness } from "react-icons/md";

const DashboardLayout = () => {
  const axiosSecure = useAxiosSecure();
  const { user, logOut } = useAuth(); // assuming logOut exists
  const [role] = useRole();

  const roleLabel = {
    user: "Customer",
    admin: "Admin",
    moderator: "Moderator",
  };

  // GET ALL USERS
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // FIND CURRENT USER (safe compare)
  const currentUser = users.find(
    (u) => u.email?.toLowerCase() === user?.email?.toLowerCase(),
  );

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${
      isActive
        ? "bg-primary text-black font-semibold shadow-lg"
        : "hover:bg-base-300 text-base-content/70 hover:text-primary"
    }`;

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* TOP NAVBAR */}
        <div className="sticky top-0 z-40 bg-base-100/80 backdrop-blur-xl border-b border-base-300">
          <div className="navbar px-4 lg:px-8 h-20">
            {/* LEFT */}
            <div className="navbar-start gap-3">
              <label
                htmlFor="dashboard-drawer"
                className="btn btn-circle btn-ghost lg:hidden"
              >
                <FaBars className="text-lg" />
              </label>

              <div>
                <h2 className="text-2xl font-black text-secondary">
                  Dashboard
                </h2>
                <p className="text-sm text-base-content/60 hidden sm:block">
                  Manage your decoration services easily
                </p>
              </div>
            </div>

            {/* RIGHT */}
            <div className="navbar-end gap-3">
              {/* SEARCH */}
              <div className="hidden md:flex items-center bg-base-200 rounded-2xl px-4 h-12 w-72">
                <FaSearch className="text-base-content/40" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent outline-none px-3 w-full"
                />
              </div>

              {/* NOTIFICATION */}
              <button className="btn btn-circle bg-base-200 border-none hover:bg-primary hover:text-black">
                <FaBell />
              </button>

              {/* USER */}
              <div className="flex items-center gap-3 bg-base-200 rounded-2xl px-3 py-2">
                <div className="avatar">
                  <div className="w-11 rounded-2xl border-2 border-primary">
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

                <div className="hidden md:block leading-tight">
                  <h3 className="font-semibold text-sm">
                    {currentUser?.displayName || user?.displayName || "User"}
                  </h3>

                  <p className="text-xs text-base-content/50 capitalize">
                    {roleLabel[currentUser?.role] || "Customer"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PAGE CONTENT */}
        <div className="p-4 lg:p-8">
          <div className="bg-base-100 rounded-4xl border border-base-300 min-h-[calc(100vh-150px)] p-5 lg:p-8 shadow-sm">
            <Outlet />
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side z-50">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-80 bg-base-100 border-r border-base-300 min-h-screen flex flex-col">
          {/* LOGO */}
          <Link
            to="/"
            className="h-20 flex items-center px-6 border-b border-base-300"
          >
            <div className="flex items-center gap-4">
              <img
                src={LogoNavbar}
                alt="logo"
                className="w-12 h-12 object-contain"
              />

              <div>
                <h2 className="text-2xl font-black text-secondary">
                  DecorNest
                </h2>
                <p className="text-xs text-base-content/50">
                  Premium Dashboard
                </p>
              </div>
            </div>
          </Link>

          {/* MENU */}
          <div className="flex-1 px-4 py-6">
            <p className="text-xs uppercase tracking-[4px] text-base-content/40 px-4 mb-5">
              Main Menu
            </p>

            <ul className="space-y-2">
              <li>
                <NavLink to="/" className={navLinkClass}>
                  <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                    <FaHome />
                  </div>
                  <span>Homepage</span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/my-bookings" className={navLinkClass}>
                  <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                    <FaCalendarCheck />
                  </div>
                  <span>My Bookings</span>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard/payment-history"
                  className={navLinkClass}
                >
                  <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                    <FaMoneyBillWave />
                  </div>
                  <span>Payment History</span>
                </NavLink>
              </li>

              {/* Decorator Routes only */}
              {role === "decorator" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/assigned-projects"
                      className={navLinkClass}
                    >
                      <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                        <MdOutlineAddBusiness />
                      </div>
                      <span>Assigned Projects</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/completed-projects"
                      className={navLinkClass}
                    >
                      <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                        <MdOutlineAddBusiness />
                      </div>
                      <span>Completed Projects</span>
                    </NavLink>
                  </li>
                </>
              )}

              {/* Admin Rotues only */}
              {role === "admin" && (
                <>
                  <li>
                    <NavLink
                      to="/dashboard/add-service"
                      className={navLinkClass}
                    >
                      <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                        <MdOutlineAddBusiness />
                      </div>
                      <span>Add Service</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/approve-decorators"
                      className={navLinkClass}
                    >
                      <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                        <MdOutlineAddBusiness />
                      </div>
                      <span>Approve Decorators</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/manage-bookings"
                      className={navLinkClass}
                    >
                      <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                        <FaClipboardList />
                      </div>
                      <span>Manage Bookings</span>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/user-management"
                      className={navLinkClass}
                    >
                      <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                        <FaUserShield />
                      </div>
                      <span>User Management</span>
                    </NavLink>
                  </li>
                </>
              )}

              <li>
                <NavLink to="/dashboard/settings" className={navLinkClass}>
                  <div className="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center">
                    <FaCog />
                  </div>
                  <span>Settings</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* LOGOUT */}
          <div className="p-4 border-t border-base-300">
            <button
              onClick={handleLogout}
              className="btn w-full rounded-2xl bg-base-200 border-none hover:bg-error hover:text-white"
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
