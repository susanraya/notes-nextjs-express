FROM node:22-slim AS build

WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi
COPY tsconfig.json tsconfig.build.json ./
COPY src ./src
# The in-memory PostgreSQL is for runs with no DATABASE_URL (the e2e suite); npm keeps it
# as an optional peer of drizzle-orm, but a deployment always has a database.
RUN npm run build && npm prune --omit=dev && rm -rf node_modules/@electric-sql/pglite

FROM node:22-slim

WORKDIR /app
ENV NODE_ENV=production
COPY package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

# Run as the image's unprivileged `node` user. The service never needs root, and a
# container that drops it limits what a compromise of the app can do to the host.
USER node

EXPOSE 8000

# Reports the container unhealthy when the app stops answering. Uses Node's own fetch
# rather than curl, which the slim base image does not ship.
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:8000/health').then(r=>process.exit(r.ok?0:1),()=>process.exit(1))"

CMD ["node", "dist/main.js"]
