FROM ghcr.io/puppeteer/puppeteer:20.9.0
USER root
# RUN wget -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_112.0.5615.165-1_amd64.deb && \
#     apt -y --allow-downgrades install /tmp/chrome.deb && \
#     rm -rf /tmp/* /var/cache/apk/*

EXPOSE 9222

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /app
COPY package.json .
RUN npm install

COPY ./ ./


RUN npm run build:prod

USER node

CMD [ "node", "dist/server.js" ]