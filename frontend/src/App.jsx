import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";

import "./App.css";

import RootLayout from "./pages/Root";
import Error from "./pages/Error/Error";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import WorkRoot from "./pages/Work/Root";
import All from "./pages/Work/All";
import Industry, {
  loader as industriesLoader,
} from "./pages/Work/Industry/Industry";
import Service, {
  loader as servicesLoader,
} from "./pages/Work/Service/Service";
import Search, { loader as searchLoader } from "./pages/Search/Search";
import Privacy from "./pages/Privacy/Privacy";
import WorkItem, { loader as workitemLoader } from "./pages/WorkItem/WorkItem";
import ServiceSub, {
  loader as serviceLoader,
} from "./pages/Work/Service/ServiceSub";
import IndustrySub, {
  loader as industryLoader,
} from "./pages/Work/Industry/IndustrySub";

// Admin
import AdminHome from "./pages/Admin/Home/Home";
import Auth from "./pages/Admin/Auth/Auth";
import Add from "./pages/Admin/Add/Add";
import Edit from "./pages/Admin/Edit/Edit";

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "/",
          element: <RootLayout />,
          errorElement: <Error />,
          children: [
            { index: true, element: <Home /> },
            { path: "about", element: <About /> },
            { path: "contact", element: <Contact /> },
            {
              path: "search",
              element: <Search />,
              loader: searchLoader,
            },
            { path: "privacy-policy", element: <Privacy /> },
            {
              path: "work-item/:item",
              element: <WorkItem />,
              loader: workitemLoader,
            },
            {
              path: "work",
              element: <WorkRoot />,
              children: [
                {
                  index: true,
                  element: <Navigate to="/work/all" replace="true" />,
                },
                {
                  path: "industry",
                  element: <Industry />,
                  loader: industriesLoader,
                },
                {
                  path: "service",
                  element: <Service />,
                  loader: servicesLoader,
                },
                {
                  path: "all",
                  element: <All />,
                },
              ],
            },
            {
              path: "work/industry/:item",
              element: <IndustrySub />,
              loader: industryLoader,
            },
            {
              path: "work/service/:item",
              element: <ServiceSub />,
              loader: serviceLoader,
            },
          ],
        },
        {
          path: "/admin",
          children: [
            {
              index: true,
              element: <AdminHome />,
            },
            {
              path: "auth",
              element: <Auth />,
            },
            {
              path: "add-workitem",
              element: <Add />,
            },
            {
              path: "edit-workitem",
              element: <Edit />,
            },
          ],
        },
      ])}
    />
  );
};

export default App;
