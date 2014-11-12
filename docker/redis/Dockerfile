# Pull base image.
FROM redis:latest

MAINTAINER zhenyuan.liu@duobei.com

ADD redis.conf /data/

CMD [ "redis-server", "/data/redis.conf" ]