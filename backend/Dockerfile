FROM python:3.10.11

WORKDIR /marketscraping-api

COPY ./requirements.txt /marketscraping-api/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /marketscraping-api/requirements.txt

COPY ./app /marketscraping-api/app

# Actualizar la lista de paquetes e instalar dependencias necesarias
RUN apt-get update -y && \
    apt-get install -y wget xvfb unzip

# Descargar e instalar Google Chrome 114.0.5735.90
# Nota: Esta URL puede no ser válida o el paquete puede no estar disponible directamente.
# Deberías verificar si Google proporciona una URL directa para descargar versiones específicas de Chrome.
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list && \
    apt-get update -y && \
    apt-get install -y google-chrome-stable

# Configurar las variables de entorno para ChromeDriver
ENV CHROMEDRIVER_VERSION 114.0.5735.90
ENV CHROMEDRIVER_DIR /chromedriver

# Crear el directorio para ChromeDriver
RUN mkdir $CHROMEDRIVER_DIR

# Descargar e instalar ChromeDriver 114.0.5735.90
# Nota: Asegúrate de que esta URL sea correcta y accesible.
RUN wget -q --continue -P $CHROMEDRIVER_DIR "http://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip" && \
    unzip $CHROMEDRIVER_DIR/chromedriver* -d $CHROMEDRIVER_DIR

# Añadir ChromeDriver al PATH
ENV PATH $CHROMEDRIVER_DIR:$PATH

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--log-level", "debug"]

