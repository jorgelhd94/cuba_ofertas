FROM python:3.10.11

WORKDIR /spysm23-backend

# Copia el archivo de requerimientos y luego instala las dependencias
COPY ./requirements.txt /spysm23-backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /spysm23-backend/requirements.txt

# Copia el código de la aplicación Django
COPY ./app /spysm23-backend/app

# Actualizar la lista de paquetes e instalar dependencias necesarias
RUN apt-get update -y && apt-get install -y wget xvfb unzip

ENV CHROME_VERSION 114.0.5735.90

RUN wget --no-verbose -O /tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}-1_amd64.deb \
 && apt install -y /tmp/chrome.deb \
 && rm /tmp/chrome.deb

# Configurar las variables de entorno para ChromeDriver
ENV CHROMEDRIVER_DIR /chromedriver

# Crear el directorio para ChromeDriver
RUN mkdir $CHROMEDRIVER_DIR

# Descargar e instalar ChromeDriver 114.0.5735.90
RUN wget -q --continue -P $CHROMEDRIVER_DIR "http://chromedriver.storage.googleapis.com/$CHROME_VERSION/chromedriver_linux64.zip" && \
    unzip $CHROMEDRIVER_DIR/chromedriver* -d $CHROMEDRIVER_DIR

# Añadir ChromeDriver al PATH
ENV PATH $CHROMEDRIVER_DIR:$PATH

# Asegúrate de que el comando CMD esté configurado para iniciar tu aplicación Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]