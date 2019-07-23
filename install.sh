(cd frontend && npm install && npm run build)
(cd backend && npm install)
# Initialize Database
if [ -d /var/lib/mysql ]; then
  chown -R mysql:mysql /var/lib/mysql
fi
if [ -d /var/run/mysqld ]; then
  chown -R mysql:mysql /var/run/mysqld
fi
service mysql start
mysql -u root < mysql/init.sql
