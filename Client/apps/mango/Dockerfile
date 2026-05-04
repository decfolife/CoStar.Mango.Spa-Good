# Used for DEV/TEST/OPS

# Stage 1: Compile and Build angular codebase
FROM public.ecr.aws/docker/library/node:16-alpine as build
ARG COSTAR_ENVIRONMENT=dev
ARG DEVEXTREME_KEY
WORKDIR /app
COPY package*.json ./
COPY decorate-angular-cli.js ./
COPY libs/forms-shared/src/lib/ai/document-viewer-sdk-1.2.9.tgz libs/forms-shared/src/lib/ai/
RUN npm set strict-ssl false
RUN npm ci --force --legacy-peer-deps
COPY ./ /app/

RUN echo "building environment=$COSTAR_ENVIRONMENT" && \
        mkdir -p ./apps/mango/src/license && \
        echo "export const licenseKey = '$DEVEXTREME_KEY'" > ./apps/mango/src/license/devextreme-license.js
RUN NODE_OPTIONS="--max-old-space-size=8192" npx nx run mango:build --configuration=$COSTAR_ENVIRONMENT

# Stage 2: Serve app with nginx server
FROM public.ecr.aws/nginx/nginx:alpine as final
COPY ./config/nginx-spa.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist/apps/mango/ /usr/share/nginx/html
EXPOSE 8000
ENTRYPOINT ["nginx", "-g", "daemon off;"]

RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid && \
        chown -R nginx:nginx /var/cache/nginx

USER nginx