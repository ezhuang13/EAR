# Defines the different schemas for PostgreSQL
# Each "class" represents a different schema (to be exported to routes)
from marshmallow import fields, Schema
from . import db, bcrypt
import datetime

class UserModel(db.Model):
	""" User Model """
	# define name of table
	__tablename__ = 'users'

	# define the model for the User
	id = db.Column(db.Integer,primary_key=True)
	firstName = db.Column(db.String(128),nullable=False)
	lastName = db.Column(db.String(128), nullable=False)
	username = db.Column(db.String(128),nullable=False)
	emailAddress = db.Column(db.String(128),unique=True,nullable=False)
	password = db.Column(db.String(128),nullable=False)
	createdAt = db.Column(db.DateTime)
	

	# class constructor
	def __init__(self,data):
		""" Class constructor """

		self.firstName = data.get("firstName")
		self.lastName = data.get("lastName")
		self.emailAddress = data.get("emailAddress")
		self.username = data.get("username")
		self.password = self.__generate_hash(data.get('password'))
		self.createdAt = datetime.datetime.utcnow()


	def save(self):
		""" save a user to the database """

		db.session.add(self)
		db.session.commit()

	def delete(self):
		""" delete a user from the database """

		db.session.delete(self)
		db.session.commit()

	@staticmethod
	def get_all_users():
		""" return all users from the DB """

		return UserModel.query.all()
	
	@staticmethod
	def get_one_user(id):
		""" return one user from the db """

		return UserModel.query.get(id)
	@staticmethod
	def get_user_by_email(value):
		""" get a user by their email address """

		return UserModel.query.filter_by(emailAddress=value).first()

	def get_user_by_username(value):
		""" get a user by their username """

		return UserModel.query.filter_by(username=value).first()
	
	def __generate_hash(self,password):
		""" function to generate hash based on the password """

		return bcrypt.generate_password_hash(password,rounds=10).decode("utf-8")
	
	def check_hash(self,password):
		""" method to check if hash is correct """

		return bcrypt.check_password_hash(self.password,password)

		def __repr(self):
			return '<id {}>'.format(self.id)

# allows the objects to be JSON serializable
# so define a User schema
class UserSchema(Schema):
	id = fields.Int(dump_only=True)
	firstName = fields.Str(required=True)
	lastName=fields.Str(required=True)
	emailAddress = fields.Str(required=True)
	username = fields.Str(required=True)
	password = fields.Str(required=True,load_only=True)
	createdAt = fields.DateTime(dump_only=True)