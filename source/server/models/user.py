# Defines the different schemas for PostgreSQL
# Each "class" represents a different schema (to be exported to routes)
from marshmallow import fields, Schema
from . import db, bcrypt
import datetime

class UserModel(db.Model):
	# Define the name of the table.
	__tablename__ = 'users'

	# Define the UserModel for Postgres.
	id = db.Column(db.Integer,primary_key=True)
	firstName = db.Column(db.String(128),nullable=False)
	lastName = db.Column(db.String(128), nullable=False)
	username = db.Column(db.String(128),unique=True,nullable=False)
	emailAddress = db.Column(db.String(128),unique=True,nullable=False)
	password = db.Column(db.String(128),nullable=False)
	createdAt = db.Column(db.DateTime)
	projects = db.relationship('ProjectModel', backref='user', lazy='dynamic')

	# Class constructor for UserModel class.
	def __init__(self,data):
		self.firstName = data.get("firstName")
		self.lastName = data.get("lastName")
		self.emailAddress = data.get("emailAddress")
		self.username = data.get("username")
		self.password = bcrypt.generate_password_hash(data.get("password"), rounds=10).decode("utf-8")	
		self.createdAt = datetime.datetime.utcnow()

	# Saves a user to the database.
	def save(self):
		db.session.add(self)
		db.session.commit()

	# Deletes a user from the database.
	def delete(self):
		db.session.delete(self)
		db.session.commit()
	
	@staticmethod
	def commit():
		db.session.commit()

class UserSchema(Schema):
	id = fields.Int(dump_only=True)
	firstName = fields.Str(required=True)
	lastName=fields.Str(required=True)
	emailAddress = fields.Str(required=True)
	username = fields.Str(required=True)
	password = fields.Str(required=True,load_only=True)
	createdAt = fields.DateTime(dump_only=True)