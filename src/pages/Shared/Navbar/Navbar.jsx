import React, { useState } from "react";
import LogoNavbar from "../../../assets/decor_nest_logo2_.png";
import { Link, NavLink } from "react-router-dom";
import LoginModal from "../../Auth/LoginModal/LoginModal";
import RegisterModal from "../../Auth/RegisterModal/RegisterModal";

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
      isActive
        ? "text-primary bg-primary/10"
        : "text-neutral hover:text-primary hover:bg-base-200"
    }`;

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
      <div className="navbar bg-base-100/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.05)] px-4 lg:px-10 sticky top-0 z-50">

        {/* LEFT */}
        <div className="navbar-start">

          {/* MOBILE MENU */}
          <div className="dropdown lg:hidden">

            <div tabIndex={0} role="button" className="btn btn-ghost">
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
            </div>

            <ul className="menu menu-sm dropdown-content mt-3 w-56 p-3 rounded-box bg-base-100 shadow-[0_10px_35px_rgba(17,24,39,0.08)] z-50">
              {links}
            </ul>

          </div>

          {/* BRAND */}
          <Link to="/" className="flex items-center gap-3">

            <img
              src={LogoNavbar}
              alt="Logo"
              className="h-10 w-10 object-contain"
            />

            <div className="leading-tight">
              <h2 className="text-xl font-bold text-neutral">
                DecorNest
              </h2>

              <p className="text-xs text-neutral/60 hidden sm:block">
                Crafting Beautiful Celebrations
              </p>
            </div>

          </Link>
        </div>

        {/* CENTER */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2">
            {links}
          </ul>
        </div>

        {/* RIGHT */}
        <div className="navbar-end gap-2">

          <button
            onClick={() => setShowLoginModal(true)}
            className="btn btn-sm bg-base-200 text-neutral hover:bg-primary hover:text-primary-content border-none rounded-lg transition-all"
          >
            Login
          </button>

          <button
            onClick={() => setShowRegisterModal(true)}
            className="btn btn-sm bg-primary text-primary-content hover:opacity-90 border-none rounded-lg transition-all"
          >
            Register
          </button>

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