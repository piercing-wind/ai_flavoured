module.exports = {
  apps: [
    {
      name: "aiflavoured",
      script: "pnpm start",
      watch: true,
      env: {
        NODE_ENV: "production",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
