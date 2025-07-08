import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";
// import LightSidebarWithHeader from "./layout/LightSidebarWithHeader.jsx";


//const MainLayout = lazy(() => import('./layout/MainLayout'));
const Main = lazy(() => import('./layout/main.tsx'));
const Admin = lazy(() => import('./layout/admin'));



const Home = lazy(() => import('./pages/main/home'));
const About = lazy(() => import('./pages/main/about'));

const Dashboard = lazy(() => import('./pages/admin/dashboard.tsx'));
const Panel = lazy(() => import('./pages/admin/panel.tsx'));

// const TaskPage = lazy(() => import('./pages/admin/tasks/page.tsx'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
        <Suspense fallback={<>...</>}>
          <Main />
        </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
            <Suspense fallback={<>...</>}>
              <Home />
            </Suspense>
        ),
      },
      {
        path: 'about',
        element: (
            <Suspense fallback={<>...</>}>
              <About />
            </Suspense>
        ),
      },
    ],
  },
  {
    path: 'admin',
    element: (
        <Suspense fallback={<>...</>}>
          <Admin />
        </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
            <Suspense fallback={<>...</>}>
              <Dashboard />
            </Suspense>
        ),
      },
      {
        path: 'panel',
        element: (
            <Suspense fallback={<>...</>}>
              <Panel />
            </Suspense>
        ),
      },
    ],
  },
]);

