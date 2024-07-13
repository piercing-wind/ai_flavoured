module.exports = {
   apps: [
     {
       name: "ai_flavoured",
       script: "npm",
       args: "start",
       log_date_format: "YYYY-MM-DD HH:mm:ss",
       error_file: "logs/err.log",
       out_file: "logs/out.log",
       log_file: "logs/combined.log",
       instances: 1,
       autorestart: true,
       watch: false,
       max_memory_restart: "1G",
       max_restarts: 3,
       min_uptime: "1m",
       env: {
         NODE_ENV: "production",
       },
       env_production: {
         NODE_ENV: "production",
       },
       // Log rotation options
       log_date_format: "YYYY-MM-DD HH:mm:ss",
       max_size: "100M",
       retain: 10,
     },
   ],
 };
 