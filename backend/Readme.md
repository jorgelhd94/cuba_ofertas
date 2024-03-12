# 🖥️ SPY-SM23 Backend

Esta es una aplicación desarrollada usando **FastAPI** versión 0.110.0 con **Python 3.10.11**.

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
uvicorn app.main:app --reload
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
