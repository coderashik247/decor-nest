import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
  FaMoneyBillWave,
  FaPaintBrush,
} from "react-icons/fa";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const decoratorModalRef = useRef();
  const profileModalRef = useRef();

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedDecorator, setSelectedDecorator] = useState(null);

  // FETCH BOOKINGS
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["bookings", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings?bookingStatus=confirmed");
      console.log(res.data);
      return res.data;
    },
  });

  // FETCH AVAILABLE DECORATORS
  const { data: decorators = [], refetch: decoratorRefetch } = useQuery({
    queryKey: [
      "decorators",
      selectedBooking?.bookingRegion,
      selectedBooking?.bookingDistrict,
    ],
    enabled: !!selectedBooking,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/decorators?status=approved&district=${selectedBooking?.bookingDistrict}&region=${selectedBooking?.bookingRegion}&workStatus=available`,
      );
      return res.data;
    },
  });

  // OPEN MODAL
  const openAssignDecoratorModal = (booking) => {
    setSelectedBooking(booking);
    decoratorModalRef.current.showModal();
  };

  // VIEW PROFILE
  const handleViewProfile = (decorator) => {
    setSelectedDecorator(decorator);
    profileModalRef.current.showModal();
  };

  // ASSIGN DECORATOR
  const handleAssignDecorator = async (decorator) => {
    try {
      const res = await axiosSecure.patch(`/bookings/${selectedBooking._id}/assign-decorator`, {
        decoratorId: decorator._id,
        decoratorName: decorator.name,
        decoratorEmail: decorator.email,
        status: "decorator_assigned",
      });

      if (res.data.success || res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Decorator Assigned!",
          text: `${decorator.name} assigned successfully`,
          timer: 1500,
          showConfirmButton: false,
        });

        decoratorRefetch();
        refetch();
        decoratorModalRef.current.close();
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
      });
    }
  };

  // STATUS BADGE
  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="badge bg-warning/20 text-warning gap-2">
            <FaHourglassHalf />
            Pending
          </span>
        );

      case "decorator_assigned":
        return (
          <span className="badge bg-primary text-black gap-2">
            <FaCheckCircle />
            Decorator Assigned
          </span>
        );

      case "completed":
        return (
          <span className="badge bg-success text-white gap-2">
            <FaCheckCircle />
            Completed
          </span>
        );

      case "cancelled":
        return (
          <span className="badge bg-base-300 gap-2">
            <FaTimesCircle />
            Cancelled
          </span>
        );

      default:
        return <span className="badge">{status}</span>;
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
      <div className="bg-base-100 rounded-2xl p-6 shadow-lg flex justify-between items-center">
        <div className="flex items-center gap-4">
          <FaCalendarCheck size={28} className="text-primary" />
          <div>
            <h2 className="text-2xl font-bold text-secondary">
              Manage Bookings
            </h2>
            <p className="text-sm text-base-content/60">
              Assign decorators & manage customer bookings
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-base-content/60">Total</p>
          <h3 className="text-2xl font-bold text-primary">{bookings.length}</h3>
        </div>
      </div>

      {/* EMPTY */}
      {bookings.length === 0 && (
        <div className="text-center py-20">
          <FaCalendarCheck className="text-5xl text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold">No Bookings Found</h2>
        </div>
      )}

      {/* TABLE */}
      {bookings.length > 0 && (
        <div className="bg-base-100 b rounded-2xl overflow-hidden shadow-lg">
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
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td>
                      <p className="font-semibold">{booking.userName}</p>
                      <p className="text-xs text-gray-500">
                        {booking.userEmail}
                      </p>
                    </td>

                    <td>{booking.serviceName}</td>

                    <td>{booking.bookingDate}</td>

                    <td className="font-bold text-primary">
                      ৳ {booking.amount || booking.servicePrice}
                    </td>

                    <td>
                      {booking.paymentStatus === "paid" ? (
                        <span className="badge bg-success text-white">
                          <FaMoneyBillWave /> Paid
                        </span>
                      ) : (
                        <span className="badge">Unpaid</span>
                      )}
                    </td>

                    <td>{statusBadge(booking.bookingStatus)}</td>

                    <td>
                      <button
                        disabled={
                          booking.bookingStatus === "decorator_assigned"
                        }
                        onClick={() => openAssignDecoratorModal(booking)}
                        className={`btn ${
                          booking.bookingStatus === "decorator_assigned"
                            ? "btn-disabled"
                            : "btn-primary"
                        } text-black`}
                      >
                        {booking.bookingStatus === "decorator_assigned"
                          ? "Already Assigned"
                          : "Find Decorator"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* DECORATOR MODAL */}
      <dialog ref={decoratorModalRef} className="modal">
        <div className="modal-box max-w-4xl">
          <h3 className="text-xl font-bold mb-4">Available Decorators</h3>

          {decorators.length > 0 ? (
            <div className="space-y-4">
              {decorators.map((decorator) => (
                <div
                  key={decorator._id}
                  className="border p-4 rounded-xl flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-bold">{decorator.name}</h2>
                    <p className="text-sm text-gray-500">{decorator.email}</p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewProfile(decorator)}
                      className="btn btn-outline"
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => handleAssignDecorator(decorator)}
                      className="btn btn-primary text-black"
                    >
                      Assign
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No decorators found</p>
          )}

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>

      {/* PROFILE MODAL */}
      <dialog ref={profileModalRef} className="modal">
        <div className="modal-box">
          <h3 className="text-xl font-bold">Decorator Profile</h3>
          <p>{selectedDecorator?.name}</p>
          <p>{selectedDecorator?.email}</p>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageBookings;
