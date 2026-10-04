import React, { useEffect, useState } from 'react';
import { GuidedCourse } from './components/GuidedCourse';

const StudioApp = React.lazy(() => import('./StudioApp').then((m) => ({ default: m.StudioApp })));
const AuthorPreviewPage = React.lazy(() =>
  import('./components/AuthorPreviewPage').then((m) => ({ default: m.AuthorPreviewPage }))
);
const CourseHealthDashboard = React.lazy(() =>
  import('./components/CourseHealthDashboard').then((m) => ({ default: m.CourseHealthDashboard }))
);

export type Route = { name: 'course' } | { name: 'studio' } | { name: 'author' } | { name: 'course-health' };

/**
 * Routes (hash based so the static Vercel deployment never needs server rewrites for deep links).
 * No accounts: anyone can learn, progress is stored in each visitor's own browser (localStorage).
 *   #/course, #/learn/...      guided course (default)
 *   #/studio[/:module/:lesson] free-form git sandbox
 *   /author, /dev/course-health  authoring tools
 */
export function parseRoute(pathname: string, hash: string): Route {
  if (pathname === '/author' || hash === '#/author' || hash === '#author') return { name: 'author' };
  if (
    pathname === '/dev/course-health' ||
    pathname === '/course-health' ||
    hash === '#/dev/course-health' ||
    hash === '#dev/course-health'
  )
    return { name: 'course-health' };
  if (hash.startsWith('#/studio')) return { name: 'studio' };
  return { name: 'course' };
}

const currentRoute = (): Route =>
  typeof window === 'undefined' ? { name: 'course' } : parseRoute(window.location.pathname, window.location.hash);

function useRoute(): Route {
  const [route, setRoute] = useState<Route>(currentRoute);
  useEffect(() => {
    const update = () => setRoute(currentRoute());
    update(); // pick up any change between first render and mount
    window.addEventListener('popstate', update);
    window.addEventListener('hashchange', update);
    return () => {
      window.removeEventListener('popstate', update);
      window.removeEventListener('hashchange', update);
    };
  }, []);
  return route;
}

const FullscreenLoader: React.FC<{ label: string; color?: string }> = ({ label, color = '#38bdf8' }) => (
  <div
    style={{
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0a0f1d',
      color,
      fontSize: '1.1rem',
      fontFamily: 'Inter, system-ui, sans-serif',
    }}
  >
    {label}
  </div>
);

export const App: React.FC = () => {
  const route = useRoute();

  switch (route.name) {
    case 'author':
      return (
        <React.Suspense fallback={<FullscreenLoader label="Đang tải Author Studio..." color="#60a5fa" />}>
          <AuthorPreviewPage />
        </React.Suspense>
      );
    case 'course-health':
      return (
        <React.Suspense fallback={<FullscreenLoader label="Đang tải Course Health Dashboard..." color="#34d399" />}>
          <CourseHealthDashboard />
        </React.Suspense>
      );
    case 'studio':
      return (
        <React.Suspense fallback={<FullscreenLoader label="Đang khởi tạo Git Studio..." />}>
          <StudioApp />
        </React.Suspense>
      );
    default:
      return <GuidedCourse />;
  }
};
