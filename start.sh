#!/bin/bash
#
# author: excalibur
# emial:lzy7750015@gmail.com
# 


# Start mysql
# if [ -f /etc/nginx/nginx ]; then
#     mysqld_safe
# fi

# Start redis
if [ -f /etc/redis/redis.conf ]; then
    redis-server /etc/redis/redis.conf &
fi

# Start tomcat 

# Start nginx
if [ -f /etc/nginx/nginx ]; then
    nginx
fi

# start all the services
/usr/local/bin/supervisord -n