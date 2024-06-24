# 🖥️ SPY-SM23 Backend

Esta es una aplicación desarrollada usando **Django** versión 5.0.3 y **Django Rest Framework** versión 3.15.1 con **Python 3.10.11**.

## Desarrollo
### Requisitos

* **Python - 3.10.11**
### Clone el repositorio
```
git clone https://github.com/alesarmiento/spySM23.git
```
### Crear y activar environment

```
python -m venv backend-env
```

```
backend-env\Scripts\activate
```

### Instalar los paquetes

Dentro de la carpeta **./backend** ejecute:

```
pip install -r requirements.txt
```

### Iniciar aplicación

```
python manage.py migrate
python manage.py runserver 0.0.0.0:8080
```

## Producción
### Antes de empezar

Recuerde seguir primero las instrucciones en el Readme principal.
### Docker

1. Vaya a la carpeta ./backend desde la carpeta principal
```
cd ./backend
```

2. Cree la imagen de docker
```
sudo docker build -t backend .
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

## Crear backup de la base de datos PostgreSQL

### 1. Identificar el contenedor de PostgreSQL

Primero, asegúrate de conocer el nombre o el ID del contenedor donde se está ejecutando PostgreSQL. Puedes listar todos los contenedores en ejecución con:

```
docker ps
```

### 2. Crear un backup de la base de datos

Usa el comando **docker exec** para ejecutar **pg_dump** dentro del contenedor y redirigir la salida a un archivo en el sistema de archivos del contenedor. Supongamos que el nombre del contenedor es **backend_db_1** y queremos hacer un backup de una base de datos llamada **postgres**.

```
sudo docker exec -t backend_db_1 pg_dump -U postgres postgres -F c -b -v -f /var/lib/postgresql/data/backup.dump
```

* -U postgres especifica el usuario de PostgreSQL. Ajusta este comando si tu usuario de PostgreSQL es diferente.
* /var/lib/postgresql/data/backup.dump es la ruta dentro del contenedor donde se guardará el backup temporalmente.

### 3. Copiar el backup a tu máquina host

Usa el comando **docker cp** para copiar el archivo de backup desde el contenedor a una carpeta en tu máquina host. Supongamos que queremos copiarlo a la carpeta **spySM23**.

```
 sudo docker cp backend_db_1:/var/lib/postgresql/data/backup.dump ~/spySM23/backup.dump
```

### 4. Eliminar el archivo de backup temporal del contenedor

 Es una buena práctica limpiar el archivo de backup temporal del contenedor una vez que lo hayas copiado.

 ```
 sudo docker exec backend_db_1 rm /var/lib/postgresql/data/backup.dump
 ```