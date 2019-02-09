This is the README file for our web application.

# Installing the Server
1. Create a virtual environment.  
`python3 -m venv venv`
2. Activate the virtual environment.  
`. venv/bin/activate`
3. Install the necessary dependencies.  
`pip install -r requirements.txt`
4. Run the front end.
`npm run build`
5. Start up your SQL database (we use PostgreSQL, but you can also use MySQL)
6. Set the appropriate configuration variables.
```bash
$ export FLASK_ENV=development
$ export DATABASE_URL=databaseurl # (usually something like "postgresql://username@localhost:port/<database_name>", where database_name will be the name of the database you create in step below, and everything else depends on your choice of Docker or Postgres App)
```
7. Initialize migrations if you have not already (this initializes the name of your db when you create your app). You should only have to do this once.
```bash
$ python source/server/manage.py db init # this initalizes the database
```

8. Now, we need to log into the server and create a database (since the migrations needs something to actually connect to on the Postgres server). So, we log into the PostgreSQL instance using the "postgres" username and create the test database (and optionally create users for said database). NOTE: You may need to install psql or a similar SSH client to access the PostgreSQL instance.
```bash
$ psql -h localhost -d postgres -U postgres -p 5432 # logs into postgres at port 5432, host localhost, user postgres (superuser), (5432 if Postgres App, 327** if Docker)
\# CREATE DATABASE users; # need to create database for each schema (as of now, users)
\# CREATE USER username;
```
9. Then, after creating the database, you need to create the first migration (temporarily connects to the server to format the database you created based on the schemas provided in models) and then upgrade the database too!
```bash
$ python source/server/manage.py db migrate # creates the first migration
$ python source/server/manage.py db upgrade # apply upgrades to the database
```
10. After that, it should work!! Can be applied to Postgres application or Docker.