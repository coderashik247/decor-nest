import React from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaArrowRight,
} from "react-icons/fa";
import Social from "../Social/Social";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const RegisterModal = ({ setShowRegisterModal, setShowLoginModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    const profileImg = data.photo[0];
    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result);
        // store the image and get the photo url:
        const formData = new FormData();
        formData.append("image", profileImg);

        const image_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

        axios.post(image_API_URL, formData)
        .then(res =>{
            console.log(res.data.data.url);

            const photoURL= res.data.data.url;

            const userInfo = {
                email: data.email,
                displayName: data.name,
                photoURL: photoURL
            }

            // user data save on database
            axiosSecure.post('/users', userInfo)
            .then(res =>{
                if(res.data.insertedId){
                    console.log("User created in the database");
                }
            })  

            // update user profile:
            const userProfile = {
                displayName: data.name,
                photoURL: photoURL
            }

            updateUserProfile(userProfile)
            .then( () => {
                console.log('User profile updated!!!');
            })
            .catch(error => {
                console.error(error);
            })
        })
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // CLOSE MODAL
  const handleClose = () => {
    setShowRegisterModal(false);
  };

  return (
    <dialog className="modal modal-open px-3 sm:px-4 backdrop-blur-md">
      {/* BACKDROP */}
      <div className="fixed inset-0 bg-black/50" onClick={handleClose}></div>

      {/* MODAL */}
      <div className="modal-box relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-hidden rounded-[28px] sm:rounded-[36px] border border-base-300 bg-base-100 p-0 shadow-2xl">
        {/* TOP SECTION */}
        <div className="relative overflow-hidden bg-secondary px-5 sm:px-8 pt-8 sm:pt-10 pb-20 sm:pb-24 text-secondary-content">
          {/* GLOW EFFECT */}
          <div className="absolute -left-10 -top-20 h-52 w-52 rounded-full bg-primary/20 blur-3xl"></div>

          <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-primary/10 blur-3xl"></div>

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={handleClose}
            className="btn btn-circle btn-sm absolute right-4 top-4 border-none bg-white/10 text-white hover:bg-primary hover:text-black"
          >
            ✕
          </button>

          {/* TEXT */}
          <div className="relative z-10">
            <p className="mb-3 text-xs sm:text-sm font-semibold uppercase tracking-[4px] text-primary">
              Join DecorNest
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Create Your <br className="hidden sm:block" />
              Account
            </h2>

            <p className="mt-4 max-w-lg text-sm sm:text-base leading-7 text-white/70">
              Register now and explore premium decoration services for weddings,
              birthdays, interiors, and luxury events.
            </p>
          </div>
        </div>

        {/* FORM SECTION */}
        <form
          onSubmit={handleSubmit(handleRegistration)}
          className="relative z-20 -mt-14 px-4 sm:px-6 md:px-8 pb-6 sm:pb-8"
        >
          {/* CARD */}
          <div className="space-y-5 rounded-3xl sm:rounded-[30px] border border-base-300 bg-base-100 p-4 sm:p-6 shadow-xl">
            {/* NAME */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
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
                  className="input input-bordered h-12 sm:h-14 w-full rounded-2xl pl-12 focus:border-primary focus:outline-none"
                />
              </div>

              {errors.name && (
                <p className="mt-2 text-sm text-error">{errors.name.message}</p>
              )}
            </div>

            {/* PHOTO */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Profile Photo
              </label>

              <div className="relative">
                <FaImage className="absolute left-4 top-1/2 z-10 -translate-y-1/2 text-base-content/40" />

                <input
                  type="file"
                  accept="image/*"
                  {...register("photo", {
                    required: "Photo is required",
                  })}
                  className="file-input file-input-bordered h-12 sm:h-14 w-full rounded-2xl pl-10"
                />
              </div>

              {errors.photo && (
                <p className="mt-2 text-sm text-error">
                  {errors.photo.message}
                </p>
              )}
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
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
                  className="input input-bordered h-12 sm:h-14 w-full rounded-2xl pl-12 focus:border-primary focus:outline-none"
                />
              </div>

              {errors.email && (
                <p className="mt-2 text-sm text-error">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* PASSWORD */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
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
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                      message:
                        "Must contain uppercase, lowercase, number & special character",
                    },
                  })}
                  placeholder="Create a strong password"
                  className="input input-bordered h-12 sm:h-14 w-full rounded-2xl pl-12 focus:border-primary focus:outline-none"
                />
              </div>

              {errors.password && (
                <p className="mt-2 text-sm text-error">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* REGISTER BUTTON */}
            <button className="btn btn-primary h-12 sm:h-14 w-full rounded-2xl border-none text-sm sm:text-base font-semibold text-primary-content transition-all duration-300 hover:scale-[1.01]">
              Create Account
              <FaArrowRight />
            </button>

            {/* DIVIDER */}
            <div className="divider text-xs text-base-content/40">OR</div>

            {/* GOOGLE BUTTON */}
            <Social></Social>

            {/* LOGIN */}
            <p className="pt-2 text-center text-sm text-base-content/70">
              Already have an account?
              <button
                type="button"
                onClick={() => {
                  setShowRegisterModal(false);
                  setShowLoginModal(true);
                }}
                className="ml-2 font-semibold text-primary hover:underline"
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
