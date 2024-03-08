FROM python:3.10.11

WORKDIR /marketscraping-api

COPY ./requirements.txt /marketscraping-api/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /marketscraping-api/requirements.txt

COPY ./app /marketscraping-api/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]
