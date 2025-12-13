# Utilise l'image officielle de Bun
FROM oven/bun:1 AS base
WORKDIR /app

# Étape de dépendances
FROM base AS install
RUN mkdir -p /temp/prod
COPY package.json bun.lockb* /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Étape de build (si nécessaire)
FROM base AS prerelease
COPY --from=install /temp/prod/node_modules node_modules
COPY . .

# Étape finale
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/src ./src
COPY --from=prerelease /app/package.json .

# Expose le port de l'API
EXPOSE 3001

# Utilisateur non-root pour la sécurité
USER bun

# Lance l'application
ENTRYPOINT ["bun", "run", "src/index.ts"]

