import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuthModal from "../../../hooks/useAuthModal";

const Social = () => {
  const { signInGoogle } = useAuth();

  const axiosSecure = useAxiosSecure();

  const {
    setShowLoginModal,
    setShowRegisterModal,
    pendingBooking,
    setPendingBooking,
  } = useAuthModal();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then(async (result) => {
        console.log(result.user);

        const userInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        // save user to database
        await axiosSecure.post("/users", userInfo);

        // close modals
        setShowLoginModal(false);
        setShowRegisterModal(false);

        // open booking modal automatically
        if (pendingBooking) {
          pendingBooking();
          setPendingBooking(null);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
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
  );
};

export default Social;