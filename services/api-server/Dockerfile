# Base image
FROM node:20 as base

FROM base AS builder
# Set working directory
WORKDIR /app
RUN yarn global add turbo
COPY . .

# See https://turbo.build/repo/docs/handbook/deploying-with-docker on what this
# does.
RUN turbo prune @bookwave/api-server --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/yarn.lock ./yarn.lock
RUN yarn install

# Build the project
COPY --from=builder /app/out/full/ .
RUN yarn turbo run build --filter=@bookwave/api-server

CMD cd services/api-server && yarn start