import React, { useEffect, Suspense, lazy } from 'react';
// Remove AOS imports since they're not being used
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgressBar from './components/ScrollProgressBar';
import ChatWidget from './components/ChatWidget';
import LoadingAnimation from './components/LoadingAnimation';
import AnalyticsWrapper from './components/AnalyticsWrapper';
import { ToastProvider } from './contexts/ToastContext';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorPage from './pages/ErrorPage';
import { registerServiceWorker } from './serviceWorkerRegistration';

// Lazy load pages for better performance
const HomePage = lazy(() => import('./pages/HomePage'));
const Services = lazy(() => import('./pages/Services'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const BlogPage = lazy(() => import('./pages/Blog'));
const BlogPostPage = lazy(() => import('./pages/BlogPost'));
const ContactPage = lazy(() => import('./pages/Contact'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));

function Layout() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <Navbar />
      <main className="relative overflow-hidden">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
      <AnalyticsWrapper />
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <ToastProvider>
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <LoadingAnimation size="large" text="Loading Prince AI Automation..." />
            </div>
          }>
            <ScrollToTop />
            <ScrollProgressBar />
            <Layout />
          </Suspense>
        </ToastProvider>
      </ErrorBoundary>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/portfolio",
        element: <PortfolioPage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogPostPage />,
      },
      {
        path: "/contact",
        element: <ContactPage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      }
    ]
  }
], {
  basename: "/Prince-Ai-Automation",
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

function App() {
  // Register service worker only in production
  useEffect(() => {
    // Only register service worker in production
    registerServiceWorker();
  }, []);
  
  return <RouterProvider router={router} />;
}

export default App;