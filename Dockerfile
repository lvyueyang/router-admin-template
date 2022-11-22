#
# NOTE: THIS DOCKERFILE IS Created by zihao.wei for minio-console 
# && mkdir -p /usr/share/nginx/html/saturn/

FROM nginx:1.22.0-alpine

LABEL maintainer="Saturn Cloud Group <zihao.wei@ucas.com.cn>"  version="v1.1"

ENV TZ="Asia/Shanghai"
RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2  && rm -f /etc/nginx/conf.d/default.conf  


# 存放静态文件目标路径，需要和default.conf中配置的路径一致
ADD dist/  /usr/share/nginx/html/saturn

ADD ./default.conf  /etc/nginx/conf.d/default.conf


ENTRYPOINT ["/docker-entrypoint.sh"]

EXPOSE 80

STOPSIGNAL SIGQUIT

CMD ["nginx", "-g", "daemon off;"]
