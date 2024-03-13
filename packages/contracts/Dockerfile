FROM node:18.15.0 as base

# Label the image
LABEL org.label-schema.build-date=$BUILD_DATE \
    org.label-schema.name="UniFi-Contracts" \
    org.label-schema.description="UniFi Abstract Account Contracts" \
    org.label-schema.url="https://unifi.eggtech.io" \
    org.label-schema.vcs-ref=$VCS_REF \
    org.label-schema.vcs-url="https://github.com/KaiCode2/UniFi.git" \
    org.label-schema.vendor="UniFi" \
    org.label-schema.version=$VERSION \
    org.label-schema.schema-version="1.0"

WORKDIR /srv

COPY src ./src
COPY hardhat ./hardhat
COPY tasks ./tasks
COPY deploy ./deploy
COPY utils ./utils
COPY types ./types
COPY scripts ./scripts
COPY contracts ./contracts
COPY tsconfig.build.json ./tsconfig.build.json
COPY tsconfig.json ./tsconfig.json
COPY hardhat.config.ts ./hardhat.config.ts
COPY package.json ./package.json

# Install deps
RUN yarn

RUN ["yarn", "build"]

CMD ["yarn", "start"]
