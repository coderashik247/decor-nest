import React from "react";
import Banner from "./Banner/Banner";
import Services from "../Services/Services";
import Decorator from "../Decorator/Decorator";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import Coverage from "./Coverage/Coverage";
import Gallery from "./Gallery/Gallery";
import Testimonial from "./Testimonial/Testimonial";
import CTABanner from "./CTABanner/CTABanner";
import Reveal from "../../animation/Reveal";

const Home = () => {
  return (
    <div>
      <Reveal>
        <Banner></Banner>
      </Reveal>
      <Services></Services>
      <Decorator></Decorator>
      <Reveal>
        <WhyChooseUs></WhyChooseUs>
      </Reveal>
      <Reveal>
        <Coverage />
      </Reveal>
      <Reveal>
        <Gallery></Gallery>
      </Reveal>
      <Reveal>
        <Testimonial></Testimonial>
      </Reveal>
      <Reveal>
        <CTABanner></CTABanner>
      </Reveal>
    </div>
  );
};

export default Home;
