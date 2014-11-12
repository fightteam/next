# Pull base image.
FROM nginx:latest

MAINTAINER zhenyuan.liu@duobei.com

ADD nginx.conf /usr/local/tomcat/conf/

CMD [ "redis-server", "/data/redis.conf" ]