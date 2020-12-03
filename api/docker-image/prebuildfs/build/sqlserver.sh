curl -s https://packages.microsoft.com/keys/microsoft.asc | sudo apt-key add -
sudo bash -c "curl -s https://packages.microsoft.com/config/ubuntu/18.04/prod.list > /etc/apt/sources.list.d/mssql-release.list"
sudo apt-get update
sudo ACCEPT_EULA=Y apt-get -y install msodbcsql17 mssql-tools
sudo apt-get -y install unixodbc-dev

sudo apt-get -y install gcc g++ make autoconf libc-dev pkg-config
sudo pecl7.X-sp install sqlsrv
sudo pecl7.X-sp install pdo_sqlsrv

sudo bash -c "echo extension=sqlsrv.so > /etc/php7.X-sp/conf.d/sqlsrv.ini"
sudo bash -c "echo extension=pdo_sqlsrv.so > /etc/php7.X-sp/conf.d/pdo_sqlsrv.ini"