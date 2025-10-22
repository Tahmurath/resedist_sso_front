import { createBrowserRouter } from "react-router";
import { Suspense, lazy } from "react";


const LayoutWithThemeLang = lazy(() => import('./layout/LayoutWithThemeLang.tsx'));
const LayoutnobarWithBottomNavigation = lazy(() => import('./layout/LayoutnobarWithBottomNavigation.tsx'));



const Home = lazy(() => import('./pages/main/home'));
const Login = lazy(() => import('./pages/main/login.tsx'));

const TmaIndex = lazy(() => import('./pages/miniapp/index.tsx'));
const TmaSettings = lazy(() => import('./pages/miniapp/settings.tsx'));
const TmaProfile = lazy(() => import('./pages/miniapp/profile.tsx'));



export const router = createBrowserRouter([
    {
    path: '/',
    element: (
        <Suspense fallback={<>...</>}>
          <LayoutWithThemeLang />
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
            path: 'sso/login',
            element: (
                <Suspense fallback={<>...</>}>
                    <Login />
                </Suspense>
            ),
        },
    ],
    },
    {
        path: '/tg/miniapp',
        element: (
            <Suspense fallback={<>...</>}>
                <LayoutnobarWithBottomNavigation />
            </Suspense>
        ),
        children: [
            {
                index: true,
                element: (
                    <Suspense fallback={<>...</>}>
                        <TmaIndex />
                    </Suspense>
                ),
            },
            {
                path: 'profile',
                element: (
                    <Suspense fallback={<>...</>}>
                        <TmaProfile />
                    </Suspense>
                ),
            },
            {
                path: 'settings',
                element: (
                    <Suspense fallback={<>...</>}>
                        <TmaSettings />
                    </Suspense>
                ),
            },
        ],
    },
]);

