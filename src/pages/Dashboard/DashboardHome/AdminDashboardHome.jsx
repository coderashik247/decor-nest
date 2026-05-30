import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  FaUsers,
  FaMoneyBillWave,
  FaCalendarCheck,
  FaUserTie,
  FaArrowTrendUp,
} from "react-icons/fa6";

import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminDashboardHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/admin/overview");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-32">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const stats = [
    {
      title: "Total Users",
      value: data.usersCount,
      icon: <FaUsers />,
    },
    {
      title: "Decorators",
      value: data.decoratorsCount,
      icon: <FaUserTie />,
    },
    {
      title: "Bookings",
      value: data.totalBookings,
      icon: <FaCalendarCheck />,
    },
    {
      title: "Revenue",
      value: `৳${data.totalRevenue}`,
      icon: <FaMoneyBillWave />,
    },
  ];

  const bookingData = [
    {
      name: "Completed",
      value: data.completedProjects || 0,
    },
    {
      name: "Active",
      value: data.activeProjects || 0,
    },
    {
      name: "Pending",
      value: data.pendingDecorators || 0,
    },
  ];

  const chartColors = [
    "#D4B06A",
    "#111827",
    "#E7D1A2",
  ];

  return (
    <div className="space-y-8">

      {/* HERO */}
      <div className="bg-linear-to-r from-secondary to-slate-900 rounded-4xl p-8 text-white relative overflow-hidden">

        <div className="absolute right-0 top-0 w-72 h-72 bg-primary/10 blur-3xl rounded-full"></div>

        <div className="relative z-10">
          <p className="uppercase tracking-[4px] text-primary text-sm">
            Admin Panel
          </p>

          <h1 className="text-5xl font-black mt-2">
            Dashboard Overview
          </h1>

          <p className="text-white/70 mt-3 max-w-xl">
            Monitor bookings, decorators, users and revenue
            from one premium dashboard.
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="
            bg-base-100
            border border-base-300
            rounded-[28px]
            p-6
            shadow-lg
            hover:-translate-y-2
            hover:shadow-2xl
            transition-all duration-300
          "
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-base-content/60 text-sm">
                  {item.title}
                </p>

                <h2 className="text-4xl font-black text-secondary mt-2">
                  {item.value}
                </h2>
              </div>

              <div
                className="
                w-16 h-16
                rounded-2xl
                bg-primary/15
                text-primary
                flex
                items-center
                justify-center
                text-2xl
              "
              >
                {item.icon}
              </div>
            </div>

            <div className="flex items-center gap-2 mt-6 text-success">
              <FaArrowTrendUp />
              <span className="text-sm font-semibold">
                Growing
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-base-100 border border-base-300 rounded-[28px] p-6 shadow-lg">

          <h3 className="text-2xl font-bold text-secondary mb-6">
            Booking Status
          </h3>

          <ResponsiveContainer width="100%" height={330}>
            <PieChart>
              <Pie
                data={bookingData}
                dataKey="value"
                outerRadius={120}
                innerRadius={70}
                paddingAngle={4}
                label
              >
                {bookingData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={chartColors[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-6 mt-4">
            {bookingData.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center gap-2"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor:
                      chartColors[index],
                  }}
                ></div>

                <span className="text-sm">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-base-100 border border-base-300 rounded-[28px] p-6 shadow-lg">

          <h3 className="text-2xl font-bold text-secondary mb-6">
            Platform Statistics
          </h3>

          <ResponsiveContainer width="100%" height={330}>
            <BarChart
              data={[
                {
                  name: "Users",
                  value: data.usersCount,
                },
                {
                  name: "Decorators",
                  value: data.decoratorsCount,
                },
                {
                  name: "Bookings",
                  value: data.totalBookings,
                },
                {
                  name: "Projects",
                  value:
                    data.completedProjects,
                },
              ]}
            >
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#D4B06A"
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BUSINESS INSIGHTS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div className="bg-secondary text-white rounded-[28px] p-8">
          <p className="text-white/60">
            Pending Decorators
          </p>

          <h2 className="text-6xl font-black text-primary mt-2">
            {data.pendingDecorators}
          </h2>
        </div>

        <div className="bg-secondary text-white rounded-[28px] p-8">
          <p className="text-white/60">
            Active Projects
          </p>

          <h2 className="text-6xl font-black text-primary mt-2">
            {data.activeProjects}
          </h2>
        </div>

        <div className="bg-secondary text-white rounded-[28px] p-8">
          <p className="text-white/60">
            Completed Projects
          </p>

          <h2 className="text-6xl font-black text-primary mt-2">
            {data.completedProjects}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;