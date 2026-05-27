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
} from "react-icons/fa";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-booking", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user.email}`);
      return res.data;
    },
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";
      case "approved":
        return "badge-success";
      case "cancelled":
        return "badge-error";
      default:
        return "badge-ghost";
    }
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h2 className="text-4xl font-black text-secondary">My Bookings</h2>

          <p className="text-base-content/60 mt-2">
            Total Bookings:{" "}
            <span className="font-semibold text-primary">
              {bookings.length}
            </span>
          </p>
        </div>
      </div>

      {/* LOADING */}
      {isLoading && (
        <div className="grid place-items-center py-20">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && bookings.length === 0 && (
        <div className="text-center py-20 bg-base-100 rounded-3xl border border-base-300">
          <FaCalendarAlt className="mx-auto text-5xl text-base-content/30 mb-4" />

          <h2 className="text-3xl font-bold mb-2">No Bookings Found</h2>

          <p className="text-base-content/60">
            You haven’t booked any services yet.
          </p>
        </div>
      )}

      {/* TABLE */}
      {!isLoading && bookings.length > 0 && (
        <div className="overflow-x-auto bg-base-100 border border-base-300 rounded-3xl shadow-sm">
          <table className="table">
            {/* HEADER */}
            <thead className="bg-base-200 text-base-content">
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
                <tr key={booking._id} className="hover:bg-base-200 transition">
                  {/* SERVICE */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-2xl overflow-hidden">
                        <img
                          src={booking.serviceImage}
                          className="w-full h-full object-cover"
                          alt=""
                        />
                      </div>

                      <div>
                        <p className="font-semibold">{booking.serviceName}</p>

                        <p className="text-xs text-base-content/50">
                          Booking ID: {booking._id.slice(0, 6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* DATE */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-primary" />
                      {booking.bookingDate}
                    </div>
                  </td>

                  {/* TIME */}
                  <td>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-primary" />
                      {booking.bookingTime}
                    </div>
                  </td>

                  {/* PAYMENT */}
                  <td>
                    {booking.paymentStatus === "paid" ? (
                      <span className="badge badge-success gap-2">
                        <FaMoneyBill />
                        Paid
                      </span>
                    ) : (
                      <button className="btn btn-primary btn-sm">Pay</button>
                    )}
                  </td>

                  {/* STATUS */}
                  <td>
                    <span
                      className={`badge gap-2 ${getStatusStyle(
                        booking.bookingStatus,
                      )}`}
                    >
                      {booking.bookingStatus === "approved" && (
                        <FaCheckCircle />
                      )}

                      {booking.bookingStatus === "cancelled" && (
                        <FaTimesCircle />
                      )}

                      {booking.bookingStatus || "pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
