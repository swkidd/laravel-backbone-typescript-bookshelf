ARG LARAVEL_PATH=/var/www/html

FROM composer:1.9.3 AS composer
ARG LARAVEL_PATH

COPY src/composer.json $LARAVEL_PATH
COPY src/composer.lock $LARAVEL_PATH
RUN composer install --working-dir $LARAVEL_PATH --ignore-platform-reqs --no-progress --no-autoloader --no-scripts

COPY src $LARAVEL_PATH
RUN composer install --working-dir $LARAVEL_PATH --ignore-platform-reqs --no-progress --optimize-autoloader

FROM php:7.4-apache
ARG LARAVEL_PATH

RUN apt-get update && apt-get install -y \
    libzip-dev \
    && docker-php-ext-install \
        pdo_mysql \
        zip

ENV APACHE_DOCUMENT_ROOT $LARAVEL_PATH/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN a2enmod rewrite

COPY --from=composer /usr/bin/composer /usr/bin/composer
RUN mkdir -p /root/.composer
COPY --from=composer /tmp/cache /root/.composer/cache

RUN pecl install xdebug-2.9.2 \
	&& docker-php-ext-enable xdebug \
    && echo "xdebug.remote_enable=1" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

COPY --from=composer $LARAVEL_PATH $LARAVEL_PATH

RUN chown -R www-data $LARAVEL_PATH/storage

WORKDIR $LARAVEL_PATH
