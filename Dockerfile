# Etape de build
FROM node:20.12-alpine3.19 AS build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

# Etape de production
FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]