import React, { useEffect, useState } from "react";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards, Autoplay } from "swiper/modules";

import "./testimonial.css";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get("/reviews.json").then((res) => setReviews(res.data));
  }, []);

  return (
    <section className="py-24 px-4 lg:px-10">

      {/* HEADER */}
      <div className="max-w-3xl mx-auto text-center mb-16">

        <p className="text-primary uppercase tracking-[4px] text-sm font-semibold mb-4">
          Testimonials
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-neutral leading-tight mb-5">
          What Our Clients Say
        </h2>

        <p className="text-neutral/70 text-sm md:text-lg leading-8">
          Real stories and experiences from our happy clients
          who trusted us to make their special moments unforgettable.
        </p>

      </div>

      {/* TESTIMONIAL SECTION */}
      <div className="testimonial-section">

        {/* OVERLAY */}
        <div className="testimonial-overlay"></div>

        <div className="testimonial-wrapper">

          {/* LEFT CONTENT */}
          <div className="testimonial-left">

            <p className="testimonial-tag">
              Luxury Event Experience
            </p>

            <h2 className="testimonial-heading">
              Creating Beautiful Memories With Elegant Decoration
            </h2>

            <p className="testimonial-text">
              From weddings to birthday celebrations, we deliver
              premium decoration experiences with creativity,
              passion, and perfection.
            </p>

            <div className="testimonial-stats">

              <div className="testimonial-stat-card">
                <h3>500+</h3>
                <p>Events Completed</p>
              </div>

              <div className="testimonial-stat-card">
                <h3>4.9★</h3>
                <p>Average Rating</p>
              </div>

            </div>

          </div>

          {/* SWIPER */}
          <div className="testimonial-right">

            <Swiper
              effect={"cards"}
              grabCursor={true}
              autoplay={{
                delay: 5500,
                disableOnInteraction: false,
              }}
              modules={[EffectCards, Autoplay]}
              className="testimonial-swiper"
            >

              {reviews.map((review, index) => (
                <SwiperSlide key={index}>

                  <div className="testimonial-card">

                    <div className="testimonial-quote">
                      "
                    </div>

                    <img
                      src={review.image}
                      alt="client"
                      className="testimonial-image"
                    />

                    <h4 className="testimonial-review">
                      {review.review}
                    </h4>

                    <div className="testimonial-footer">

                      <div className="testimonial-rating">
                        ⭐ {review.rating}
                      </div>

                    </div>

                  </div>

                </SwiperSlide>
              ))}

            </Swiper>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Testimonial;