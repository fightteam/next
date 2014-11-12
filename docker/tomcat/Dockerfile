# Pull base image.
FROM tomcat:latest

MAINTAINER zhenyuan.liu@duobei.com

ADD tomcat-users.xml /usr/local/tomcat/conf/

CMD [ "redis-server", "/data/redis.conf" ]