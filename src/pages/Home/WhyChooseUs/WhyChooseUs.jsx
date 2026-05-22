import React from "react";
import { FaCrown, FaUsers, FaBolt, FaWallet } from "react-icons/fa";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaCrown />,
      title: "Premium Materials",
      description:
        "We use high-quality luxury materials to create elegant decorations.",
      image:
        "https://i.ibb.co.com/Qv2kdgGD/photo-1723832348105-2e69f948135a.avif",
    },
    {
      icon: <FaUsers />,
      title: "Experienced Decorators",
      description:
        "Expert teams with years of event decoration experience.",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=60",
    },
    {
      icon: <FaBolt />,
      title: "Fast Setup",
      description:
        "Quick and efficient event setup without delays.",
      image:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=60",
    },
    {
      icon: <FaWallet />,
      title: "Affordable Packages",
      description: "Luxury decoration within your budget.",
      image:
        "https://i.ibb.co.com/H5CQhBT/photo-1768488292764-8da1562789b0.avif",
    },
  ];

  return (
    <section className="px-4 lg:px-10 py-24 bg-base-100">

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-16">

        <p className="text-primary uppercase tracking-[4px] font-semibold mb-4">
          Why Choose Us
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-neutral mb-6 leading-tight">
          We Create Magical Moments
        </h2>

        <p className="text-neutral/70 text-sm md:text-lg leading-8">
          We combine creativity, experience, and premium materials to deliver
          unforgettable decoration experiences for your special events.
        </p>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((item, index) => (
          <div
            key={index}
            className="group relative h-85 rounded-[30px] overflow-hidden shadow-[0_10px_35px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
          >

            {/* IMAGE */}
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
            />

            {/* GRADIENT OVERLAY */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/90 transition-all duration-500"></div>

            {/* ICON FLOAT */}
            <div className="absolute top-5 left-5 w-12 h-12 rounded-xl bg-primary text-primary-content flex items-center justify-center shadow-lg group-hover:scale-110 transition">
              {item.icon}
            </div>

            {/* CONTENT */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition">
                {item.title}
              </h3>

              <p className="text-sm text-white/80 leading-6">
                {item.description}
              </p>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default WhyChooseUs;