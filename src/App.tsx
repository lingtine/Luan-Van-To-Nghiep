import React from "react";
import router from "./routers/routers";
import { RouterProvider } from "react-router-dom";
import { getCookie } from "utils/cookies/cookies";
import { jwtDecode } from "jwt-decode";
import { useGetEmployeeMutation } from "redux/api/auth/employeeApi";
import { useGetCustomerMutation } from "redux/api/auth/customer-api";
import { useEffect } from "react";
import { IAccessToken } from "redux/api/types";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App: React.FC = () => {
  const accessToken = getCookie("accessToken");

  const [getEmployee] = useGetEmployeeMutation();
  const [getCustomer] = useGetCustomerMutation();

  useEffect(() => {
    if (accessToken) {
      const data: IAccessToken = jwtDecode(accessToken);
      if (data.role === "Customer") {
        getCustomer();
      } else {
        getEmployee();
      }
    }
  }, [getEmployee, getCustomer, accessToken]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
