import React from "react";
import router from "./routers/routers";
import { RouterProvider } from "react-router-dom";
import { getCookie } from "utils/cookies/cookies";
import { jwtDecode } from "jwt-decode";
import { useGetEmployeeMutation } from "redux/api/auth/employeeApi";
import { useGetCustomerMutation } from "redux/api/auth/customer-api";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App: React.FC = () => {
  const accessToken = getCookie("accessToken");

  const [getEmployee, {}] = useGetEmployeeMutation();
  const [getCustomer, {}] = useGetCustomerMutation();

  useEffect(() => {
    if (accessToken) {
      const data: { role: string } = jwtDecode(accessToken);
      if (data.role === "Customer") {
        getCustomer();
      } else {
        getEmployee();
      }
    }
  }, []);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
