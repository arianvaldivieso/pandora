FROM ubuntu:16.04

MAINTAINER Arian Valdivieso (arianvaldivieso@gmail.com)

ENV OS_LOCALE="en_US.UTF-8"
RUN apt-get update && apt-get install -y locales && locale-gen ${OS_LOCALE}
ENV LANG=${OS_LOCALE} \
    LANGUAGE=${OS_LOCALE} \
    LC_ALL=${OS_LOCALE} \
    DEBIAN_FRONTEND=noninteractive

ENV APACHE_CONF_DIR=/etc/apache2 \
    PHP_CONF_DIR=/etc/php/7.3 \
    PHP_DATA_DIR=/var/lib/php

COPY ./ /var/www/www/
COPY ./docker-images/entrypoint.sh /sbin/entrypoint.sh

RUN	\
	BUILD_DEPS='software-properties-common' \
    && dpkg-reconfigure locales \
	&& apt-get install --no-install-recommends -y $BUILD_DEPS \
	&& add-apt-repository -y ppa:ondrej/php \
	&& add-apt-repository -y ppa:ondrej/apache2 \
	&& apt-get update \
    && apt-get install -y curl apache2 libapache2-mod-php7.3 php7.3-cli php7.3-readline php7.3-mbstring php7.3-zip php7.3-intl php7.3-xml php7.3-json php7.3-curl php7.3-gd php7.3-pgsql php7.3-mysql php-pear \
    # Apache settings
    && cp /dev/null ${APACHE_CONF_DIR}/conf-available/other-vhosts-access-log.conf \
    && rm ${APACHE_CONF_DIR}/sites-enabled/000-default.conf ${APACHE_CONF_DIR}/sites-available/000-default.conf \
    && a2enmod rewrite php7.3 \
	# Install composer
	&& curl -sS https://getcomposer.org/installer | php -- --version=1.8.4 --install-dir=/usr/local/bin --filename=composer \
	# Cleaning
	&& apt-get purge -y --auto-remove $BUILD_DEPS \
	&& apt-get autoremove -y \
	&& rm -rf /var/lib/apt/lists/* \
	# Forward request and error logs to docker log collector
	&& ln -sf /dev/stdout /var/log/apache2/access.log \
	&& ln -sf /dev/stderr /var/log/apache2/error.log \
	&& chmod 755 /sbin/entrypoint.sh \
	&& chown www-data:www-data ${PHP_DATA_DIR} -Rf

COPY ./docker-images/configs/apache2.conf ${APACHE_CONF_DIR}/apache2.conf
COPY ./docker-images/configs/app.conf ${APACHE_CONF_DIR}/sites-enabled/app.conf
COPY ./docker-images/configs/php.ini  ${PHP_CONF_DIR}/apache2/conf.d/custom.ini


# update package list
RUN apt-get update

# install curl and git
RUN apt-get install -y curl git

# install apache
RUN apt-get install -y apache2

RUN apt-get -y install \
  apt-transport-https \
  ca-certificates \
  curl

RUN apt-get install -y software-properties-common
RUN add-apt-repository -y ppa:ondrej/php
RUN apt-get update

# install php
RUN apt-get -y install php7.3 php7.3-cli php7.3-common mcrypt php7.3-mcrypt php-mbstring php-pear php7.3-dev php7.3-xml
RUN apt-get install -y libapache2-mod-php7.3

# install pre requisites
RUN apt-get update
RUN apt-get install -y apt-transport-https
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -
RUN curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list
RUN apt-get update
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql mssql-tools
RUN apt-get install -y unixodbc-utf16
RUN apt-get install -y unixodbc-dev-utf16

# install driver sqlsrv
RUN pecl install sqlsrv
RUN echo "extension=sqlsrv.so" >> /etc/php/7.3/apache2/php.ini
RUN pecl install pdo_sqlsrv
RUN echo "extension=pdo_sqlsrv.so" >> /etc/php/7.3/apache2/php.ini

# load driver sqlsrv
RUN echo "extension=/usr/lib/php/20151012/sqlsrv.so" >> /etc/php/7.3/apache2/php.ini
RUN echo "extension=/usr/lib/php/20151012/pdo_sqlsrv.so" >> /etc/php/7.3/apache2/php.ini
RUN echo "extension=/usr/lib/php/20151012/sqlsrv.so" >> /etc/php/7.3/cli/php.ini
RUN echo "extension=/usr/lib/php/20151012/pdo_sqlsrv.so" >> /etc/php/7.3/cli/php.ini

# install composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
RUN php composer-setup.php
RUN php -r "unlink('composer-setup.php');"
RUN mv composer.phar /usr/local/bin/composer

# install ODBC Driver
RUN ACCEPT_EULA=Y apt-get install -y msodbcsql
RUN apt-get install -y mssql-tools
RUN apt-get install -y unixodbc-dev
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bash_profile
RUN echo 'export PATH="$PATH:/opt/mssql-tools/bin"' >> ~/.bashrc
RUN exec bash

# install locales
RUN apt-get install -y locales && echo "en_US.UTF-8 UTF-8" > /etc/locale.gen && locale-gen

EXPOSE 80 443

WORKDIR /var/www/html/


CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
