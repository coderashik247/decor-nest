import React, { useEffect, useRef, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaLocationDot } from "react-icons/fa6";
import axios from "axios";

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);

  useEffect(() => {
    axios
      .get("/serviceCenters.json")
      .then((res) => setServiceCenters(res.data));
  }, []);

  const position = [23.685, 90.3563];
  const mapRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const location = e.target.location.value;

    const district = serviceCenters.find((center) =>
      center.district.toLowerCase().includes(location.toLowerCase()),
    );

    if (district) {
      const coordinates = [district.latitude, district.longitude];

      mapRef.current.flyTo(coordinates, 13, {
        duration: 2,
      });
    }
  };

  return (
    <section className="px-4 lg:px-10 py-20 bg-base-100">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <p className="text-primary uppercase tracking-[4px] text-sm font-semibold mb-4">
          Nationwide Coverage
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-neutral mb-6 leading-tight">
          We Are Available Across Bangladesh
        </h2>

        <p className="text-neutral/70 text-sm md:text-lg leading-8">
          Discover our decoration services available in all 64 districts with
          fast support, premium event setup, and reliable coverage.
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-10">
        <form onSubmit={handleSearch} className="w-full max-w-2xl">
          <div className="flex items-center bg-base-100 border border-base-300 rounded-2xl overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.05)]">
            <div className="px-5 text-primary text-lg">
              <FaLocationDot />
            </div>

            <input
              type="search"
              placeholder="Search your district..."
              name="location"
              className="w-full py-4 px-2 outline-none bg-transparent text-neutral placeholder:text-neutral/50"
            />

            <button
              type="submit"
              className="px-6 py-4 bg-primary text-primary-content font-semibold hover:opacity-90 transition"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {/* MAP CONTAINER */}
      <div className="rounded-4xl overflow-hidden border border-base-300 shadow-[0_15px_40px_rgba(17,24,39,0.08)]">
        <div className="w-full h-200 ">
          <MapContainer
            center={position}
            zoom={7.5}
            scrollWheelZoom={false}
            className="w-full h-full z-0"
            ref={mapRef}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {serviceCenters.map((center, index) => (
              <Marker
                key={index}
                position={[center.latitude, center.longitude]}
              >
                <Popup>
                  <div className="space-y-2 min-w-55">
                    <h3 className="text-lg font-bold text-neutral">
                      {center.district}
                    </h3>

                    <p className="text-sm text-neutral/70">
                      Premium Decoration Coverage Area
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {center.covered_area.map((area, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
