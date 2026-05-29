import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaMoneyBillWave,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["admin-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const handleAction = async (id, status) => {
    try {
      const result = await Swal.fire({
        title: `${status.toUpperCase()} Booking?`,
        text: `You are about to mark this booking as ${status}.`,
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#D4B06A",
        cancelButtonColor: "#1E293B",
        confirmButtonText: "Confirm",
      });

      if (!result.isConfirmed) return;

      const res = await axiosSecure.patch(`/bookings/${id}`, {
        status,
      });

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: `Booking ${status}`,
          timer: 1500,
          showConfirmButton: false,
        });

        refetch();
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Action Failed",
      });
    }
  };

  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="badge bg-primary/15 text-secondary border-primary/20 gap-2">
            <FaHourglassHalf />
            Pending
          </span>
        );

      case "approved":
        return (
          <span className="badge bg-secondary text-white border-0 gap-2">
            <FaCheckCircle />
            Approved
          </span>
        );

      case "completed":
        return (
          <span className="badge bg-primary text-black border-0 gap-2">
            <FaCheckCircle />
            Completed
          </span>
        );

      case "cancelled":
        return (
          <span className="badge bg-base-300 text-base-content border-0 gap-2">
            <FaTimesCircle />
            Cancelled
          </span>
        );

      default:
        return (
          <span className="badge badge-ghost">
            {status}
          </span>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center py-24">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="bg-base-100 border border-base-300 rounded-[28px] p-6 shadow-lg">

        <div className="flex items-center justify-between flex-wrap gap-4">

          <div className="flex items-center gap-4">

            <div className="p-4 bg-primary/10 text-primary rounded-2xl">
              <FaCalendarCheck size={28} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-secondary">
                Manage Bookings
              </h2>

              <p className="text-base-content/60">
                Manage and monitor customer bookings
              </p>
            </div>

          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-2xl px-5 py-3">
            <p className="text-xs uppercase tracking-wider text-base-content/60">
              Total Bookings
            </p>

            <h3 className="text-3xl font-black text-primary">
              {bookings.length}
            </h3>
          </div>

        </div>

      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 && (
        <div className="bg-base-100 border border-base-300 rounded-[28px] py-24 text-center">

          <FaCalendarCheck className="mx-auto text-primary text-6xl mb-5" />

          <h2 className="text-3xl font-bold text-secondary">
            No Bookings Found
          </h2>

          <p className="text-base-content/60 mt-2">
            Customer bookings will appear here.
          </p>

        </div>
      )}

      {/* TABLE */}
      {bookings.length > 0 && (
        <div className="bg-base-100 border border-base-300 rounded-[28px] shadow-lg overflow-hidden">

          <div className="px-6 py-5 border-b border-base-300">
            <h3 className="text-xl font-bold text-secondary">
              Booking Records
            </h3>
          </div>

          <div className="overflow-x-auto">

            <table className="table">

              <thead className="bg-secondary text-white">
                <tr>
                  <th>Customer</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>

              <tbody>

                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-primary/5 transition-all"
                  >

                    {/* CUSTOMER */}
                    <td>
                      <div>
                        <h3 className="font-semibold text-secondary">
                          {booking.userName}
                        </h3>

                        <p className="text-xs text-base-content/50">
                          {booking.userEmail}
                        </p>
                      </div>
                    </td>

                    {/* SERVICE */}
                    <td>
                      <div>
                        <p className="font-medium">
                          {booking.serviceName}
                        </p>

                        <p className="text-xs text-base-content/50">
                          Decoration Service
                        </p>
                      </div>
                    </td>

                    {/* DATE */}
                    <td>{booking.bookingDate}</td>

                    {/* AMOUNT */}
                    <td>
                      <span className="font-black text-primary text-lg">
                        ৳ {booking.amount || booking.servicePrice}
                      </span>
                    </td>

                    {/* PAYMENT */}
                    <td>
                      {booking.paymentStatus === "paid" ? (
                        <span className="badge bg-primary text-black border-0 gap-2">
                          <FaMoneyBillWave />
                          Paid
                        </span>
                      ) : (
                        <span className="badge bg-base-300 border-0">
                          Unpaid
                        </span>
                      )}
                    </td>

                    {/* STATUS */}
                    <td>
                      {statusBadge(booking.bookingStatus)}
                    </td>

                    {/* ACTIONS */}
                    <td>

                      <div className="flex flex-wrap justify-center gap-2">

                        <button
                          onClick={() =>
                            handleAction(
                              booking._id,
                              "approved"
                            )
                          }
                          className="btn btn-sm bg-secondary text-white border-none hover:opacity-90"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() =>
                            handleAction(
                              booking._id,
                              "completed"
                            )
                          }
                          className="btn btn-sm bg-primary text-black border-none hover:opacity-90"
                        >
                          Complete
                        </button>

                        <button
                          onClick={() =>
                            handleAction(
                              booking._id,
                              "cancelled"
                            )
                          }
                          className="btn btn-sm bg-base-300 border-none hover:bg-base-content hover:text-white"
                        >
                          Cancel
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>
      )}

    </div>
  );
};

export default ManageBookings;