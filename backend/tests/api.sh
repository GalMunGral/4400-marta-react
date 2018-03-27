root=localhost:3000

get() {
  curl -sS $1 | python -m json.tool
}

post() {
  if [ -z "$2" ]
  then curl -sSX POST $1 | python -m json.tool
  else curl -sS -H 'Content-Type:application/json' -d "$2" $1\
    | python -m json.tool
  fi
}

delete() {
  if [ -z "$2" ]
  then curl -gsSX DELETE $1 | python -m json.tool
  else curl -sS -X DELETE -H 'Content-Type:application/json' -d "$2" $1 \
    | python -m json.tool
  fi
}

# post $root/login '{
#   "username":"admin",
#   "password":"admin123"
# }'
# post $root/register '{
#   "username":"wenqi2",
#   "password":"pass2",
#   "email":"wenqi@gmail.cm2"
# }'
# post $root/login '{"username":"wenqi","password":"pass"}'
# get $root/cards
# post $root/cards/0475861680208144 '{"value":"-10"}'
# delete $root/cards/9248324548250130
# delete $root/cards/9248324548250130 '{"username":"sandrapatel"}'
# get $root/stations
# get "$root/conflicts?attr=username&dir=desc"
# post $root/conflicts '{
#   "username":"commuter14",
#   "breezecardNum":"0475861680208144"
# }'
# get $root/trips
## TIME IS A LITTLE BIT OFF
# get $root/trips?startTime=2017-11-02%2013:11:11
# get $root/trips?endTime=2017-10-31%2021:30:01
# get $root/trips?endTime=2017-10-27%2009:40:11&startTime=2017-10-27%2009:40:11 
# get $root/trips?username=sandrapatel
post $root/trips '{
    "breezecardNum":"7534785562588930",
    "tripFare":"10"}'
# post $root/trips '{
#     "breezecardNum":"7534785562588930",
#     "tripFare":"10",
#     "startTime":"2018-12-01 00:00:00",
#     "startsAt":"FP",
#     "endsAt":"BUSDOME"}'

# get $root/report