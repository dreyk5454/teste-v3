FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Create default .env for build-time
RUN echo "DATABASE_URL=postgresql://user:password@localhost:5432/multi_lives" > .env && \
    echo "REDIS_HOST=localhost" >> .env && \
    echo "REDIS_PORT=6379" >> .env && \
    echo "JWT_SECRET=dev-secret-key" >> .env && \
    echo "PORT=3000" >> .env

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
