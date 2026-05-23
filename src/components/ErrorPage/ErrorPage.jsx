import React from "react";
import Lottie from "lottie-react";
import errorAnimation from "../../assets/error.json";
import { Link, useRouteError } from "react-router-dom";
import {
  FaArrowLeft,
  FaHome,
  FaExclamationTriangle,
} from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <section className="min-h-screen bg-base-200 flex items-center justify-center px-6 py-10 overflow-hidden relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-error/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 blur-3xl rounded-full"></div>

      {/* MAIN CARD */}
      <div className="relative max-w-6xl w-full bg-base-100 border border-base-300 rounded-[36px] overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.12)] grid lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="p-10 md:p-16 flex flex-col justify-center">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-error/10 text-error px-5 py-2 rounded-full text-sm font-semibold mb-6 w-fit">

            <FaExclamationTriangle />

            Oops! Something Went Wrong

          </div>

          {/* ERROR CODE */}
          <h1 className="text-6xl md:text-7xl font-black text-secondary">
            {error?.status || "404"}
          </h1>

          {/* TITLE */}
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-neutral leading-tight">
            {error?.statusText || "Page Not Found"}
          </h2>

          {/* MESSAGE */}
          <p className="mt-5 text-base-content/70 leading-8 text-lg">
            {error?.data ||
              "The page you are looking for doesn’t exist or an unexpected error occurred."}
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link
              to="/"
              className="btn btn-primary rounded-full px-8 text-primary-content"
            >

              <FaHome />

              Back To Home

            </Link>

            <button
              onClick={() => window.history.back()}
              className="btn btn-outline rounded-full px-8 border-base-300 hover:border-primary hover:bg-primary hover:text-primary-content"
            >

              <FaArrowLeft />

              Go Back

            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex items-center justify-center bg-linear-to-br from-error/5 to-primary/5 min-h-125 p-8 md:p-14">

          {/* INNER GLOW */}
          <div className="absolute w-72 h-72 bg-error/10 blur-3xl rounded-full"></div>

          {/* LOTTIE */}
          <div className="relative z-10 w-72 md:w-96">
            <Lottie
              animationData={errorAnimation}
              loop={true}
            />
          </div>

        </div>

      </div>

    </section>
  );
};

export default ErrorPage;