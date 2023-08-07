# Stage 1: Compile and Build angular codebase

FROM public.ecr.aws/docker/library/node:16-alpine as build
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm set strict-ssl false
RUN CYPRESS_INSTALL_BINARY=0 npm install --force
RUN npm run build:mango


# Stage 2: Serve app with nginx server
FROM public.ecr.aws/nginx/nginx:alpine as final
COPY ./config/nginx-spa.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/local/app/dist/apps/mango/ /usr/share/nginx/html
EXPOSE 8000
ENTRYPOINT ["nginx", "-g", "daemon off;"]

RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid && \
        chown -R nginx:nginx /var/cache/nginx

USER nginx