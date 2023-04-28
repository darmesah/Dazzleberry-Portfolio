import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

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
import Edit, { loader as editLoader } from "./pages/Admin/Edit/Edit";
import AdminRoot from "./pages/Admin/Root/AdminRoot";
import CategoryRoot from "./pages/Admin/Categories/Root/Root";
import CategoryIndustry, {
  loader as categoryIndustryLoader,
} from "./pages/Admin/Categories/Industry";
import CategoryService, {
  loader as categoryServiceLoader,
} from "./pages/Admin/Categories/Service";
import CategorySubIndustry from "./pages/Admin/Categories/SubIndustry/SubIndustry";
import CategorySubService from "./pages/Admin/Categories/SubService/SubService";
import Settings, {
  loader as adminInfoLoader,
} from "./pages/Admin/Settings/Settings";

const App = () => {
  const isAuth = useSelector((state) => state.auth.isAuth);

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
          path: "/admin/login",
          element: !isAuth ? <Auth /> : <Navigate to="/admin" replace="true" />,
        },
        {
          path: "/admin",
          element: <AdminRoot />,
          children: [
            {
              index: true,
              element: isAuth ? (
                <AdminHome />
              ) : (
                <Navigate to="/admin/login" replace="true" />
              ),
            },

            {
              path: "add-workitem",
              element: isAuth ? (
                <Add />
              ) : (
                <Navigate to="/admin/login" replace="true" />
              ),
            },
            {
              path: "edit-workitem/:id",
              element: isAuth ? (
                <Edit />
              ) : (
                <Navigate to="/admin/login" replace="true" />
              ),
              loader: editLoader,
            },
            {
              path: "settings/:userId",
              element: isAuth ? (
                <Settings />
              ) : (
                <Navigate to="/admin/login" replace="true" />
              ),
              loader: adminInfoLoader,
            },
            {
              path: "categories",
              element: isAuth ? (
                <CategoryRoot />
              ) : (
                <Navigate to="/admin/login" replace="true" />
              ),
              children: [
                {
                  index: true,
                  element: <Navigate to="industry" replace="true" />,
                },
                {
                  path: "industry",
                  element: <CategoryIndustry />,
                  loader: categoryIndustryLoader,
                },
                {
                  path: "service",
                  element: <CategoryService />,
                  loader: categoryServiceLoader,
                },
              ],
            },
            {
              path: "categories/industry/:item",
              element: <CategorySubIndustry />,
            },
            {
              path: "categories/service/:item",
              element: <CategorySubService />,
            },
          ],
        },
      ])}
    />
  );
};

export default App;
