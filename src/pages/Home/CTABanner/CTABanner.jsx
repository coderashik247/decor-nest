import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const CTABanner = () => {
  return (
    <section className="py-24 px-4 lg:px-10">

      <div className="">

        <div className="relative overflow-hidden rounded-[40px]">

          {/* BACKGROUND IMAGE */}
          <img
            src="https://i.ibb.co.com/hJFzSyhK/photo-1772127822525-7eda37383b9f.avif"
            alt="CTA Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-linear-to-r from-secondary/95 via-secondary/80 to-secondary/50"></div>

          {/* GLOW EFFECT */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-3xl rounded-full"></div>

          {/* CONTENT */}
          <div className="relative z-10 px-6 md:px-16 py-24 lg:py-32">

            <div className="max-w-3xl">

              {/* TAG */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md mb-7">

                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>

                <p className="text-white/80 text-sm tracking-[3px] uppercase font-semibold">
                  Luxury Decoration Experience
                </p>

              </div>

              {/* HEADING */}
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white">

                Ready To Create Your

                <span className="block text-primary mt-2">
                  Dream Event?
                </span>

              </h2>

              {/* DESCRIPTION */}
              <p className="mt-7 text-white/70 text-sm md:text-lg leading-8 max-w-2xl">

                Transform your wedding, birthday, holud, corporate event,
                or home decoration into a luxurious unforgettable experience
                with our expert decorators and premium styling services.

              </p>

              {/* BUTTONS */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mt-10">

                {/* PRIMARY BTN */}
                <button className="group btn bg-primary hover:bg-primary border-none rounded-full px-8 h-14 text-base text-primary-content font-semibold shadow-lg shadow-primary/30">

                  Book Decoration

                  <FaArrowRight className="ml-2 group-hover:translate-x-1 transition duration-300" />

                </button>

                {/* SECONDARY BTN */}
                <Link to="/services" className="btn h-14 px-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white backdrop-blur-md">

                  Explore Services

                </Link>

              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-14">

                <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5">

                  <h3 className="text-3xl font-bold text-primary">
                    500+
                  </h3>

                  <p className="text-white/70 text-sm mt-1">
                    Events Completed
                  </p>

                </div>

                <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5">

                  <h3 className="text-3xl font-bold text-primary">
                    4.9★
                  </h3>

                  <p className="text-white/70 text-sm mt-1">
                    Client Rating
                  </p>

                </div>

                <div className="bg-white/10 border border-white/10 backdrop-blur-md rounded-2xl px-6 py-5 col-span-2 md:col-span-1">

                  <h3 className="text-3xl font-bold text-primary">
                    64
                  </h3>

                  <p className="text-white/70 text-sm mt-1">
                    District Coverage
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default CTABanner;