FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --include=optional

COPY . .

CMD ["npm", "run", "dev"]
