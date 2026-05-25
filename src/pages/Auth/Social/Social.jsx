import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const Social = () => {
    const {signInGoogle} = useAuth();
    const axiosSecure = useAxiosSecure();

    const handleGoogleSignIn = () =>{
        signInGoogle()
        .then(result => {
            console.log(result.user);

            // user data save into database
            const userInfo = {
              email: result.user.email,
              displayName: result.user.displayName,
              photoURL: result.user.photoURL
            }

            axiosSecure.post('/users', userInfo)
            .then(res =>{
              console.log(res.data);
            })
            .catch(error =>{
              console.error(error.message);
            })
        })
    }
    return (
           <button onClick={handleGoogleSignIn}
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