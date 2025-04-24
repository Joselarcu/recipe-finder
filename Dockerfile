
FROM node:20.15.0

#Copiamos los archivos de configuración de Node en nuestro directorio de trabajo
COPY ["package.json", "package-lock.json", "/usr/src/"]

#Seleccionamos el directorio de trabajo
WORKDIR /usr/src

#Instalamos las dependencias y Angular CLI
RUN npm i && \
  npm install -g @angular/cli 

#Posterior a la instalacion copiamos el resto de los archivos en nuestro WORKDIR
COPY [".", "/usr/src"]

#Exponemos el puerto que Angular utiliza por defecto
EXPOSE 4200

# Arrancamos el proyecto
CMD npm run start