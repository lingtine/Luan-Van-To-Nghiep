import React from "react";
import { Routes, Route } from "react-router-dom";
import { publicRouters } from "./routers/routers";
import "./App.css";

const App: React.FC = () => {
  const route = publicRouters.map((route, index) => {
    const Page = route.element;
    const Layout = route.layout;

    return (
      <Route
        path={route.path}
        element={
          <Layout key={index}>
            <Page />
          </Layout>
        }
      />
    );
  });

  return (
    <div>
      <Routes>{route}</Routes>
    </div>
  );
};

export default App;
