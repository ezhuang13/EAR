FROM ubuntu:latest

# Run updates to the Ubuntu machine (cached).
RUN apt-get update -y
RUN apt-get install -y python-pip python-dev build-essential

# Add requirements.txt before application (cached).
ADD requirements.txt /app/
WORKDIR /app
RUN pip install -r requirements.txt

# Add the application (not cached)!
ADD . /app
EXPOSE 5000
CMD ["python", "app.py"]