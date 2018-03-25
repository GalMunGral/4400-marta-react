root=localhost:3000
get() {
  curl -sS $1 | python -m json.tool
}
post() {
  curl -sS -H 'Content-Type:application/json' -d $2 $1 | python -m json.tool
}
delete() {
  if [ -z '$2' ]; then
  curl -gsSX DELETE $1 | python -m json.tool; else
  curl -sS -X DELETE -H 'Content-Type:application/json'\
    -d $2 $1 | python -m json.tool
  fi
}
 

# post $root/login '{"username":"admin","password":"admin123"}'
# post $root/register '{"username":"wenqi","password":"pass","email":"wenqi@gmail.cm"}'
# post $root/login '{"username":"wenqi","password":"pass"}'
# get $root/cards
# get $root/cards/conflicts
# post $root/cards/0475861680208144 '{"value":"-10"}'
# delete $root/cards/9248324548250130 '{"username":"sandrapatel"}'
# get $root/stations
