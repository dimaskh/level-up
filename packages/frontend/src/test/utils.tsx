import React, { StrictMode, Suspense } from 'react';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';

export const renderWithRouter = (component: React.ReactNode) => {
  const routes = createRoutesFromElements(
    <Route path="/" element={component} />
  );

  const router = createMemoryRouter(routes, {
    initialEntries: ['/'],
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  });

  return render(
    <StrictMode>
      <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </StrictMode>
  );
};
