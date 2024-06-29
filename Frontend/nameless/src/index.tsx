import React from 'react';
import { createRoot } from 'react-dom/client'

import { Pages } from './app/index.tsx';

const root = document.getElementById('root') as HTMLElement
createRoot(root).render(
  <React.StrictMode>
      <Pages />
  </React.StrictMode>
)