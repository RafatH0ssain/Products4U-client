import * as React from "react";
import { StrictMode } from 'react'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./error-page";
import AllQueries from "./pages/AllQueries";
import PrivateRoute from "./routes/PrivateRoute";
import QueryDetails from "./pages/QueryDetails";
import AuthLayout from "./pages/AuthLayout";
import Login from "./components/Login";
import Register from "./components/Register";
import AddQuery from "./pages/AddQuery";
import MyQueryList from "./pages/MyQueryList";
import MyRecommendations from "./pages/MyRecommendations";
import MyQueryRecommendations from "./pages/MyQueryRecommendations";
import AuthProvider from "./provider/AuthProvider";

const router = createBrowserRouter([
  { //  Home Page
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  { // Queries Page
    path: "/queries",
    element: <AllQueries />,
    loader: async () => {
      try {
        const response = await fetch('https://products4-u-server-rafat-hossains-projects.vercel.app/queries');

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const queries = await response.json();
        console.log("Fetched queries:", queries);  // To debug
        return { queries };
      } catch (error) {
        console.error("Error fetching loader data:", error);
        return { queries: [] };
      }
    }
  },
  { //  Query Details Page
    path: "/query/:id",
    element:
      <PrivateRoute>
        <QueryDetails />
      </PrivateRoute>,
    loader: ({ params }) => fetch(`https://products4-u-server-rafat-hossains-projects.vercel.app/query/${params._id}`),
  },
  { // Login & Registration systems
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: '/auth/login',
        element: <Login />
      },
      {
        path: '/auth/register',
        element: <Register />
      },
    ],
  },
  { //  Add Queries
    path: "/addQuery",
    element:
      <PrivateRoute>
        <AddQuery />
      </PrivateRoute>,
  },
  { //  My Queries Page
    path: "/myQueries",
    element:
      <PrivateRoute>
        <MyQueryList />
      </PrivateRoute>,
    loader: async () => {
      try {
        const response = await Promise.all([
          fetch('https://sport-kek-server.vercel.app/equipment'),
        ]);

        if (!response[0].ok) {
          throw new Error("Failed to fetch data");
        }

        return {
          products: await response[0].json(),
        };
      } catch (error) {
        console.error("Error fetching loader data:", error);
        return { products: [] };
      }
    }
  },
  { // My Recommendations
    path: "/myRecommendations",
    element: <MyRecommendations />,
    errorElement: <ErrorPage />,
  },
  { // Reccomendations for me
    path: "/myQueriesRecommendations",
    element: <MyQueryRecommendations />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>,
);