FROM nginx:1.19.2-alpine
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
