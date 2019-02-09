# Defines the different schemas for PostgreSQL
# Each "class" represents a different schema (to be exported to routes)
from app import db

class Users(db.Model):
	# define name of table
	__tablename__ = 'users'

	# define the model for the User
	id = db.Column(db.Integer, primary_key=True)
	firstName = db.Column(db.String(128), nullable=False)
	lastName = db.Column(db.String(128), nullable=False)
	emailAddress = db.Column(db.String(128), nullable=False)
	username = db.Column(db.String(128), nullable=False)
	password = db.Column(db.String(128), nullable=False)

	def __init__(self,data):
		self.firstName = data.get("firstName")
		self.lastName = data.get("lastName")
		self.emailAddress =data.get("emailAddress")
		self.username = data.get('username')
		self.password = data.get('password')

	def save(self):
		db.session.add(self)
		db.session.commit()

	def delete(self):
		db.session.delete(self)
		db.session.commit()

