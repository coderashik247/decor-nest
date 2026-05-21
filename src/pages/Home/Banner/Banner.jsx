import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

// SWIPER CSS
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import BannerImage1 from "../../../assets/images/royal-wedding-stage.jpg";
import BannerImage2 from "../../../assets/images/holud-stage-setup.jpg";
import BannerImage3 from "../../../assets/images/birthday-decoration.jpg";
import BannerImage4 from "../../../assets/images/home-decoration.jpg";
import BannerImage5 from "../../../assets/images/office-decoration.jpg";

const slides = [
  {
    image: BannerImage1,
    title: "Luxury Wedding Decoration",
    subtitle:
      "Elegant royal wedding setups crafted with timeless beauty and premium styling.",
  },
  {
    image: BannerImage2,
    title: "Traditional Holud Experience",
    subtitle:
      "Celebrate vibrant moments with artistic lighting, florals & cultural elegance.",
  },
  {
    image: BannerImage3,
    title: "Modern Birthday Events",
    subtitle:
      "Stylish birthday decoration experiences designed for unforgettable memories.",
  },
  {
    image: BannerImage4,
    title: "Premium Home Decoration",
    subtitle:
      "Transform your living spaces with modern luxury interior decoration.",
  },
  {
    image: BannerImage5,
    title: "Creative Office Setup",
    subtitle:
      "Elegant office decoration solutions that inspire creativity and professionalism.",
  },
];

const Banner = () => {
  return (
    <div className="my-6">

      <Swiper
        loop={true}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="rounded-[28px] overflow-hidden shadow-[0_10px_35px_rgba(17,24,39,0.08)]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>

            <div className="relative h-75 sm:h-112.5 lg:h-162.5 w-full overflow-hidden">

              {/* IMAGE */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-black/20"></div>

              {/* CONTENT */}
              <div className="absolute inset-0 flex items-center">

                <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full">

                  <div className="max-w-2xl">

                    <p className="uppercase tracking-[4px] text-primary text-sm mb-4 font-medium">
                      Luxury Decoration Service
                    </p>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                      {slide.title}
                    </h1>

                    <p className="text-white/80 text-sm sm:text-base leading-7 mb-8 max-w-xl">
                      {slide.subtitle}
                    </p>

                    <div className="flex flex-wrap gap-4">

                      <button className="btn bg-primary text-primary-content border-none hover:opacity-90 rounded-xl px-7">
                        Explore Services
                      </button>

                      <button className="btn bg-white/10 backdrop-blur-md text-white border border-white/20 hover:bg-white hover:text-neutral rounded-xl px-7">
                        Book Consultation
                      </button>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;