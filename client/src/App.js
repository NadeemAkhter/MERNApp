import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserName from "./components/UserName";
import Register from "./components/Register";
import Password from "./components/Password";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import PageNotFound from "./components/PageNotFound";
import Recovery from "./components/Recovery";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserName />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/password",
    element: <Password />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/recovery",
    element: <Recovery />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
};

export default App;
