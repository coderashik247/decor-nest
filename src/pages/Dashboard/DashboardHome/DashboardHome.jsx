import React from 'react';
import useRole from '../../../hooks/useRole';
import Loading from '../../../components/Loading/Loading';
import AdminDashboardHome from './AdminDashboardHome';
import DecoratorDashboardHome from './DecoratorDashboardHome';
import UserDashboardHome from './UserDashboardHome';
import Reveal from '../../../animation/Reveal';

const DashboardHome = () => {
    const [role, roleLoading] = useRole();

    if(roleLoading){
        return <Loading></Loading>
    }
    if(role === 'admin'){
        return <Reveal><AdminDashboardHome></AdminDashboardHome></Reveal>
    }
    else if(role === 'decorator'){
        return <Reveal><DecoratorDashboardHome></DecoratorDashboardHome></Reveal>
    }
    else {
        return <Reveal><UserDashboardHome></UserDashboardHome></Reveal>
    }
};

export default DashboardHome;