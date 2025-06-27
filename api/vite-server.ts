import type { ViteDevServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';

export const apiServerPlugin = () => ({
  name: 'api-server-plugin',
  configureServer(server: ViteDevServer) {
    // Import the API module using dynamic import for TypeScript compatibility
    import('./index.js').then(({ default: api }) => {
      server.middlewares.use(api);
      console.log('🚀 API server middleware configured and running.');
    }).catch(error => {
      console.warn('API server middleware not available:', (error as Error).message);
      console.log('Adding fallback API endpoints...');
      
      // Fallback: add mock API endpoints
      server.middlewares.use('/api', (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
        
        if (req.method === 'OPTIONS') {
          res.end();
          return;
        }
        
        if (req.url === '/api' && req.method === 'GET') {
          res.end(JSON.stringify({ message: 'API Server is up and running!' }));
          return;
        }
        
        if (req.url === '/api/newsletter/subscribe' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { email } = JSON.parse(body);
              console.log('Mock newsletter subscription for:', email);
              res.end(JSON.stringify({ message: 'Successfully subscribed to the newsletter! (Mock mode)' }));
            } catch (error) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Invalid request' }));
            }
          });
          return;
        }
        
        next();
      });
    });
  },
});