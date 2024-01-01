FROM node:18

WORKDIR /app

EXPOSE 8081

COPY package*.json package-lock.json ./
RUN npm ci

COPY . ./


CMD ["npm", "run","start"]
