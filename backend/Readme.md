# 🖥️ Cuba Ofertas Backend

La aplicación **Cuba Ofertas Backend** es una aplicación desarrollada con **Django 5.0.3** y **Django Rest Framework 3.15.1**, utilizando **Python 3.10.11**. Aquí tienes una guía para configurar, desarrollar y desplegar la aplicación, así como para gestionar la base de datos PostgreSQL.

## Variables de entorno

Configura las variables de entorno editando el archivo **.env** en la raíz del directorio. Asegúrate de cambiar la variable `ENVIRONMENT` según el entorno:

```
# DEV | PROD
ENVIRONMENT=DEV
SECRET_KEY=django-insecure-m-r+&m%v(l17t7r$%!fhcmy#)eta--n!n&x&^8#j6e_x)!s(=s
DJANGO_ALLOWED_HOSTS=*

# Database Production
DB_NAME=ofertasdb
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=ofertas-db
PORT=5432

# Database Development
DEV_DB_NAME=ofertasdb
DEV_DB_USER=postgres
DEV_DB_PASSWORD=postgres
DEV_DB_HOST=localhost
DEV_PORT=5432

PROXY_URL=http://fpfiszuw-rotate:96zfo0p2yajy@p.webshare.io:80/
ORIGIN_KATAPULK=https://www.katapulk.com
ORIGIN_SM23=https://www.supermarket23.com
```

## Desarrollo

### Requisitos

- **Python 3.10.11**

### Clonar el repositorio

```
git clone https://github.com/jorgelhd94/cuba_ofertas.git
```

### Crear y activar el entorno virtual

```
python -m venv backend-env
```

```
backend-env\Scripts\activate
```

### Instalar los paquetes

Dentro de la carpeta **./backend**, ejecuta:

```
pip install -r requirements.txt
```

### Iniciar la aplicación

```
python manage.py migrate
python manage.py runserver 0.0.0.0:8080
```

## Producción

### Docker

1. Desde la carpeta principal, navega a la carpeta **./backend**:

```
cd ./backend
```

2. Crear e iniciar la imagen Docker:

```
sudo docker-compose -p backend_ofertas up --build -d
```

3. Para ver las imágenes de Docker que están activas:

```
sudo docker ps -a
```

### Reiniciar la aplicación

Si necesitas hacer cambios y reconstruir la imagen, usa los siguientes comandos:

```
# Detén los contenedores en ejecución
sudo docker-compose -p backend_ofertas down

# Reconstruye la imagen y vuelve a desplegar la aplicación
sudo docker-compose -p backend_ofertas up --build -d
```

## Crear backup de la base de datos PostgreSQL

### 1. Identificar el contenedor de PostgreSQL

Lista todos los contenedores en ejecución con:

```
docker ps
```

### 2. Crear un backup de la base de datos

Usa **docker exec** para ejecutar **pg_dump** dentro del contenedor y redirigir la salida a un archivo en el sistema de archivos del contenedor. Supongamos que el nombre del contenedor es **backend_db_1** y queremos hacer un backup de la base de datos **ofertasdb**.

```
sudo docker exec -t backend_ofertas_ofertas-db_1 pg_dump -U postgres ofertasdb -F c -b -v -f /var/lib/postgresql/data/backup.dump
```

* `-U postgres` especifica el usuario de PostgreSQL.
* `/var/lib/postgresql/data/backup.dump` es la ruta dentro del contenedor donde se guardará el backup temporalmente.

### 3. Copiar el backup a tu máquina host

Usa **docker cp** para copiar el archivo de backup desde el contenedor a una carpeta en tu máquina host:

```
sudo docker cp backend_ofertas_ofertas-db_1:/var/lib/postgresql/data/backup.dump ~/cuba_ofertas/backup.dump
```

### 4. Eliminar el archivo de backup temporal del contenedor

Limpia el archivo de backup temporal del contenedor una vez copiado:

```
sudo docker exec backend_db_1 rm /var/lib/postgresql/data/backup.dump
```

Esta guía cubre los aspectos esenciales para desarrollar, desplegar y mantener la aplicación **Cuba Ofertas Backend**.
