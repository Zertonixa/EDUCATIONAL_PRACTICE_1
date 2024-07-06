import React from 'react';
import { createRoot } from 'react-dom/client'

import ErrorBoundary from './components/ui/ErrorBoundary.tsx';

import { Pages } from './app/index.tsx';

const root = document.getElementById('root') as HTMLElement
createRoot(root).render(
  <React.StrictMode>
      <ErrorBoundary>
        <Pages />
      </ErrorBoundary>
  </React.StrictMode>
)