# 🖥️ SPY-SM23 Frontend

Esta es una aplicación desarrollada usando **NextJS 14** y el manejador de paquetes **pnpm**.

## Desarrollo
### Requisitos

* **NodeJS 18+**
* **pnpm**

### Definir variables de entorno

Es necesario definir las variables para el entorno de desarrollo. Para eso, haga una copia del fichero **./env.template** y renómbrelo a **./env.local**, luego cambie los valores predeterminados por los que vaya a utlizar en el entorno de desarrollo.

### Clone el repositorio
```
git clone https://github.com/alesarmiento/spySM23.git
```

### Instalar los paquetes

Dentro de la carpeta **./frontend** ejecute:

```
pnpm install
```

### Iniciar aplicación

```
pnpm dev
```

## Producción
### Antes de empezar

Recuerde seguir primero las instrucciones en el Readme principal.
### Docker

1. Vaya a la carpeta ./frontend desde la carpeta principal
```
cd ./frontend
```

2. Cree la imagen de docker
```
sudo docker build -t frontend .
```

3. Inicie la imagen
```
sudo docker-compose up -d
```

4. Para ver las imágenes de Docker que están activas

```
sudo docker ps -a
```

### Reiniciar aplicación

Si necesitas hacer cambios en cada aplicación y reconstruir la imagen, puedes usar los siguientes comandos

```
# Detén los contenedores en ejecución
sudo docker-compose down

# Reconstruye la imagen y vuelve a desplegar la aplicación
sudo docker-compose up -d --build
```