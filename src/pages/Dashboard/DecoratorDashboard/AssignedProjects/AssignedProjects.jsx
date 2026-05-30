import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

import {
  FaCalendarCheck,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const statusFlow = [
  "planning",
  "materials_prepared",
  "on_the_way",
  "setup_in_progress",
  "completed",
];

const AssignedProjects = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: projects = [], refetch } = useQuery({
    queryKey: ["assigned-projects", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/projects/assigned?decoratorEmail=${user.email}`
      );
      return res.data;
    },
  });

  // ✅ ACCEPT
  const handleAccept = async (project) => {
    const res = await axiosSecure.patch(
      `/bookings/${project._id}/project-status`,
      { projectStatus: "planning" }
    );

    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Project Accepted",
        text: "Work started!",
        timer: 1200,
        showConfirmButton: false,
      });

      refetch();
    }
  };

  // ❌ REJECT
  const handleReject = async (project) => {
    const confirm = await Swal.fire({
      title: "Reject this project?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes Reject",
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(
      `/bookings/${project._id}/project-status`,
      { projectStatus: "rejected" }
    );

    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Rejected",
        timer: 1200,
        showConfirmButton: false,
      });

      refetch();
    }
  };

  // 🔄 STATUS UPDATE
  const handleStatusUpdate = async (project, status) => {
    const confirm = await Swal.fire({
      title: "Update Status?",
      text: status.replaceAll("_", " "),
      icon: "question",
      showCancelButton: true,
    });

    if (!confirm.isConfirmed) return;

    const res = await axiosSecure.patch(
      `/bookings/${project._id}/project-status`,
      { projectStatus: status }
    );

    if (res.data.success) {
      Swal.fire({
        icon: "success",
        title: "Updated",
        timer: 1000,
        showConfirmButton: false,
      });

      refetch();
    }
  };

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-2xl bg-primary/15 text-primary">
          <FaCalendarCheck size={28} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-secondary">
            Assigned Projects
          </h2>
          <p className="text-gray-500">Total: {projects.length}</p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-base-100 border rounded-3xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">

          <table className="table">
            <thead className="bg-secondary text-white">
              <tr>
                <th>SL</th>
                <th>Project</th>
                <th>Customer</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {projects.map((p, index) => {

                // eslint-disable-next-line no-unused-vars
                const currentIndex = statusFlow.indexOf(
                  p.projectStatus || "planning"
                );

                return (
                  <tr key={p._id}>

                    <th>{index + 1}</th>

                    {/* PROJECT */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 text-primary rounded-xl">
                          <FaBoxOpen />
                        </div>
                        <div>
                          <h2 className="font-bold">{p.serviceName}</h2>
                          <p className="text-xs text-gray-500">{p._id}</p>
                        </div>
                      </div>
                    </td>

                    {/* CUSTOMER */}
                    <td>
                      <h3 className="font-semibold">{p.userName}</h3>
                      <p className="text-xs text-gray-500">{p.userEmail}</p>
                    </td>

                    {/* LOCATION */}
                    <td>
                      <span className="flex items-center gap-2">
                        <FaMapMarkerAlt />
                        {p.bookingDistrict}, {p.bookingRegion}
                      </span>
                    </td>

                    {/* STATUS */}
                    <td>
                      <span className="badge badge-primary">
                        {p.projectStatus}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td>

                      {/* PENDING */}
                      {p.projectStatus === "pending" ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAccept(p)}
                            className="btn btn-success btn-sm text-white"
                          >
                            <FaCheck /> Accept
                          </button>

                          <button
                            onClick={() => handleReject(p)}
                            className="btn btn-error btn-sm text-white"
                          >
                            <FaTimes /> Reject
                          </button>
                        </div>

                      ) : p.projectStatus === "rejected" ? (
                        <span className="text-red-500 font-bold">
                          Rejected
                        </span>

                      ) : (
                        <div className="flex gap-2 flex-wrap">

                          {p.projectStatus === "planning" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(p, "materials_prepared")
                              }
                              className="btn btn-sm btn-info text-white"
                            >
                              Materials
                            </button>
                          )}

                          {p.projectStatus === "materials_prepared" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(p, "on_the_way")
                              }
                              className="btn btn-sm btn-primary"
                            >
                              On Way
                            </button>
                          )}

                          {p.projectStatus === "on_the_way" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(p, "setup_in_progress")
                              }
                              className="btn btn-sm btn-warning"
                            >
                              Setup
                            </button>
                          )}

                          {p.projectStatus === "setup_in_progress" && (
                            <button
                              onClick={() =>
                                handleStatusUpdate(p, "completed")
                              }
                              className="btn btn-sm btn-success"
                            >
                              Done
                            </button>
                          )}

                        </div>
                      )}

                    </td>

                  </tr>
                );
              })}

            </tbody>
          </table>

        </div>

        {/* EMPTY STATE */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <FaCalendarCheck className="text-5xl text-primary mx-auto mb-4" />
            <h2 className="text-xl font-bold">No Assigned Projects</h2>
          </div>
        )}

      </div>
    </div>
  );
};

export default AssignedProjects;