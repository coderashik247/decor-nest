import Lottie from "lottie-react";
import forbiddenAnimation from "../../assets/forbidden.json";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-base-200 px-6 overflow-hidden relative">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-error/10 blur-3xl rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-80 h-80 bg-primary/10 blur-3xl rounded-full"></div>

      {/* MAIN CARD */}
      <div className="relative bg-base-100 border border-base-300 rounded-[36px] shadow-[0_20px_80px_rgba(0,0,0,0.12)] overflow-hidden max-w-5xl w-full grid lg:grid-cols-2 items-center">

        {/* LEFT CONTENT */}
        <div className="p-10 md:p-16">

          {/* BADGE */}
          <div className="inline-flex items-center gap-2 bg-error/10 text-error px-5 py-2 rounded-full text-sm font-semibold mb-6">

            <FaLock />

            Access Denied

          </div>

          {/* TITLE */}
          <h1 className="text-5xl md:text-6xl font-black text-secondary leading-tight">
            403
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-neutral">
            Forbidden Access
          </h2>

          {/* DESCRIPTION */}
          <p className="mt-5 text-base-content/70 leading-8 text-lg">
            You don&apos;t have permission to access this page.
            Please contact the administrator or return back
            to the homepage.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">

            <Link
              to="/"
              className="btn btn-primary rounded-full px-8 text-primary-content"
            >

              <FaArrowLeft />

              Back To Home

            </Link>

            <button className="btn btn-outline rounded-full px-8 border-base-300 hover:border-error hover:bg-error hover:text-white">

              Contact Support

            </button>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex items-center justify-center p-8 md:p-14 bg-linear-to-br from-error/5 to-primary/5 min-h-125">

          {/* INNER GLOW */}
          <div className="absolute w-64 h-64 bg-error/10 blur-3xl rounded-full"></div>

          {/* LOTTIE */}
          <div className="relative z-10 w-72 md:w-96">
            <Lottie
              animationData={forbiddenAnimation}
              loop={true}
            />
          </div>

        </div>

      </div>

    </section>
  );
};

export default Forbidden;