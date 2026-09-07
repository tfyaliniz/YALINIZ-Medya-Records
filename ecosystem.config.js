module.exports = {
  apps: [
    {
      name: 'yaliniz-records',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3015',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3015
      }
    }
  ]
};
