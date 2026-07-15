FROM python:3.13

WORKDIR /app
RUN pip install wheel
ADD ./requirements.txt /app/requirements.txt
RUN pip install -r requirements.txt
ADD ./src /app

CMD ["gunicorn", "-c", "gunicorn.conf.py", "wsgi:app"]
