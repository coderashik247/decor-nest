import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const UserDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["user-dashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/user/overview?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="grid place-items-center h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const cards = [
    {
      title: "Total Bookings",
      value: data.totalBookings || 0,
      icon: <FaCalendarCheck />,
    },
    {
      title: "Pending",
      value: data.pending || 0,
      icon: <FaClock />,
    },
    {
      title: "Completed",
      value: data.completed || 0,
      icon: <FaCheckCircle />,
    },
    {
      title: "Total Spent",
      value: `৳ ${data.totalSpent || 0}`,
      icon: <FaMoneyBillWave />,
    },
  ];

  const bookingChartData = [
    {
      name: "Pending",
      value: data.pending || 0,
    },
    {
      name: "Completed",
      value: data.completed || 0,
    },
  ];

  const spendingData = [
    { month: "Jan", amount: 10000 },
    { month: "Feb", amount: 25000 },
    { month: "Mar", amount: 18000 },
    { month: "Apr", amount: 32000 },
    { month: "May", amount: data.totalSpent || 0 },
  ];

  return (
    <div className="space-y-8">

      {/* HERO */}
      <div className="rounded-4xl bg-secondary text-white p-8 relative overflow-hidden">

        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <p className="uppercase tracking-[4px] text-primary text-sm font-semibold">
            Welcome Back
          </p>

          <h1 className="text-4xl md:text-5xl font-black mt-2">
            {user?.displayName}
          </h1>

          <p className="text-white/70 mt-3 max-w-xl">
            Manage your bookings, track decoration progress and
            monitor your spending all in one place.
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-base-100 border border-base-300 rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-base-content/60 text-sm">
                  {card.title}
                </p>

                <h2 className="text-4xl font-black text-secondary mt-2">
                  {card.value}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-secondary text-xl">
                {card.icon}
              </div>

            </div>
          </div>
        ))}

      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* AREA CHART */}
        <div className="bg-base-100 rounded-4xl border border-base-300 p-6">

          <h2 className="text-2xl font-bold text-secondary mb-6">
            Spending Overview
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={spendingData}>
              <Tooltip />

              <Area
                type="monotone"
                dataKey="amount"
                stroke="#CAEB66"
                fill="#CAEB66"
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>

        </div>

        {/* PIE CHART */}
        <div className="bg-base-100 rounded-4xl border border-base-300 p-6">

          <h2 className="text-2xl font-bold text-secondary mb-6">
            Booking Status
          </h2>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>

              <Pie
                data={bookingChartData}
                dataKey="value"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={5}
              >
                <Cell fill="#CAEB66" />
                <Cell fill="#1F2937" />
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>

          <div className="flex justify-center gap-6 mt-3">

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary"></div>
              <span>Pending</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-secondary"></div>
              <span>Completed</span>
            </div>

          </div>

        </div>

      </div>

      {/* ACTIVITY */}
      <div className="bg-base-100 rounded-4xl border border-base-300 p-6">

        <h2 className="text-2xl font-bold text-secondary mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between bg-base-200 rounded-2xl p-4">
            <span>New booking created</span>
            <span className="badge bg-primary text-black border-0">
              Latest
            </span>
          </div>

          <div className="flex items-center justify-between bg-base-200 rounded-2xl p-4">
            <span>Payment completed successfully</span>
            <span className="badge badge-success">
              Paid
            </span>
          </div>

          <div className="flex items-center justify-between bg-base-200 rounded-2xl p-4">
            <span>Decorator assigned to project</span>
            <span className="badge bg-secondary text-white border-0">
              Assigned
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default UserDashboardHome;