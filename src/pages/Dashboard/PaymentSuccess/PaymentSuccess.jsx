import React, { useEffect, useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import successAnimation from "../../../assets/payment_successful.json";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [paymentInfo, setPaymentInfo] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    axiosSecure
      .patch(`/payment-success?session_id=${sessionId}`)
      .then((res) => {
        if (res.data.success) {
          setPaymentInfo(res.data.payment);

          Swal.fire({
            icon: "success",
            title: "Payment Successful 🎉",
            text: "Your booking has been confirmed.",
            timer: 2500,
            showConfirmButton: false,
          });

          setTimeout(() => {
            navigate("/dashboard/my-bookings");
          }, 8000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-base-100 rounded-4xl shadow-2xl border border-base-300 overflow-hidden">

        {/* Top Banner */}
        <div className="bg-linear-to-r from-green-500 to-emerald-600 text-white text-center py-10 px-6">
          <div className="w-40 mx-auto">
            <Lottie animationData={successAnimation} loop={false} />
          </div>

          <h1 className="text-4xl md:text-5xl font-black mt-2">
            Payment Successful
          </h1>

          <p className="mt-3 text-white/80">
            Thank you for choosing DecorNest.
          </p>
        </div>

        {/* Content */}
        <div className="p-8">

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-base-200 rounded-2xl p-5">
              <p className="text-sm text-base-content/60">
                Transaction ID
              </p>

              <h3 className="font-bold break-all mt-1">
                {paymentInfo?.transactionId}
              </h3>
            </div>

            <div className="bg-base-200 rounded-2xl p-5">
              <p className="text-sm text-base-content/60">
                Amount Paid
              </p>

              <h3 className="font-bold text-success text-2xl mt-1">
                ৳ {paymentInfo?.amount}
              </h3>
            </div>

            <div className="bg-base-200 rounded-2xl p-5">
              <p className="text-sm text-base-content/60">
                Customer Email
              </p>

              <h3 className="font-semibold mt-1">
                {paymentInfo?.customerEmail}
              </h3>
            </div>

            <div className="bg-base-200 rounded-2xl p-5">
              <p className="text-sm text-base-content/60">
                Payment Status
              </p>

              <span className="badge badge-success badge-lg mt-2">
                Paid
              </span>
            </div>

          </div>

          {/* Success Message */}
          <div className="mt-8 bg-success/10 border border-success/20 rounded-2xl p-5">

            <h3 className="text-xl font-bold text-success mb-2">
              Booking Confirmed 🎉
            </h3>

            <p className="text-base-content/70">
              Your payment has been received successfully. Our team
              will contact you shortly regarding your event decoration.
            </p>

          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <Link
              to="/dashboard/my-bookings"
              className="btn btn-primary flex-1 rounded-2xl"
            >
              View My Bookings
            </Link>

            <Link
              to="/"
              className="btn btn-outline flex-1 rounded-2xl"
            >
              Back To Home
            </Link>

          </div>

          <p className="text-center text-sm text-base-content/50 mt-6">
            You will be redirected automatically in a few seconds...
          </p>

        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;