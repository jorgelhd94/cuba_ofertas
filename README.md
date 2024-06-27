# 🕵️‍♂️ SPY-SM23
Repositorio para obtener información de Supermarket23. El frontend de la aplicación está desarrollado usando NextJS 14 y el backend con Django y Django Rest Framework. Este proyecto está desplegado temporalmente en http://35.198.54.12/.

# Producción

## Antes de empezar

Las siguiente instrucciones fueron probadas en la VM de Google Cloud con sistema operativo Debian 12.5.

## GIT

### Instalar git

1. Actualiza los paquetes.
```
sudo apt update
sudo apt install apt-transport-https lsb-release ca-certificates curl dirmngr gnupg
```

2. Instala git
```
sudo apt install git
```

3. Verifica la instalación
```
git --version
```


## Docker
### Instalar Docker

1. **Actualiza los paquetes del sistema**: Antes de instalar cualquier nuevo software, es una buena práctica actualizar los paquetes del sistema a sus últimas versiones. Abre una terminal y ejecuta el siguiente comando:

```
sudo apt update
```

2. **Instala las dependencias necesarias**: Docker requiere algunas dependencias para ser instalado. Instálalas ejecutando:

```
sudo apt-get install ca-certificates curl gnupg
```

3. **Agrega el repositorio oficial de Docker**: Docker proporciona un repositorio oficial para Debian. Agrega este repositorio a las fuentes de paquetes de tu sistema:

```
sudo install -m 0755 -d /etc/apt/keyrings 

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \   "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \   "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
```

4. **Instala Docker**: Ahora, instala Docker ejecutando el siguiente comando:

```
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```


5. **Inicia y habilita el servicio Docker**: Después de instalar Docker, inicia el servicio y asegúrate de que se inicie automáticamente al arrancar el sistema:

```
sudo systemctl start docker
sudo systemctl enable docker
```

6. **Verifica la instalación**: Para verificar que Docker se instaló correctamente y está funcionando, puedes ejecutar:

```
sudo docker version
sudo systemctl status docker
```

### Instalar Docker Compose

1. **Descarga Docker Compose**: Primero, descarga la última versión de Docker Compose desde el repositorio oficial de GitHub. Puedes hacerlo ejecutando el siguiente comando en la terminal:

```
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Este comando descarga la versión 1.29.2 de Docker Compose, pero asegúrate de verificar la última versión disponible en el [repositorio de GitHub de Docker Compose](https://github.com/docker/compose/releases).

2. **Habilita la ejecución del binario**: A continuación, establece los permisos adecuados para hacer que el binario sea ejecutable:

```
sudo chmod +x /usr/local/bin/docker-compose
```

3. **Verifica la instalación**: Para asegurarte de que Docker Compose se instaló correctamente, puedes verificar su versión ejecutando:

```
docker-compose --version
```

## Clonar el repositorio

1. Dentro de la carpeta que desee, preferiblemente la carpeta del usuario. En este ejemplo **./alesarmiento**. Ejecute el siguiente comando:

```
git clone https://github.com/alesarmiento/spySM23.git
```

**Importante:** Al clonar un repositorio privado git le pedirá sus credenciales. La contraseña no es la contraseña que usamos comúnmente, es un token que generamos en nuestro perfil de github. Para más información https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens


## Iniciar aplicaciones

**Antes de empezar:** En caso de vaya a actualizar las aplicaciones y no haya espacio suficiente, utilice el siguiente comando que borra todo el contenido sin usar por Docker.
```
sudo docker system prune
```

Para iniciar ambas aplicaciones diríjase al archivo **./Readme** de cada una, carpeta **./frontend** y **./backend** respectivamente.
