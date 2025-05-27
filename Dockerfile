FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Etapa de producción
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY .env .env
COPY package*.json ./
RUN npm install --only=production
EXPOSE 4000
CMD ["node", "dist/main"]