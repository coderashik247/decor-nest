import React, { useState } from "react";
import AuthModalContext from "./AuthModalContext";

const AuthModalProvider = ({ children }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [pendingBooking, setPendingBooking] = useState(false);

  const authModalValue = {
    showLoginModal,
    setShowLoginModal,
    showRegisterModal,
    setShowRegisterModal,
    pendingBooking, 
    setPendingBooking
  };
  return (
    <AuthModalContext.Provider value={authModalValue}>
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalProvider;
