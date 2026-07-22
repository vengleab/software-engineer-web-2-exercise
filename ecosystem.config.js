module.exports = {
  apps: [
    {
      name: 'backend-service-3001',
      script: './backend/src/web-server.js',
      cwd: '/var/www/html/web-se',
      env: {
        PORT: 3001,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'backend-service-3002',
      script: './backend/src/web-server.js',
      cwd: '/var/www/html/web-se',
      env: {
        PORT: 3002,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'backend-service-3003',
      script: './backend/src/web-server.js',
      cwd: '/var/www/html/web-se',
      env: {
        PORT: 3003,
        NODE_ENV: 'production'
      }
    }
  ]
};
