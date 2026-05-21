import React from "react";
import ServiceCard from "../../components/ServiceCard/ServiceCard";

const Services = () => {
  const data = [
    {
      service_name: "Royal Wedding Stage",
      cost: 50000,
      category: "Wedding Decoration",
      unit: "per event",
      image:
        "https://i.ibb.co.com/0jZjDgsZ/8c8160d9-7b6b-4c1c-b1b5-5e0f56d30de8.jpg",
      rating: 4.9,
      description:
        "Luxury floral wedding stage decoration with premium lighting and elegant seating setup.",
      createdByEmail: "admin@gmail.com",
    },
    {
      service_name: "Living Room Makeover",
      cost: 18000,
      category: "Home Decoration",
      unit: "per project",
      image:
        "https://i.ibb.co.com/TJbTsQK/photo-1615873968403-89e068629265.avif",
      rating: 4.8,
      description:
        "Modern living room styling with elegant furniture arrangement and aesthetic decor elements.",
      createdByEmail: "admin@gmail.com",
    },
    {
      service_name: "Holud Stage Setup",
      cost: 35000,
      category: "Engagement / Holud Decoration",
      unit: "per event",
      image: "https://i.ibb.co.com/qYYShJqt/9aae92cf-3212-4297-95e1-01db1da67e26.jpg",
      rating: 4.9,
      description:
        "Traditional holud stage decoration with floral backdrop, yellow theme lighting, and couple seating.",
      createdByEmail: "admin@gmail.com",
    },
  ];
  return (
    <div>
      <ServiceCard data={data}></ServiceCard>
    </div>
  );
};

export default Services;
