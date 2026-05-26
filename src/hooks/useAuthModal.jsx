import React, { use } from 'react';
import AuthModalContext from '../contexts/AuthModalProvider/AuthModalContext';

const useAuthModal = () => {

    const authModalInfo = use(AuthModalContext);
    return authModalInfo;
};

export default useAuthModal;