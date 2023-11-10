import React from "react";
import router from "./routers/routers";
import { RouterProvider } from "react-router-dom";
import { getCookie } from "utils/cookies/cookies";
import { jwtDecode } from "jwt-decode";
import { useGetEmployeeMutation } from "redux/api/employeeApi";
import { useEffect } from "react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App: React.FC = () => {
  const accessToken = getCookie("accessToken");

  const [get, {}] = useGetEmployeeMutation();

  useEffect(() => {
    if (accessToken) {
      const data = jwtDecode(accessToken);

      if (data) get({});
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
