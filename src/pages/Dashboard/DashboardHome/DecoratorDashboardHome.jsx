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
  FaMoneyBillWave,
  FaClipboardCheck,
  FaHourglassHalf,
  FaCheckCircle,
} from "react-icons/fa";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const DecoratorDashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data = {}, isLoading } = useQuery({
    queryKey: ["decorator-dashboard", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/decorator/overview?email=${user.email}`
      );
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const stats = [
    {
      title: "Assigned Projects",
      value: data.assigned || 0,
      icon: <FaClipboardCheck size={24} />,
    },
    {
      title: "Active Projects",
      value: data.active || 0,
      icon: <FaHourglassHalf size={24} />,
    },
    {
      title: "Completed",
      value: data.completed || 0,
      icon: <FaCheckCircle size={24} />,
    },
    {
      title: "Total Earnings",
      value: `৳ ${data.totalEarnings || 0}`,
      icon: <FaMoneyBillWave size={24} />,
    },
  ];

  const pieData = [
    {
      name: "Assigned",
      value: data.assigned || 0,
    },
    {
      name: "Active",
      value: data.active || 0,
    },
    {
      name: "Completed",
      value: data.completed || 0,
    },
  ];

  const performanceData = [
    {
      name: "Assigned",
      value: data.assigned || 0,
    },
    {
      name: "Active",
      value: data.active || 0,
    },
    {
      name: "Completed",
      value: data.completed || 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h2 className="text-4xl font-black text-secondary">
          Decorator Dashboard
        </h2>

        <p className="text-base-content/60 mt-2">
          Welcome back, {user?.displayName}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <div
            key={index}
            className="bg-base-100 border border-base-300 rounded-[28px] p-6 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-base-content/60">
                  {item.title}
                </p>

                <h2 className="text-4xl font-black text-secondary mt-2">
                  {item.value}
                </h2>
              </div>

              <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center text-secondary">
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CHARTS */}
      <div className="grid lg:grid-cols-2 gap-6">

        {/* PIE */}
        <div className="bg-base-100 border border-base-300 rounded-[28px] p-6">
          <h3 className="text-2xl font-bold text-secondary mb-6">
            Project Distribution
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={110}
                label
              >
                <Cell fill="#CAEB66" />
                <Cell fill="#DFF58C" />
                <Cell fill="#A4C94D" />
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div className="bg-base-100 border border-base-300 rounded-[28px] p-6">
          <h3 className="text-2xl font-bold text-secondary mb-6">
            Performance Overview
          </h3>

          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={performanceData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#CAEB66"
                radius={[12, 12, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SUMMARY CARD */}
      <div className="bg-secondary rounded-4xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>

        <h3 className="text-3xl font-black mb-6">
          Work Summary
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-white/70">
              Assigned Projects
            </p>

            <h2 className="text-5xl font-black text-primary mt-2">
              {data.assigned || 0}
            </h2>
          </div>

          <div>
            <p className="text-white/70">
              Active Projects
            </p>

            <h2 className="text-5xl font-black text-primary mt-2">
              {data.active || 0}
            </h2>
          </div>

          <div>
            <p className="text-white/70">
              Completed Projects
            </p>

            <h2 className="text-5xl font-black text-primary mt-2">
              {data.completed || 0}
            </h2>
          </div>
        </div>
      </div>

      {/* EARNING CARD */}
      <div className="bg-primary rounded-4xl p-8 text-secondary">
        <p className="uppercase tracking-[4px] font-semibold">
          Total Earnings
        </p>

        <h2 className="text-6xl font-black mt-3">
          ৳ {data.totalEarnings || 0}
        </h2>

        <p className="mt-3 opacity-70">
          Earnings generated from completed decoration projects.
        </p>
      </div>
    </div>
  );
};

export default DecoratorDashboardHome;