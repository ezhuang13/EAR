# Specifies parent image
FROM node:9.11.1 as build

# Set the environment stuffs for node_modules.
ENV PATH /app/node_modules/.bin:$PATH

# Add package.json and node_modules (cached).
ADD package.json /app/
WORKDIR /app
RUN npm install --silent

# Add the application (not cached)!
ADD . /app

# Compile the application
RUN npm run build

# Do the production environment.
# Proxy server for serving up html on HTTP server
# Handles load balancing, memory, and performance optimization
FROM nginx:1.13.3-alpine
COPY --from=build /static /usr/share/nginx/html
COPY --from=build /app/index.html /usr/share/nginx/html/index.html
COPY --from=build /app/nginx.conf /etc/nginx/conf.default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]