import React from 'react';
import Banner from './Banner/Banner';
import Services from '../Services/Services';
import Decorator from '../Decorator/Decorator';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';
import Coverage from './Coverage/Coverage';
import Gallery from './Gallery/Gallery';



const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Decorator></Decorator>
            <WhyChooseUs></WhyChooseUs>
            <Coverage />
            <Gallery></Gallery>
        </div>
    );
};

export default Home;