  import { createBrowserRouter } from 'react-router-dom';
  import { lazy, Suspense } from 'react';
  import AppLayout from '@/layouts/AppLayout';
  import AuthLayout from '@/layouts/AuthLayout';
  import LoadingScreen from '@/components/ui/LoadingScreen';

  const Home = lazy(() => import('@/pages/Home'));
  const Search = lazy(() => import('@/pages/Search'));
  const Profile = lazy(() => import('@/pages/Profile'));
  const Login = lazy(() => import('@/pages/Login'));
  const Welcome = lazy(() => import('@/pages/Welcome'));
  const TVShows = lazy(() => import('@/pages/TVShows'));
  const Movies = lazy(() => import('@/pages/Movies'));
  const NewPopular = lazy(() => import('@/pages/NewPopular'));

  const withSuspense = (Component) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component />
    </Suspense>
  );

  const router = createBrowserRouter([
    {
      path: '/',
      element: <AppLayout />,
      children: [
        { index: true, element: withSuspense(Home) },
        { path: 'search', element: withSuspense(Search) },
        { path: 'profile', element: withSuspense(Profile) },
        { path: 'tv', element: withSuspense(TVShows) },
    { path: 'movies', element: withSuspense(Movies) },
    { path: 'new-popular', element: withSuspense(NewPopular) },
      ],
    },
    {
      path: '/auth',
      element: <AuthLayout />,
      children: [
        { index: true, element: withSuspense(Welcome) },
        { path: 'login', element: withSuspense(Login) },
      ],
    },
  ]);

  export default router;
