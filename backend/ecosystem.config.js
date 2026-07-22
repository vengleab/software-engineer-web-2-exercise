module.exports = {
  apps: [
    {
      name: 'backend-service-3000',
      script: './src/web-server.js',
      cwd: '/var/www/html/web-se/backend',
      env: {
        PORT: 3000,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'backend-service-3001',
      script: './src/web-server.js',
      cwd: '/var/www/html/web-se/backend',
      env: {
        PORT: 3001,
        NODE_ENV: 'production'
      }
    },
    {
      name: 'backend-service-3002',
      script: './src/web-server.js',
      cwd: '/var/www/html/web-se/backend',
      env: {
        PORT: 3002,
        NODE_ENV: 'production'
      }
    }
  ]
};
