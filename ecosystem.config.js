module.exports = {
  apps: [{
    name: 'popp-landing-page',
    script: 'server.js',
    cwd: '/var/www/agrifi-rust-api/landing-page',
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '512M',
    env: {
      NODE_ENV: 'production',
      PORT: 3021
    },
    error_file: '/root/.pm2/logs/popp-landing-page-error.log',
    out_file: '/root/.pm2/logs/popp-landing-page-out.log',
    merge_logs: true,
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
  }]
};
