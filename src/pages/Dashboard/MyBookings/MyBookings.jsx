import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaCalendarAlt,
  FaClock,
  FaImage,
  FaMoneyBill,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarCheck,
} from "react-icons/fa";
import Swal from "sweetalert2";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  const handlePay = async (booking) => {
    try {
      const paymentInfo = {
        bookingId: booking._id,
        serviceName: booking.serviceName,
        amount: booking.servicePrice,
        customerEmail: booking.userEmail,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Payment Failed",
        text: "Something went wrong!",
      });
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "paid":
        return "badge-success";
      case "assigned":
        return "badge-info";
      case "completed":
        return "bg-primary text-primary-content";
      case "cancelled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  if (isLoading) {
    return (
      <div className="grid place-items-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/15 text-primary shadow-soft">
            <FaCalendarCheck size={26} />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-black text-secondary">
              My Bookings
            </h2>

            <p className="text-base-content/60 mt-2">
              Total Bookings:{" "}
              <span className="font-semibold text-primary">
                {bookings.length}
              </span>
            </p>
          </div>
        </div>

        <div className="badge badge-primary badge-lg px-4 py-3">
          {bookings.length} Items
        </div>
      </div>

      {/* EMPTY STATE */}
      {bookings.length === 0 && (
        <div className="text-center py-20 bg-base-100 rounded-3xl border border-base-300 shadow-soft">
          <FaCalendarAlt className="mx-auto text-5xl text-base-content/30 mb-4" />

          <h2 className="text-2xl font-bold text-secondary mb-2">
            No Bookings Found
          </h2>

          <p className="text-base-content/60">
            You haven’t booked any services yet.
          </p>
        </div>
      )}

      {/* TABLE */}
      {bookings.length > 0 && (
        <div className="bg-base-100 border border-base-300 rounded-3xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* HEADER */}
              <thead className="bg-secondary text-secondary-content">
                <tr>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="hover:bg-base-200 transition"
                  >
                    {/* SERVICE */}
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-base-300">
                          <img
                            src={booking.serviceImage}
                            className="w-full h-full object-cover"
                            alt=""
                          />
                        </div>

                        <div>
                          <p className="font-semibold text-secondary">
                            {booking.serviceName}
                          </p>

                          <p className="text-xs text-base-content/50">
                            ID: {booking._id.slice(0, 6)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* DATE */}
                    <td className="text-base-content/70">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="text-primary" />
                        {booking.bookingDate}
                      </div>
                    </td>

                    {/* TIME */}
                    <td className="text-base-content/70">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-primary" />
                        {booking.bookingTime}
                      </div>
                    </td>

                    {/* PAYMENT */}
                    <td>
                      {booking.paymentStatus === "paid" ? (
                        <span className="badge bg-primary text-primary-content border-0 gap-2 px-3 py-2">
                          <FaMoneyBill />
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePay(booking)}
                          className="btn btn-primary btn-sm rounded-xl"
                        >
                          Pay Now
                        </button>
                      )}
                    </td>

                    {/* STATUS */}
                    <td>
                      <span
                        className={`badge gap-2 px-3 py-2 ${getStatusStyle(
                          booking.bookingStatus,
                        )}`}
                      >
                        {booking.bookingStatus === "approved" && (
                          <FaCheckCircle />
                        )}

                        {booking.bookingStatus === "cancelled" && (
                          <FaTimesCircle />
                        )}

                        {booking.bookingStatus ?? "pending"}
                      </span>
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

export default MyBookings;
