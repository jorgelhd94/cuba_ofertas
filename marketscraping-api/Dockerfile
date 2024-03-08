FROM python:3.10.11

WORKDIR /marketscraping-api

COPY ./requirements.txt /marketscraping-api/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /marketscraping-api/requirements.txt

COPY ./app /marketscraping-api/app

# Descargar el driver de Chrome
RUN wget https://chromedriver.storage.googleapis.com/114.0.5735.90/chromedriver_linux64.zip -O /tmp/chromedriver_linux64.zip

# Descomprimir el driver y moverlo a /usr/bin
RUN unzip /tmp/chromedriver_linux64.zip -d /tmp && \
    mv /tmp/chromedriver /usr/bin/chromedriver && \
    chown root:root /usr/bin/chromedriver && \
    chmod +x /usr/bin/chromedriver

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80", "--log-level", "debug"]

