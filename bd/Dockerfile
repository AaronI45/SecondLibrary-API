FROM mysql:8.0

# Copy the database initialization script into the image.

COPY ./bd.sql /docker-entrypoint-initdb.d/
ENV MYSQL_ROOT_PASSWORD=root

EXPOSE 3306

VOLUME /var/lib/mysql