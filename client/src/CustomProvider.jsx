// This is newly created by lucky

import React from "react";
import { useLoadUserQuery } from "./features/api/authApi";
import { useSelector } from "react-redux";
import LoadingSpinner from "./components/LoadingSpinner";

const CustomProvider = ({ children }) => {
  const { isLoading } = useLoadUserQuery();
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div key={user?._id || "guest"}>{children}</div>
      )}
    </>
  );
};

export default CustomProvider;
