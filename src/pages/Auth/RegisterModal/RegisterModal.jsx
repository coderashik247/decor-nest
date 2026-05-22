import React from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaArrowRight,
} from "react-icons/fa";

const RegisterModal = ({
  setShowRegisterModal,
  setShowLoginModal,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = (data) => {
    console.log(data);
  };

  // 🔥 FIXED CLOSE
  const handleClose = () => {
    setShowRegisterModal(false);
  };

  return (
    <dialog className="modal modal-open backdrop-blur-md px-4">

      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/40"
        onClick={handleClose}
      ></div>

      {/* MODAL */}
      <div className="modal-box max-w-2xl w-full bg-base-100 border border-base-300 rounded-4xl p-0 overflow-hidden shadow-2xl relative z-10">

        {/* TOP SECTION */}
        <div className="relative bg-secondary text-secondary-content px-8 pt-10 pb-24 overflow-hidden">

          {/* GLOW */}
          <div className="absolute -top-20 -left-10 w-52 h-52 bg-primary/20 blur-3xl rounded-full"></div>

          <div className="absolute top-0 right-0 w-44 h-44 bg-primary/10 rounded-full blur-3xl"></div>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-circle bg-white/10 border-none text-white hover:bg-primary hover:text-black absolute top-5 right-5"
          >
            ✕
          </button>

          {/* TEXT */}
          <div className="relative z-10">

            <p className="uppercase tracking-[4px] text-primary text-sm font-semibold mb-3">
              Join DecorNest
            </p>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Create Your <br /> Account
            </h2>

            <p className="mt-4 text-white/70 text-sm">
              Register now and explore premium decoration
              services for your dream events.
            </p>

          </div>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="px-8 pb-8 -mt-14 relative z-20"
        >

          {/* CARD */}
          <div className="bg-base-100 rounded-[28px] border border-base-300 p-6 shadow-xl space-y-5">

            {/* NAME */}
            <div>

              <label className="font-semibold text-sm mb-2 block">
                Full Name
              </label>

              <div className="relative">

                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                <input
                  type="text"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  placeholder="Enter your full name"
                  className="input input-bordered w-full rounded-2xl pl-12 h-14 focus:outline-none focus:border-primary"
                />

              </div>

              {errors.name && (
                <p className="text-error text-sm mt-2">
                  {errors.name.message}
                </p>
              )}

            </div>

            {/* PHOTO */}
            <div>

              <label className="font-semibold text-sm mb-2 block">
                Profile Photo
              </label>

              <div className="relative">

                <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 z-10" />

                <input
                  type="file"
                  {...register("photo", {
                    required: "Photo is required",
                  })}
                  className="file-input file-input-bordered w-full rounded-2xl pl-10 h-14"
                />

              </div>

              {errors.photo && (
                <p className="text-error text-sm mt-2">
                  {errors.photo.message}
                </p>
              )}

            </div>

            {/* EMAIL */}
            <div>

              <label className="font-semibold text-sm mb-2 block">
                Email Address
              </label>

              <div className="relative">

                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                  placeholder="Enter your email"
                  className="input input-bordered w-full rounded-2xl pl-12 h-14 focus:outline-none focus:border-primary"
                />

              </div>

              {errors.email && (
                <p className="text-error text-sm mt-2">
                  {errors.email.message}
                </p>
              )}

            </div>

            {/* PASSWORD */}
            <div>

              <label className="font-semibold text-sm mb-2 block">
                Password
              </label>

              <div className="relative">

                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />

                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Password must be at least 6 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        "Must contain uppercase, lowercase, number & special character",
                    },
                  })}
                  placeholder="Create a strong password"
                  className="input input-bordered w-full rounded-2xl pl-12 h-14 focus:outline-none focus:border-primary"
                />

              </div>

              {errors.password && (
                <p className="text-error text-sm mt-2">
                  {errors.password.message}
                </p>
              )}

            </div>

            {/* REGISTER BUTTON */}
            <button className="btn btn-primary w-full h-14 rounded-2xl text-primary-content text-base font-semibold border-none hover:scale-[1.02] transition-all duration-300">

              Create Account

              <FaArrowRight />

            </button>

            {/* DIVIDER */}
            <div className="divider text-xs text-base-content/40">
              OR
            </div>

            {/* GOOGLE */}
            <button
              type="button"
              className="btn bg-base-100 border border-base-300 w-full h-14 rounded-2xl hover:border-primary hover:bg-primary/5"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                alt="google"
                className="w-5 h-5"
              />

              Continue with Google
            </button>

            {/* LOGIN */}
            <p className="text-center text-sm text-base-content/70 pt-2">

              Already have an account?

              <button
                type="button"
                onClick={() => {
                  setShowRegisterModal(false);
                  setShowLoginModal(true);
                }}
                className="ml-2 text-primary font-semibold hover:underline"
              >
                Login
              </button>

            </p>

          </div>

        </form>

      </div>

    </dialog>
  );
};

export default RegisterModal;