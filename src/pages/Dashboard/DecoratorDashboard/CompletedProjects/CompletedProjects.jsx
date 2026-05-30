import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useAuth from "../../../../hooks/useAuth";

import {
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";

const CompletedProjects = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: projects = [],
    isLoading,
  } = useQuery({
    queryKey: ["completed-projects", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/projects/completed?decoratorEmail=${user.email}`
      );

      return res.data;
    },
  });

  const calculateEarning = (project) => {
    return project.servicePrice
      ? project.servicePrice * 0.6
      : 0;
  };

  const totalEarning = projects.reduce(
    (sum, project) => sum + calculateEarning(project),
    0
  );

  if (isLoading) {
    return (
      <div className="grid place-items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row justify-between gap-5">

        <div>
          <h2 className="text-4xl font-black text-secondary">
            Completed Projects
          </h2>

          <p className="text-base-content/60 mt-2">
            Successfully completed decoration projects
          </p>
        </div>

        <div className="bg-secondary text-white rounded-3xl px-6 py-5 shadow-lg min-w-62.5">

          <div className="flex justify-between items-center">

            <div>
              <p className="text-white/70 text-sm">
                Total Earnings
              </p>

              <h3 className="text-4xl font-black text-primary">
                ৳ {totalEarning.toFixed(0)}
              </h3>
            </div>

            <FaMoneyBillWave
              size={40}
              className="text-primary"
            />
          </div>

        </div>
      </div>

      {/* TABLE */}
      <div className="bg-base-100 rounded-3xl border border-base-300 overflow-hidden shadow-lg">

        <div className="overflow-x-auto">

          <table className="table">

            <thead className="bg-secondary text-white">
              <tr>
                <th>#</th>
                <th>Project</th>
                <th>Client</th>
                <th>Location</th>
                <th>Budget</th>
                <th>Earning</th>
                <th>Completed Date</th>
              </tr>
            </thead>

            <tbody>

              {projects.map((project, index) => (
                <tr
                  key={project._id}
                  className="hover:bg-base-200"
                >
                  <td>{index + 1}</td>

                  <td>
                    <div>
                      <h3 className="font-bold">
                        {project.serviceName}
                      </h3>

                      <p className="text-xs opacity-60">
                        {project._id}
                      </p>
                    </div>
                  </td>

                  <td>
                    <div>
                      <h3 className="font-semibold">
                        {project.userName}
                      </h3>

                      <p className="text-xs opacity-60">
                        {project.userEmail}
                      </p>
                    </div>
                  </td>

                  <td>
                    {project.bookingDistrict},{" "}
                    {project.bookingRegion}
                  </td>

                  <td>
                    ৳ {project.servicePrice || 0}
                  </td>

                  <td>
                    <span className="badge badge-success text-white">
                      ৳ {calculateEarning(project).toFixed(0)}
                    </span>
                  </td>

                  <td>
                    {project.updatedAt
                      ? new Date(
                          project.updatedAt
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {projects.length === 0 && (
          <div className="py-20 text-center">

            <FaCheckCircle
              className="mx-auto text-primary mb-4"
              size={50}
            />

            <h3 className="text-2xl font-bold">
              No Completed Projects
            </h3>

            <p className="text-base-content/60 mt-2">
              Completed projects will appear here
            </p>

          </div>
        )}
      </div>
    </div>
  );
};

export default CompletedProjects;