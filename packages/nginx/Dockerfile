# Pull in the from the official nginx image.
FROM nginx

EXPOSE 80

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*

# Copy over the custom default configs.
COPY configs/default.conf /etc/nginx/conf.d/default.conf
COPY configs/options-ssl-nginx.conf /etc/letsencrypt/options-ssl-nginx.conf
COPY data/certs/thepixelportraits.crt /etc/letsencrypt/thepixelportraits.crt
COPY data/certs/thepixelportraits.key /etc/letsencrypt/thepixelportraits.key

# Start nginx in the foreground to play nicely with Docker.
CMD ["nginx", "-g", "daemon off;"]