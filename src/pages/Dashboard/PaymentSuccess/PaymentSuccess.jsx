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
          }, 10000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [sessionId, axiosSecure, navigate]);

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-10">
      <div className="max-w-2xl w-full bg-base-100 rounded-3xl shadow-2xl border border-base-300 overflow-hidden">

        {/* TOP BANNER */}
        <div className="bg-secondary text-secondary-content text-center py-10 px-6 border-b border-base-300">

          <div className="w-36 mx-auto bg-base-100/10 rounded-full p-3 shadow-soft">
            <Lottie animationData={successAnimation} loop={false} />
          </div>

          <h1 className="text-4xl md:text-5xl font-black mt-4">
            Payment Successful
          </h1>

          <p className="mt-3 text-secondary-content/70">
            Thank you for choosing DecorNest.
          </p>
        </div>

        {/* CONTENT */}
        <div className="p-8">

          <div className="grid md:grid-cols-2 gap-5">

            {/* Transaction ID */}
            <div className="bg-base-200 rounded-2xl p-5">
              <p className="text-sm text-base-content/60">
                Transaction ID
              </p>
              <h3 className="font-bold break-all mt-1">
                {paymentInfo?.transactionId}
              </h3>
            </div>

            {/* Amount */}
            <div className="bg-base-200 rounded-2xl p-5">
              <p className="text-sm text-base-content/60">
                Amount Paid
              </p>
              <h3 className="font-bold text-primary text-2xl mt-1">
                ৳ {paymentInfo?.amount}
              </h3>
            </div>

            {/* Email */}
            <div className="bg-base-200 rounded-2xl p-5">
              <p className="text-sm text-base-content/60">
                Customer Email
              </p>
              <h3 className="font-semibold mt-1">
                {paymentInfo?.customerEmail}
              </h3>
            </div>

            {/* Status */}
            <div className="bg-base-200 rounded-2xl p-5">
              <p className="text-sm text-base-content/60">
                Payment Status
              </p>

              <span className="badge bg-primary text-primary-content badge-lg mt-2 border-0">
                Paid
              </span>
            </div>

          </div>

          {/* SUCCESS MESSAGE */}
          <div className="mt-8 bg-accent border border-base-300 rounded-2xl p-5">

            <h3 className="text-xl font-bold text-primary mb-2">
              Booking Confirmed 🎉
            </h3>

            <p className="text-base-content/70">
              Your payment has been received successfully. Our team
              will contact you shortly regarding your event decoration.
            </p>

          </div>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">

            <Link
              to="/dashboard/my-bookings"
              className="btn btn-primary flex-1 rounded-2xl shadow-soft"
            >
              View My Bookings
            </Link>

            <Link
              to="/"
              className="btn btn-outline btn-neutral flex-1 rounded-2xl"
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