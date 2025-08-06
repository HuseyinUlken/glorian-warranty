import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { Toaster } from './components/ui/sonner';
import { initializeTheme } from './hooks/use-appearance';
const appName = import.meta.env.VITE_APP_NAME || 'Glorian';

createInertiaApp({
    title: (title) => `${title} • ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <Toaster />

                <App {...props} />

            </>,
        );
    },
    progress: {
        color: 'var(--primary)',
        showSpinner: true,
    },
});

// This will set light / dark mode on load...
initializeTheme();
