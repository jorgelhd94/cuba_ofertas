# 🖥️ Cuba Ofertas Frontend

La aplicación **Cuba Ofertas Frontend** es una aplicación desarrollada con **NextJS 14** y usa **pnpm** como manejador de paquetes. Aquí tienes una guía para configurar, desarrollar y desplegar la aplicación, así como para gestionar las variables de entorno.

## Definir variables de entorno

Es necesario definir las variables para el entorno de desarrollo. Para eso, haga una copia del fichero **./env.template** y renómbrelo a **.env.local**, luego cambie los valores predeterminados por los que vaya a utilizar en el entorno de desarrollo. El contenido del archivo es:

```
NEXT_PUBLIC_API_URL=<SUBSTITUTE_API_URL>
AUTH_SECRET=<SUBSTITUTE_SECRET>
```

### Gestión de archivos .env

En este proyecto hay tres archivos de configuración `.env`:

1. **.env.local**: Usado para desarrollo local.
2. **.env.production**: Usado para el entorno de producción.
3. **.env.template**: Plantilla para crear otros archivos `.env`.

#### Configurar el archivo .env.local

Para el desarrollo, crea el archivo **.env.local** a partir de **.env.template** y configura las variables según tus necesidades:

```
cp .env.template .env.local
```

Luego, edita **.env.local** con los valores apropiados:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
AUTH_SECRET=your-secret-key
```

#### Configurar el archivo .env.production

Para producción, puedes usar **.env.template** de manera similar para crear y configurar **.env.production**:

```
cp .env.template .env.production
```

Edítalo con los valores necesarios para tu entorno de producción:

```
NEXT_PUBLIC_API_URL=https://api.yoursite.com
AUTH_SECRET=your-production-secret-key
```

## Desarrollo

### Requisitos

- **NodeJS 18+**
- **pnpm**

### Clonar el repositorio

```
git clone https://github.com/jorgelhd94/cuba_ofertas.git
```

### Instalar los paquetes

Dentro de la carpeta **./frontend**, ejecuta:

```
pnpm install
```

### Iniciar la aplicación

```
pnpm dev
```

## Producción

### Docker

1. Desde la carpeta principal, navega a la carpeta **./frontend**:

```
cd ./frontend
```

2. Crear e iniciar la imagen Docker:

```
sudo docker-compose -p frontend_ofertas up --build -d
```

3. Para ver las imágenes de Docker que están activas:

```
sudo docker ps -a
```

### Reiniciar la aplicación

Si necesitas hacer cambios y reconstruir la imagen, usa los siguientes comandos:

```
# Detén los contenedores en ejecución
sudo docker-compose -p frontend_ofertas down

# Reconstruye la imagen y vuelve a desplegar la aplicación
sudo docker-compose -p frontend_ofertas up --build -d
```
