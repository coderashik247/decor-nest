import React, { useState } from "react";
import { FaArrowRight, FaArrowLeft, FaStar } from "react-icons/fa";
import Reveal from "../../animation/Reveal";

const Decorator = () => {
  const decorators_data = [
    {
      image:
        "https://i.ibb.co.com/0Lp4nTg/846e4f05-ab90-4cd6-941e-2273efeeddf8.jpg",
      team_name: "Bloom & Wedding Co.",
      specialty: "Wedding Stage Decoration",
      experience: "6 Years",
      ratings: 4.9,
    },
    {
      image:
        "https://i.ibb.co.com/67jBMBPF/f8ecc39e-ce11-4ee4-a352-32b449da9135.jpg",
      team_name: "Dream Balloon Studio",
      specialty: "Birthday Decoration",
      experience: "4 Years",
      ratings: 4.8,
    },
    {
      image:
        "https://i.ibb.co.com/ksjrzD4t/1d8079e9-9974-43b3-a49e-39ca903906c1.jpg",
      team_name: "Elegant Home Decor",
      specialty: "Interior Styling",
      experience: "5 Years",
      ratings: 4.7,
    },
    {
      image:
        "https://i.ibb.co.com/7tnKzJd1/9b6d20a7-a7ce-4f9f-a1a1-8b177b431977.jpg",
      team_name: "Golden Holud Creations",
      specialty: "Holud Decoration",
      experience: "7 Years",
      ratings: 4.9,
    },
    {
      image: "https://i.ibb.co/0rK7Jp8/decorator-5.jpg",
      team_name: "Corporate Event Masters",
      specialty: "Corporate Events",
      experience: "8 Years",
      ratings: 4.8,
    },
    {
      image: "https://i.ibb.co/3v7K5zM/decorator-6.jpg",
      team_name: "Romantic Moments Decor",
      specialty: "Anniversary Setup",
      experience: "3 Years",
      ratings: 4.6,
    },
    {
      image: "https://i.ibb.co/ZYW3VTp/decorator-4.jpg",
      team_name: "Luxury Wedding Hub",
      specialty: "Luxury Wedding",
      experience: "9 Years",
      ratings: 5.0,
    },
    {
      image: "https://i.ibb.co/2FQ5Y0g/decorator-3.jpg",
      team_name: "Flower Fantasy",
      specialty: "Floral Decoration",
      experience: "4 Years",
      ratings: 4.8,
    },
  ];

  const itemsPerPage = 4;
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(decorators_data.length / itemsPerPage);

  const currentData = decorators_data.slice(
    page * itemsPerPage,
    page * itemsPerPage + itemsPerPage,
  );

  const nextPage = () => {
    setPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section className="px-4 lg:px-10 py-20 bg-base-100">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
        <div className="max-w-2xl ">
          <p className="text-primary uppercase tracking-[4px] text-sm font-semibold mb-4">
            Expert Decoration Teams
          </p>

          <h2 className="text-4xl md:text-6xl font-bold text-neutral leading-tight mb-5">
            Meet Our Premium Decorators
          </h2>

          <p className="text-neutral/70 text-sm md:text-lg leading-8">
            Collaborate with highly experienced decoration specialists dedicated
            to creating elegant weddings, birthdays, interiors, and luxury event
            experiences.
          </p>
        </div>

        {/* ARROWS (UPGRADED UI) */}
        <div className="flex items-center gap-4">
          <button
            onClick={prevPage}
            className="w-12 h-12 rounded-full border border-base-300 bg-base-100 hover:bg-primary hover:text-primary-content transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.05)]"
          >
            <FaArrowLeft className="mx-auto" />
          </button>

          <button
            onClick={nextPage}
            className="w-12 h-12 rounded-full bg-primary text-primary-content hover:scale-105 transition-all duration-300 shadow-[0_10px_25px_rgba(212,176,106,0.3)]"
          >
            <FaArrowRight className="mx-auto" />
          </button>
        </div>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-8">
        {currentData.map((decorator, index) => (
          <Reveal key={index}>
            <div
              className="group flex flex-col sm:flex-row h-70 rounded-[28px] overflow-hidden bg-base-100 border border-base-200 shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500"
            >
              {/* IMAGE */}
              <div className="sm:w-3/5 relative overflow-hidden">
                <img
                  src={decorator.image}
                  alt={decorator.team_name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-black/10 to-transparent group-hover:from-black/50 transition-all duration-500"></div>
              </div>

              {/* CONTENT */}
              <div className="sm:w-2/5 p-5 flex flex-col justify-between">
                {/* TOP */}
                <div>
                  <div className="flex items-center gap-1 text-primary mb-3">
                    <FaStar className="text-sm" />
                    <span className="font-semibold text-sm">
                      {decorator.ratings}
                    </span>
                  </div>

                  <h2 className="font-bold text-lg text-neutral mb-1 group-hover:text-primary transition">
                    {decorator.team_name}
                  </h2>

                  <p className="text-sm text-neutral/70">
                    {decorator.specialty}
                  </p>
                </div>

                {/* BOTTOM */}
                <div>
                  <p className="text-xs text-neutral/60 mb-3">
                    {decorator.experience} Experience
                  </p>

                  <button className="w-full py-2 rounded-xl bg-primary text-primary-content font-semibold hover:opacity-90 transition">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* DOTS */}
      <div className="flex justify-center items-center gap-2 mt-12">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPage(index)}
            className={`h-2.5 rounded-full transition-all duration-300 ${
              page === index
                ? "bg-primary w-8"
                : "bg-base-300 w-3 hover:bg-primary/40"
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Decorator;
