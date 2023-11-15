# Stage 1: Compile and Build angular codebase

FROM public.ecr.aws/docker/library/node:16.19-alpine as build
# Default arguments value
ARG COSTAR_ENVIRONMENT=dev 
WORKDIR /usr/local/app
COPY ./ /usr/local/app/
RUN npm set strict-ssl false
RUN npm install --force
RUN echo "building environment COSTAR_ENVIRONMENT=$COSTAR_ENVIRONMENT"
RUN npm run build:$COSTAR_ENVIRONMENT:microcomponent-central-auth


# Stage 2: Serve app with nginx server
FROM public.ecr.aws/nginx/nginx:alpine-slim as final
COPY ./config/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
RUN apk update && apk add --upgrade openssl
# RUN apk update
# RUN apk del curl
# RUN apk add 'curl>7.88.1'
# RUN apk del ncurses ncurses-libs nginx-module-njs
# RUN apk add ncurses ncurses-libs --repository=http://dl-cdn.alpinelinux.org/alpine/edge/main
COPY --from=build /usr/local/app/dist/apps/mango-crem-features/central-auth/ /usr/share/nginx/html
EXPOSE 8000
ENTRYPOINT ["nginx", "-g", "daemon off;"]

RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid && \
        chown -R nginx:nginx /var/cache/nginx

USER nginx
