import React from "react";
import LogoNavbar from "../../../assets/decor_nest_logo2_.png";
import { Link, NavLink } from "react-router-dom";
import LoginModal from "../../Auth/LoginModal/LoginModal";
import RegisterModal from "../../Auth/RegisterModal/RegisterModal";
import useAuth from "../../../hooks/useAuth";
import useAuthModal from "../../../hooks/useAuthModal";
import { FaChartPie, FaPaintRoller, FaRightFromBracket } from "react-icons/fa6";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const {
    showLoginModal,
    setShowLoginModal,
    showRegisterModal,
    setShowRegisterModal,
  } = useAuthModal();

  // NAVLINK STYLE
  const linkClass = ({ isActive }) =>
    `relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-neutral hover:text-primary hover:bg-base-200"
    }`;

  // LOGOUT
  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink to="/services" className={linkClass}>
          Services
        </NavLink>
      </li>

      <li>
        <NavLink to="/about" className={linkClass}>
          About
        </NavLink>
      </li>

      <li>
        <NavLink to="/coverage" className={linkClass}>
          Coverage
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      {/* NAVBAR */}
      <div className="sticky top-0 z-50 border-b border-base-300/60 bg-base-100/85 backdrop-blur-xl">
        <div className="navbar  px-4 lg:px-8 min-h-20.5">
          {/* LEFT */}
          <div className="navbar-start gap-2">
            {/* MOBILE MENU */}
            <div className="dropdown lg:hidden">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content mt-4 w-64 rounded-3xl border border-base-300 bg-base-100 p-4 shadow-2xl z-999"
              >
                {links}

                {!user && (
                  <div className="mt-4 space-y-2">
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="btn btn-primary w-full rounded-xl"
                    >
                      Login
                    </button>

                    <button
                      onClick={() => setShowRegisterModal(true)}
                      className="btn btn-outline w-full rounded-xl"
                    >
                      Register
                    </button>
                  </div>
                )}
              </ul>
            </div>

            {/* LOGO */}
            <Link to="/" className="group flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl group-hover:bg-primary/30 transition-all duration-500"></div>

                <img
                  src={LogoNavbar}
                  alt="DecorNest Logo"
                  className="relative h-11 w-11 object-contain"
                />
              </div>

              <div className="hidden sm:block leading-tight">
                <h2 className="text-xl lg:text-2xl font-black tracking-tight text-neutral">
                  DecorNest
                </h2>

                <p className="text-xs text-neutral/60">
                  Luxury Event Decoration
                </p>
              </div>
            </Link>
          </div>

          {/* CENTER */}
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-2 rounded-full  bg-base-100 px-3 py-2">
              {links}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="navbar-end gap-3">
            {/* USER DROPDOWN */}
            {user ? (
              <div className="dropdown dropdown-end">
                {/* AVATAR BUTTON */}
                <label tabIndex={0} className="cursor-pointer">
                  <div className="flex items-center gap-3 rounded-full border border-base-300 bg-base-100 px-2 py-1.5 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                    <div className="avatar">
                      <div className="w-11 rounded-full border-2 border-primary shadow-md">
                        <img
                          src={
                            user?.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt={user?.displayName}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="hidden md:block leading-tight">
                      <h3 className="text-sm font-bold text-neutral">
                        {user?.displayName}
                      </h3>

                      <p className="text-xs text-neutral/60">Welcome Back 👋</p>
                    </div>
                  </div>
                </label>

                {/* DROPDOWN CONTENT */}
                <div
                  tabIndex={0}
                  className="dropdown-content mt-4 w-80 overflow-hidden rounded-[30px] border border-base-300 bg-base-100 shadow-[0_25px_80px_rgba(0,0,0,0.18)] z-999"
                >
                  {/* TOP */}
                  <div className="relative overflow-hidden bg-secondary px-6 py-6 text-white">
                    <div className="absolute -top-10 right-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl"></div>

                    <div className="relative flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-18 rounded-3xl border-2 border-primary">
                          <img
                            src={
                              user?.photoURL ||
                              "https://i.ibb.co/4pDNDk1/avatar.png"
                            }
                            alt={user?.displayName}
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>

                      <div className="min-w-0">
                        <h2 className="truncate text-lg font-bold">
                          {user?.displayName}
                        </h2>

                        <p className="truncate text-sm text-white/70">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* MENU */}
                  <div className="p-4 space-y-2">
                    <NavLink
                      to="/dashboard"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium hover:bg-primary/10 transition-all duration-300"
                    >
                      <span className="text-lg">
                        <FaChartPie color="#D4B06A" />
                      </span>
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/become-a-decorator"
                      className="flex items-center gap-3 rounded-2xl px-4 py-3 font-medium hover:bg-primary/10 transition-all duration-300"
                    >
                      <span className="text-lg">
                         <FaPaintRoller color="#D4B06A" />
                      </span>
                      Become A Decorator
                    </NavLink>

                    <button
                      onClick={handleLogOut}
                      className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 font-medium hover:bg-error hover:text-white transition-all duration-300"
                    >
                      <span className="text-lg">
                        <FaRightFromBracket/>
                      </span>
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* LOGIN */}
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden sm:flex btn btn-outline rounded-xl border-secondary px-5 text-secondary hover:bg-secondary hover:text-white"
                >
                  Login
                </button>

                {/* REGISTER */}
                <button
                  onClick={() => setShowRegisterModal(true)}
                  className="btn btn-primary rounded-xl px-5 text-primary-content shadow-lg hover:scale-[1.03] transition-all duration-300"
                >
                  Register
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <LoginModal
          setShowLoginModal={setShowLoginModal}
          setShowRegisterModal={setShowRegisterModal}
        />
      )}

      {/* REGISTER MODAL */}
      {showRegisterModal && (
        <RegisterModal
          setShowRegisterModal={setShowRegisterModal}
          setShowLoginModal={setShowLoginModal}
        />
      )}
    </>
  );
};

export default Navbar;
