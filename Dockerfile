FROM gcr.io/distroless/static

COPY --from=caddy /usr/bin/caddy /

WORKDIR /app

COPY index.html favicon.ico /app/static/
COPY css/ /app/static/css
COPY fonts/ /app/static/fonts
COPY img/ /app/static/img
COPY js/ /app/static/js
COPY sounds/ /app/static/sounds

COPY Caddyfile /app/

EXPOSE 8080
ENTRYPOINT ["/caddy", "run"]
