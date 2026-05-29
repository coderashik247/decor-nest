import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaMoneyBillWave } from "react-icons/fa6";
import { Link } from "react-router";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-infinity loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">

        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/15 text-primary shadow-soft">
            <FaMoneyBillWave size={26} />
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-secondary">
              Payment History
            </h2>

            <p className="text-base-content/60 mt-1">
              Track all your completed transactions
            </p>
          </div>
        </div>

        <div className="badge badge-primary badge-lg px-4 py-3">
          {payments.length} Payments
        </div>
      </div>

      {/* EMPTY STATE */}
      {payments.length === 0 && (
        <div className="text-center py-20 bg-base-100 border border-base-300 rounded-2xl shadow-soft">
          <h3 className="text-2xl font-semibold text-secondary">
            No Payment History Found
          </h3>

          <p className="text-base-content/60 mt-2">
            Your completed payments will appear here.
          </p>
        </div>
      )}

      {/* TABLE */}
      {payments.length > 0 && (
        <div className="bg-base-100 rounded-2xl border border-base-300 shadow-card overflow-hidden">

          <div className="overflow-x-auto">
            <table className="table table-zebra">

              {/* HEAD */}
              <thead className="bg-secondary text-secondary-content">
                <tr>
                  <th>#</th>
                  <th>Service</th>
                  <th>Amount</th>
                  <th>Transaction ID</th>
                  <th>Tracking</th>
                  <th>Date</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>

                {payments.map((payment, index) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-base-200 transition"
                  >
                    <th className="text-base-content/70">
                      {index + 1}
                    </th>

                    <td className="font-medium text-secondary">
                      {payment.parcelName || "Service Payment"}
                    </td>

                    <td>
                      <span className="badge bg-primary text-primary-content border-0 px-3 py-2">
                        ৳ {payment.amount}
                      </span>
                    </td>

                    <td className="text-xs font-mono text-base-content/70 break-all">
                      {payment.transactionId}
                    </td>

                    <td>
                      <Link
                        to={`/parcel-track/${payment.trackingId}/logs`}
                        className="badge badge-outline badge-primary"
                      >
                        Track
                      </Link>
                    </td>

                    <td className="text-sm text-base-content/60">
                      {new Date(payment.paidAt).toLocaleString()}
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

export default PaymentHistory;