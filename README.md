---
path: /github/cs4400-marta-traffic
---
### 1. Prepare the database
Make sure MySQL server is running, then start MySQL client from command line:
```bash
mysql -u root -p [password]
```
Run the following statements:
```mysql
create database marta_v0;
use marta_v0;
source [project directory]/backend/v0/mysql/init.sql;
```
### 2. Start the API server
```bash
cd [project directory]/backend/v0
npm install # Install dependencies first
npm start
```
### 3. Start the application server
```bash
cd [project directory]/frontend
npm install # Install dependencies first
npm start
```
*To log in as administrator, use username `admin` and password `admin123`.*

*To log in as passenger use username `commuter14` and password `choochoo`.*
