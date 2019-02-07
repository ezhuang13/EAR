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
$ export DATABASE_URL=mydatabaseurl (usually postgresql:5432//name_of_db)
```
7. Set up migrations if you have not already (this initializes the name of your db when you create your app). You should only have to do this once.
```bash
$ python source/server/manage.py db init # this initalizes the database
$ python source/server/manage.py db migrate # creates the first migration
$ python source/server/manage.py db upgrade # apply upgrades to the database
```

8. Start up the server and run the app.
```bash
$ python source/server/app.py
```
