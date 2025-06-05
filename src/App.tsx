import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATH, routes } from './routes';

// components
import BasicLayout from '@/layout/BasicLayout';

// styles
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const router = createBrowserRouter([
  { path: '/', element: <BasicLayout />, children: [...routes] }, // both login or no login user can access
  { path: '*', element: <Navigate replace to={ROUTE_PATH.HOME} /> },
]);

function App() {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}

export default App;
