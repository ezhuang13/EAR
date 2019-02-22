# Imports for Flask SQL Migrations
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

# Create the Database from SQL Alchemy
db = SQLAlchemy()

# Create the password encryption, validation, etc.
bcrypt = Bcrypt()

from .user import UserModel, UserSchema