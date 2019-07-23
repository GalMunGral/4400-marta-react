(cd frontend && npm install && npm run build)
(cd backend && npm install &&)
# Initialize Database
chown -R mysql:mysql /var/lib/mysql /var/run/mysqld && service mysql start
mysql -u root < mysql/init.sql)
