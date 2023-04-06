import {
  RouterProvider,
  createBrowserRouter,
  Navigate,
} from 'react-router-dom';

import './App.css';


import RootLayout from './pages/Root';
import Error from './pages/Error/Error';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import WorkRoot from './pages/Work/Root';
import All from './pages/Work/All';
import Industry from './pages/Work/Industry';
import Service from './pages/Work/Service';
import Search from './pages/Search/Search';
import Privacy from './pages/Privacy/Privacy';
import WorkItem from './pages/WorkItem/WorkItem';

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <RootLayout />,
          errorElement: <Error />,
          children: [
            { index: true, element: <Home /> },
            { path: 'about', element: <About /> },
            { path: 'contact', element: <Contact /> },
            { path: 'search', element: <Search /> },
            { path: 'privacy-policy', element: <Privacy /> },
            { path: 'work-item/:item', element: <WorkItem /> },
            {
              path: 'work',
              element: <WorkRoot />,
              children: [
                {
                  index: true,
                  element: <Navigate to="/work/all" replace="true" />,
                },
                { path: 'industry', element: <Industry /> },
                { path: 'service', element: <Service /> },
                { path: 'all', element: <All /> },
              ],
            },
          ],
        },
      ])}
    />
  );
};

export default App;
