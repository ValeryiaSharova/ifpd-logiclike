import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// eslint-disable-next-line nka/no-index-imports
import { App } from 'src/components/App';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
