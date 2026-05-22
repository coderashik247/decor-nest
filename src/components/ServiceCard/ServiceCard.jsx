import { Link } from "react-router-dom";
import { FaArrowRight, FaStar } from "react-icons/fa6";

const ServiceCard = ({ servicesData }) => {
  return (
    <section className="py-16">

      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">

        <p className="text-primary uppercase tracking-[4px] text-sm font-semibold mb-4">
          Premium Decoration Services
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-neutral mb-6 leading-tight">
          Crafted For Elegant Celebrations
        </h2>

        <p className="text-neutral/70 text-sm md:text-lg leading-8">
          Explore luxurious decoration services designed for weddings, birthdays,
          corporate events, and unforgettable premium experiences.
        </p>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">

        {servicesData.map((service) => (
          <div
            key={service._id}
            className="group relative h-120 rounded-[30px] overflow-hidden shadow-[0_10px_35px_rgba(17,24,39,0.08)]"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
          >

            {/* IMAGE */}
            <img
              src={service.images[0]}
              alt={service.service_name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500"></div>

            {/* TOP BADGES */}
            <div className="absolute top-6 left-6 right-6 flex justify-between z-20">

              <span className="px-4 py-1.5 bg-primary text-primary-content rounded-full text-xs font-semibold">
                {service.category}
              </span>

              <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium text-neutral">

                <FaStar className="text-primary text-xs" />

                {service.rating}

              </div>

            </div>

            {/* DEFAULT VIEW (BEFORE HOVER) */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transition-all duration-500 group-hover:opacity-0 group-hover:translate-y-8">

              <h3 className="text-2xl font-bold text-white mb-2">
                {service.service_name}
              </h3>

              <p className="text-primary text-xl font-bold">
                ৳ {service.cost}
              </p>

            </div>

            {/* HOVER CONTENT */}
            <div className="absolute inset-0 z-30 flex flex-col justify-end p-6 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">

              <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-[28px] p-6 flex flex-col h-full">

                {/* TITLE */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {service.service_name}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-white/80 text-sm leading-7 mb-6 min-h-21">
                  {service.description.slice(0, 120)}...
                </p>

                {/* PRICE SECTION */}
                <div className="flex justify-between items-center mb-6 mt-auto">

                  <div>
                    <p className="text-white/60 text-xs mb-1">
                      Starting Price
                    </p>

                    <h4 className="text-primary text-2xl font-bold">
                      ৳ {service.cost}
                    </h4>
                  </div>

                  <div className="text-right">
                    <p className="text-white/60 text-xs mb-1">
                      Billing
                    </p>

                    <p className="text-white font-medium">
                      {service.unit}
                    </p>
                  </div>

                </div>

                {/* BUTTON */}
                <Link
                  to={`/services/${service.id}`}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl bg-primary text-primary-content font-semibold hover:opacity-90 transition-all duration-300"
                >
                  View Details
                  <FaArrowRight />
                </Link>

              </div>

            </div>

          </div>
        ))}

      </div>
    </section>
  );
};

export default ServiceCard;