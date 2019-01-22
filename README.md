This is the README file for our web application.

# Installing the Server
1. Create a virtual environment.  
`python3 -m venv venv`
2. Activate the virtual environment.  
`. venv/bin/activate`
3. Install the necessary dependencies.  
`pip install -r requirements.txt`
4. Set the appropriate configuration variables (FLASK_APP, FLASK_ENV).
```bash
$ export FLASK_APP=app_name.py

$ export FLASK_ENV=development
```