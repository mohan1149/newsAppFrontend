# Stage 1: Build the React app
FROM node:14.17.0-alpine as build
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci --silent

COPY . .
RUN npm run build

# Stage 2: Serve the app with a lightweight web server
FROM nginx:1.21.0-alpine
COPY --from=build /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
