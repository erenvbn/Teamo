## Use the official Node.js image
#FROM node:19-bullseye AS build
#WORKDIR /app
#
## Copy package.json and package-lock.json to install dependencies
#COPY teamo_webreactapp/package*.json ./
#RUN npm install
#
## Copy the rest of the application
#COPY teamo_webreactapp/ .
#
## Build the React app
#RUN npm run build
#
## Use Nginx to serve the static files
#FROM nginx:alpine AS final
#WORKDIR /usr/share/nginx/html
#
## Copy the built React app from the build stage
#COPY --from=build /app/build/ .
#
## Expose port 80
#EXPOSE 80
#
## Default command to run Nginx
#CMD ["nginx", "-g", "daemon off;"]
#