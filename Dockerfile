#
# nebula Dockerfile
#

FROM dockerfile/java:oracle-java8

MAINTAINER lzy7750015@gmail.com

EXPOSE 80

ENV TOMCAT_MAJOR_VERSION 8
ENV TOMCAT_MINOR_VERSION 8.0.12
ENV JDK_VERSION 1.8
ENV DEPLOY_DIR /ROOT

# install tomcat
RUN \
  	cd /tmp && \
	wget http://mirrors.hust.edu.cn/apache/tomcat/tomcat-${TOMCAT_MAJOR_VERSION}/v${TOMCAT_MINOR_VERSION}/bin/apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz && \
	tar xvzf apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz && \
	rm apache-tomcat-${TOMCAT_MINOR_VERSION}.tar.gz && \
	mv apache-tomcat-${TOMCAT_MINOR_VERSION} /usr/local/tomcat

# Set environment variables.
ENV HOME /root

# Define working directory.
WORKDIR /root

# Define default command.
CMD ["bash"]