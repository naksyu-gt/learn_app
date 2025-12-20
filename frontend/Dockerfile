FROM node:20-alpine

WORKDIR /app

# 依存関係だけ先に入れてキャッシュを効かせる
COPY package.json package-lock.json ./
RUN npm ci

# ソース
COPY . .

EXPOSE 3000

# 開発サーバ（App Router）
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]
