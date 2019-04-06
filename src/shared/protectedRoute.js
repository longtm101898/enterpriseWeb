import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { toast } from "react-toastify";
const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      path={path}
      {...rest}
      render={props => {
        if (!getCurrentUser()) {
            toast.error("Unauthorized!!!")
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          );
        }

        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
