(serve -s frontend/public/ -l 3005 &)
until node backend/server.js; do :; done
