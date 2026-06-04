import axios from "axios";
import { useEffect } from "react";

import useAuth from "./useAuth";
import useAuthModal from "./useAuthModal";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();

  const { setShowLoginModal } = useAuthModal();

  useEffect(() => {
    // REQUEST INTERCEPTOR
    const reqInterceptor =
      axiosSecure.interceptors.request.use(
        async (config) => {
          if(user){
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
          }

          return config;
        }
      );

    // RESPONSE INTERCEPTOR
    const resInterceptor =
      axiosSecure.interceptors.response.use(
        (response) => {
          return response;
        },

        async (error) => {
          const statusCode = error.response?.status;

          if (
            statusCode === 401 ||
            statusCode === 403
          ) {
            await logOut();

            // open login modal
            setShowLoginModal(true);
          }

          return Promise.reject(error);
        }
      );

    return () => {
      axiosSecure.interceptors.request.eject(
        reqInterceptor
      );

      axiosSecure.interceptors.response.eject(
        resInterceptor
      );
    };
  }, [user, logOut, setShowLoginModal]);

  return axiosSecure;
};

export default useAxiosSecure;