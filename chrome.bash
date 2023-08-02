wget -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_112.0.5615.165-1_amd64.deb && \
    apt -y install /tmp/chrome.deb && \
    rm -rf /tmp/* /var/cache/apk/*