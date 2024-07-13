APP_DIR="ai_flavoured"
REMOTE_REPO="https://github.com/piercing-wind/ai_flavoured.git"

cd $APP_DIR

git pull orign azureProd
mkdir -p logs/
chmod 777 logs/
pnpm install --frozen-lockfile
pnpm run build

pm2 start pnpm --name "ai_flavoured" -- start
