import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';
import App from './App';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import BlogPost from './pages/BlogPost';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';
import reportWebVitals from './reportWebVitals';
import LoadingAnimation from './components/LoadingAnimation';

// Apply compatibility fixes before any component renders
import { applyMeshBVHFix } from './utils/FixMeshBVH';
try {
  applyMeshBVHFix();
} catch (e) {
  console.warn('Error applying compatibility fixes:', e);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ErrorBoundary><App /></ErrorBoundary>,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/services",
        element: <Services />,
      },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/blog/:id",
        element: <BlogPost />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/privacy",
        element: <Privacy />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
], {
  basename: process.env.PUBLIC_URL,
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider 
      router={router} 
      fallbackElement={<LoadingAnimation size="lg" color="gold" />} 
    />
  </React.StrictMode>
);

// Report web vitals
reportWebVitals(console.log);
