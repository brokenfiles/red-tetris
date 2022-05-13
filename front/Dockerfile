FROM node:18

MAINTAINER Laurent Louis <llaurent@student.42.fr>

ENV APP_ROOT /app

ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

WORKDIR ${APP_ROOT}

COPY entrypoint.sh /usr/local/bin
RUN chmod 750 /usr/local/bin/entrypoint.sh

ENTRYPOINT ["sh", "/usr/local/bin/entrypoint.sh"]

