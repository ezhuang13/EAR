#we will initialize the db here

from flask_sqlalchemy import SQLAlchemy

#initialize db
db = SQLAlchemy()

from .User import UserModel