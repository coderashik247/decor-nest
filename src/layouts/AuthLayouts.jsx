import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayouts = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayouts;