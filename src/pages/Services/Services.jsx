import React, { useEffect, useMemo, useState } from "react";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import servicesData from "../../utility/servicesData";

import { FaSearch, FaSortAmountDown, FaFilter } from "react-icons/fa";

const Services = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  // normalize helper
  const normalize = (str) => str.toLowerCase().trim();

  // FILTER + SEARCH + SORT
  const filteredData = useMemo(() => {
    let data = [...servicesData];

    // SEARCH
    if (search.trim()) {
      data = data.filter(
        (s) =>
          s.service_name.toLowerCase().includes(search.toLowerCase()) ||
          s.category.toLowerCase().includes(search.toLowerCase()),
      );
    }

    // FILTER
    if (category !== "all") {
      data = data.filter((s) =>
        normalize(s.category).includes(normalize(category)),
      );
    }

    // SORT
    if (sort === "low") {
      data.sort((a, b) => a.cost - b.cost);
    } else if (sort === "high") {
      data.sort((a, b) => b.cost - a.cost);
    }

    return data;
  }, [search, category, sort]);

  // pagination safety
  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage,
  );

  // reset page on filter change
  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  // scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
    setPage(1);
  };

  return (
    <div className="w-11/12 mx-auto py-10 space-y-8">
      {/* HERO SECTION */}
      <div className="text-center max-w-3xl mx-auto">
        <p className="text-primary uppercase tracking-[4px] text-sm font-semibold">
          Premium Decoration Services
        </p>

        <h2 className="text-4xl md:text-6xl font-bold text-secondary mt-3">
          Crafted For Elegant Celebrations
        </h2>

        <p className="text-base-content/60 mt-4">
          Explore luxurious decoration services for weddings, birthdays,
          corporate events and premium experiences.
        </p>
      </div>

      {/* FILTER BAR */}
      <div className="bg-base-100 border border-base-300 rounded-3xl p-5 shadow-sm sticky top-20 z-40 backdrop-blur-md">
        <div className="grid md:grid-cols-4 gap-4">
          {/* SEARCH */}
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              className="input input-bordered w-full pl-10 rounded-2xl"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* CATEGORY */}
          <div className="relative">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
            <select
              value={category}
              className="select select-bordered w-full pl-10 rounded-2xl"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
              <option value="home">Home</option>
              <option value="corporate">Corporate</option>
              <option value="engagement">Engagement / Holud</option>
              <option value="anniversary">Anniversary</option>
            </select>
          </div>

          {/* SORT */}
          <div className="relative">
            <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
            <select
              value={sort}
              className="select select-bordered w-full pl-10 rounded-2xl"
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="default">Default</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
            </select>
          </div>

          {/* RESET */}
          <button
            onClick={handleReset}
            className="btn btn-primary rounded-2xl text-black"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* RESULT INFO */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-sm text-base-content/60">
        <p>
          Showing{" "}
          <span className="badge badge-primary text-black">
            {filteredData.length}
          </span>{" "}
          services
        </p>

        <p>
          Page {page} of {totalPages}
        </p>
      </div>

      {/* GRID */}
      {paginatedData.length > 0 ? (
        <ServiceCard servicesData={paginatedData} />
      ) : (
        <div className="text-center py-24 bg-base-100 border border-base-300 rounded-3xl">
          <div className="text-5xl mb-4">🔍</div>

          <h3 className="text-2xl font-bold text-secondary">
            No Services Found
          </h3>

          <p className="text-base-content/60 mt-2">
            Try different keywords or reset filters
          </p>

          <button
            onClick={handleReset}
            className="btn btn-primary mt-6 text-black rounded-2xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* PAGINATION */}
      {filteredData.length > itemsPerPage && (
        <div className="flex justify-center gap-2 flex-wrap">
          {/* PREV */}
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>

          {/* PAGES */}
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm rounded-xl transition-all duration-200 ${
                page === i + 1
                  ? "btn-primary text-black scale-105"
                  : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}

          {/* NEXT */}
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
