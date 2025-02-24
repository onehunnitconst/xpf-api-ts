module.exports = {
  apps: [
    {
      name: 'xpf-api',
      script: './dist/main.js',
      env: {
        NODE_ENV: 'development',
      },
      env_development: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
