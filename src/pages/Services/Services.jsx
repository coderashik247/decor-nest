import React, { useEffect, useMemo, useState } from "react";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { FaSearch, FaSortAmountDown, FaFilter } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

/* ---------------- CATEGORY MAPPER ---------------- */
const mapCategory = (cat = "") => {
  const c = cat?.toLowerCase() || "";

  if (c.includes("wedding")) return "wedding";
  if (c.includes("birthday")) return "birthday";
  if (c.includes("home")) return "home";
  if (c.includes("corporate")) return "corporate";
  if (c.includes("holud") || c.includes("engagement")) return "engagement";
  if (c.includes("anniversary")) return "anniversary";

  return "other";
};

/* ---------------- MAIN COMPONENT ---------------- */
const Services = () => {
  const axiosSecure = useAxiosSecure();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");
  const [page, setPage] = useState(1);

  const itemsPerPage = 6;

  /* ---------------- FETCH DATA ---------------- */
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res.data;
    },
  });

  /* ---------------- FILTER / SEARCH / SORT ---------------- */
  const filteredData = useMemo(() => {
    let data = (services || []).map((s) => ({
      ...s,
      normalizedCategory: mapCategory(s.category),
    }));

    // SEARCH
    if (search.trim()) {
      data = data.filter((s) => {
        const keyword = search.toLowerCase();

        return (
          s.service_name?.toLowerCase().includes(keyword) ||
          s.normalizedCategory?.includes(keyword)
        );
      });
    }

    // CATEGORY FILTER
    if (category !== "all") {
      data = data.filter((s) => s.normalizedCategory === category);
    }

    // SORT
    if (sort === "low") {
      data.sort((a, b) => a.cost - b.cost);
    } else if (sort === "high") {
      data.sort((a, b) => b.cost - a.cost);
    }

    return data;
  }, [search, category, sort, services]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / itemsPerPage)
  );

  const paginatedData = filteredData.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  /* ---------------- RESET PAGE ON CHANGE ---------------- */
  useEffect(() => {
    setPage(1);
  }, [search, category, sort]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  const handleReset = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
    setPage(1);
  };

  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading services...
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-10 space-y-8">
      {/* HERO */}
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
      <div className="flex justify-between items-center text-sm text-base-content/60">
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
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn btn-sm rounded-xl ${
                page === i + 1
                  ? "btn-primary text-black"
                  : "btn-outline"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            className="btn btn-sm btn-outline"
            onClick={() =>
              setPage((p) => Math.min(p + 1, totalPages))
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;