import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

import {
  FaUserCheck,
  FaUserXmark,
  FaTrashCan,
  FaEye,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaPaintbrush,
} from "react-icons/fa6";
import Swal from "sweetalert2";

const ApproveDecorators = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedDecorator, setSelectedDecorator] = useState(null);

  const {
    isLoading,
    data: decorators = [],
    refetch,
  } = useQuery({
    queryKey: ["decorators"],
    queryFn: async () => {
      const res = await axiosSecure.get("/decorators");
      return res.data;
    },
  });

  const updateDecoratorStatus = (decorator, status) => {
    const updateInfo = {
      status,
      email: decorator.email,
    };

    axiosSecure
      .patch(`/decorators/${decorator._id}/status`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Decorator ${status} successfully`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      });
  };

  const handleApprove = (decorator) => {
    updateDecoratorStatus(decorator, "approved");
  };

  const handleReject = (decorator) => {
    updateDecoratorStatus(decorator, "rejected");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Decorator?",
      text: "This decorator will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/decorators/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();

            Swal.fire({
              icon: "success",
              title: "Deleted Successfully",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-infinity loading-xl text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 rounded-2xl bg-primary/15 text-primary">
          <FaPaintbrush size={30} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-secondary">
            Decorator Requests
          </h2>

          <p className="text-gray-500 mt-1">
            Total Decorators: {decorators.length}
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-base-100 shadow-xl rounded-2xl overflow-hidden border border-base-300">
        <div className="overflow-x-auto">
          <table className="table table-lg">
            <thead className="bg-secondary text-white">
              <tr>
                <th>SL</th>
                <th>Decorator</th>
                <th>Team Name</th>
                <th>Specialty</th>
                <th>Experience</th>
                <th>Location</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="[&>tr:nth-child(odd)]:bg-primary/10">
              {decorators.map((decorator, index) => (
                <tr
                  key={decorator._id}
                  className="hover:bg-primary/5 transition"
                >
                  <td>{index + 1}</td>

                  <td>
                    <div className="flex items-center gap-3">
                      <img
                        src={decorator.teamImage}
                        alt={decorator.name}
                        className="w-12 h-12 rounded-full object-cover border"
                        onError={(e) => {
                          console.log("Image failed:", decorator.teamImage);
                          e.target.src = "https://via.placeholder.com/150";
                        }}
                      />

                      <div>
                        <h4 className="font-semibold">{decorator.name}</h4>

                        <p className="text-sm text-gray-500">
                          {decorator.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>{decorator.teamName}</td>

                  <td>
                    <span className="badge badge-outline">
                      {decorator.specialty}
                    </span>
                  </td>

                  <td>{decorator.experience} Years</td>

                  <td>
                    {decorator.district}, {decorator.region}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        decorator.status === "pending"
                          ? "badge-warning"
                          : decorator.status === "approved"
                            ? "badge-success"
                            : "badge-error"
                      } text-black`}
                    >
                      {decorator.status}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => setSelectedDecorator(decorator)}
                        className="btn btn-square btn-sm btn-ghost hover:bg-info hover:text-white"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => handleApprove(decorator)}
                        className="btn btn-square btn-sm btn-ghost hover:bg-success hover:text-white"
                      >
                        <FaUserCheck />
                      </button>

                      <button
                        onClick={() => handleReject(decorator)}
                        className="btn btn-square btn-sm btn-ghost hover:bg-warning hover:text-black"
                      >
                        <FaUserXmark />
                      </button>

                      <button
                        onClick={() => handleDelete(decorator._id)}
                        className="btn btn-square btn-sm btn-ghost hover:bg-error hover:text-white"
                      >
                        <FaTrashCan />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {decorators.length === 0 && (
          <div className="py-20 text-center">
            <h3 className="text-2xl font-bold">No Decorator Requests Found</h3>

            <p className="text-gray-500 mt-2">
              New decorator applications will appear here.
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedDecorator && (
        <dialog open className="modal modal-middle">
          <div className="modal-box max-w-2xl rounded-3xl">
            <div className="flex flex-col items-center">
              <img
                src={selectedDecorator.teamImage}
                alt=""
                className="w-28 h-28 rounded-full object-cover border-4 border-primary"
              />

              <h3 className="text-2xl font-bold mt-4">
                {selectedDecorator.name}
              </h3>

              <p className="text-primary font-medium">
                {selectedDecorator.teamName}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-8">
              <div className="bg-base-200 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Specialty</p>

                <h4 className="font-semibold">{selectedDecorator.specialty}</h4>
              </div>

              <div className="bg-base-200 p-4 rounded-xl">
                <p className="text-sm text-gray-500">Experience</p>

                <h4 className="font-semibold">
                  {selectedDecorator.experience} Years
                </h4>
              </div>

              <div className="bg-base-200 p-4 rounded-xl flex gap-3 items-center">
                <FaEnvelope className="text-primary" />

                <div>
                  <p className="text-sm text-gray-500">Email</p>

                  <h4>{selectedDecorator.email}</h4>
                </div>
              </div>

              <div className="bg-base-200 p-4 rounded-xl flex gap-3 items-center">
                <FaPhone className="text-primary" />

                <div>
                  <p className="text-sm text-gray-500">Phone</p>

                  <h4>{selectedDecorator.phone}</h4>
                </div>
              </div>

              <div className="bg-base-200 p-4 rounded-xl flex gap-3 items-center md:col-span-2">
                <FaLocationDot className="text-primary" />

                <div>
                  <p className="text-sm text-gray-500">Service Area</p>

                  <h4>
                    {selectedDecorator.district}, {selectedDecorator.region}
                  </h4>
                </div>
              </div>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedDecorator(null)}
                className="btn btn-outline"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ApproveDecorators;
