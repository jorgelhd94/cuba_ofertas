# 🖥️ SPY-SM23 Frontend

Esta es una aplicación desarrollada usando **NextJS 14** y el manejador de paquetes **pnpm**.

## Desarrollo
### Requisitos

* **NodeJS 18+**
* **pnpm**

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
