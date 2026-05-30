import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Loading from "../components/Loading/Loading";
import Forbidden from "../components/Forbidden/Forbidden";

const DecoratorRoute = ({children}) => {
  const { user, loading } = useAuth();
  const [role, roleLoading] = useRole();

  if (loading || !user || roleLoading) {
    return <Loading />;
  }

  if (role !== "decorator") {
    return <Forbidden />;
  }
  return children;
};

export default DecoratorRoute;
