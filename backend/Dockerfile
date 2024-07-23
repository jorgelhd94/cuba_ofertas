FROM python:3.10.11

WORKDIR /ofertas-backend

# Copia el archivo de requerimientos y luego instala las dependencias
COPY ./requirements.txt /ofertas-backend/requirements.txt
RUN pip install --no-cache-dir --upgrade -r /ofertas-backend/requirements.txt

# Copia el código de la aplicación Django
COPY . /ofertas-backend

# Actualizar la lista de paquetes e instalar dependencias necesarias
RUN apt-get update -y && apt-get install -y wget xvfb unzip cron postgresql-client \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

ENV CHROME_VERSION 125.0.6422.76

RUN wget --no-verbose -O /tmp/chrome.deb https://mirror.cs.uchicago.edu/google-chrome/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}-1_amd64.deb \
 && apt install -y /tmp/chrome.deb \
 && rm /tmp/chrome.deb

# Configurar las variables de entorno para ChromeDriver
ENV CHROMEDRIVER_DIR /chromedriver

# Crear el directorio para ChromeDriver
RUN mkdir $CHROMEDRIVER_DIR

# Descargar e instalar ChromeDriver
RUN wget -q --continue -P $CHROMEDRIVER_DIR "https://storage.googleapis.com/chrome-for-testing-public/$CHROME_VERSION/linux64/chromedriver-linux64.zip" \
 && unzip $CHROMEDRIVER_DIR/chromedriver* -d $CHROMEDRIVER_DIR \
 && rm $CHROMEDRIVER_DIR/chromedriver-linux64.zip

# Añadir ChromeDriver al PATH
ENV PATH $CHROMEDRIVER_DIR:$PATH
