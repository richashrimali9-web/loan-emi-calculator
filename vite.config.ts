import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  // Serve from root for custom domain
  base: '/',
  plugins: [
    {
      name: 'serve-static-pages',
      apply: 'serve',
      enforce: 'pre',
      configureServer(server: any) {
        return () => {
          // Add middleware to handle static routes BEFORE other middleware
          server.middlewares.stack.unshift({
            route: '',
            handle: (req: any, res: any, next: any) => {
              const rawUrl = req.url || '/';
              const url = rawUrl.split('?')[0];
              if (!url) return next();

              const publicDir = path.join(process.cwd()); // Serve from repo root, not public/

              // Section roots that should serve their own index.html
              const SECTION_PREFIXES = [
                '/privacy-policy',
                '/terms-of-service',
                '/about',
                '/contact',
                '/blog',
                '/guides',
              ];

              // Normalize a section root to always have a trailing slash
              const matchSectionRoot = SECTION_PREFIXES.find((prefix) => url === prefix || url === `${prefix}/`);

              // Explicit static file patterns
              const isBlogPost = /^\/blog\/post-\d+\.html$/.test(url);
              const isGuidePage = /^\/guides\/[A-Za-z0-9_-]+\.html$/.test(url);

              try {
                if (matchSectionRoot) {
                  const sectionPath = matchSectionRoot.endsWith('/') ? matchSectionRoot : `${matchSectionRoot}/`;
                  const filePath = path.join(publicDir, sectionPath, 'index.html');
                  if (fs.existsSync(filePath)) {
                    const html = fs.readFileSync(filePath, 'utf-8');
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.end(html);
                    return;
                  }
                }

                if (isBlogPost || isGuidePage) {
                  const filePath = path.join(publicDir, url);
                  if (fs.existsSync(filePath)) {
                    const html = fs.readFileSync(filePath, 'utf-8');
                    res.setHeader('Content-Type', 'text/html; charset=utf-8');
                    res.end(html);
                    return;
                  }
                }
              } catch (_) {
                // On any error, fall through to next middleware
              }

              next();
            },
          });
        };
      },
    },
    react(),
  ],
  server: {
    port: 3000,
    open: true,
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'vaul@1.1.2': 'vaul',
      'sonner@2.0.3': 'sonner',
      'recharts@2.15.2': 'recharts',
      'react-resizable-panels@2.1.7': 'react-resizable-panels',
      'react-hook-form@7.55.0': 'react-hook-form',
      'react-day-picker@8.10.1': 'react-day-picker',
      'next-themes@0.4.6': 'next-themes',
      'lucide-react@0.487.0': 'lucide-react',
      'input-otp@1.4.2': 'input-otp',
      'embla-carousel-react@8.6.0': 'embla-carousel-react',
      'cmdk@1.1.1': 'cmdk',
      'class-variance-authority@0.7.1': 'class-variance-authority',
      '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
      '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
      '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
      '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
      '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
      '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
      '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
      '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
      '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
      '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
      '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
      '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
      '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
      '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
      '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
      '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
      '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
      '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
      '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
      '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
      '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
      '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
      '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
      '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
      '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
      '@': path.resolve(__dirname, './src'),
    },
  },
  // Serve static assets (css, html pages) from repo root, not /public
  publicDir: false,
  build: {
    target: 'esnext',
    outDir: 'build',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            const pkg = id.toString().split('node_modules/')[1].split('/')[0];
            return pkg;
          }
        },
      },
    },
  },
});