This is the README file for our web application.

# How to Use Our Application

1. You need to have docker and docker-compose, so go install those. They can be found at the following links:
` https://docs.docker.com/install/ `  
`https://docs.docker.com/compose/install/`  

2. Now, you need to open two separate terminal windows, as we need to run docker for both the client (React and Nginx) and the server (Flask, Postgres, Minio / S3).

3. For the client, run the following commands (from /source/client):  
`docker build . -t "tag_name"`  
`docker run -p 3000:80 tag_name:latest`

4. For the server, run the following commands (from /source/server):  
`docker-compose build`  
`docker-compose up`

5. If you're running the docker-compose commands for the first time, you need to set up migrations for the Flask API and the Postgres Database. Perform the following commands:  
`docker exec -it <container_name> bash`  
`python manage.py db init`  
`python manage.py db migrate`  
`python manage.py db upgrade`

6. Now, migrations are in place and everything should work!

7. Important Note: Docker for the front-end is only for deployment. To develop with React, use docker-compose for the back-end (API, Database, Storage, etc.) and the development server / webpack for the front-end (lightweight Express-based server). 