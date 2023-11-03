import React from "react";
import router from "./routers/routers";
import { RouterProvider } from "react-router-dom";
import "./App.css";

const App: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
