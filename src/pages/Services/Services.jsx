import React from "react";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import servicesData from "../../utility/servicesData";

const Services = () => {

  return (
    <div>
      <ServiceCard servicesData={servicesData}></ServiceCard>
    </div>
  );
};

export default Services;
