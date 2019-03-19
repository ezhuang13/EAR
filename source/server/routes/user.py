# Import the necessary stuff.
from flask import request, Response, json, Blueprint, g
from models.user import UserModel, UserSchema
from . import bcrypt

# Save the User Restful API as a blueprint (named "user_api")
user_api = Blueprint('user_api',__name__)

# Instantiate a local User Schema (user_schema)
user_schema = UserSchema()

# Custom Response Function
	# Param -- res: Response to be sent (i.e. a JSON Object)
	# Param -- status_code: The status code to be sent in the response
def custom_response(res, status_code):
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )

#################### User API Routes ####################

# Creates a User and adds it to the Database
	# URL: /users/
	# Method: POST
@user_api.route('/', methods=['POST'])
def create():

	# Obtain JSON and serialize it for consumption.
	req_data = request.get_json()
	data, error = user_schema.load(req_data)
	
	# If an error, return status code (400).
	if error:
		return custom_response(error, 400)

	# Ensure username uniqueness.
	user_in_db = UserModel.query.filter_by(username=data['username']).first()
	
	# If user already exists, return status code (400) and error.
	if user_in_db:
		message = {'error': 'User already exist, please supply another username'}
		return custom_response(message, 400)
	
	# Print the data for clarity.
	print(data)

	# Turn the data into a UserModel, and save it!
	user = UserModel(data)
	user.save()

	# Send a successful response to the client.
	return custom_response(data, 201)

# Obtains all users currently registered.
	# URL: /users/
	# Method: GET	
@user_api.route('/', methods=['GET'])
def get_all():
	
	# Obtain all users.
	users = UserModel.query.all()

	# Serialize the JSON for the client.
	ser_user = user_schema.dump(users,many=True).data

	# Return a successful custom response with status code (201).
	return custom_response(ser_user, 201)

# Obtains a UserModel for a particular username.
	# Param -- username: The username to be queried for.
@user_api.route('/<username>',methods=['GET'])
def get_a_user(username):

	# Query the UserModel for the User ID (user_id).
	user = UserModel.query.filter_by(username=username).first()

	# If user not in the database, return error with status code (404).
	if not user:
		return custom_response({'error':'user not found'}, 404)

	# Serialize the queried user into JSON.
	ser_user = user_schema.dump(user).data

	# Return a custom response with the user and status code (200).
	return custom_response(ser_user, 200)


# Deletes a User in UserModel based on a particular ID.
	# Param -- user_id: The ID to be queried for.
@user_api.route('/<user_id>', methods=['DELETE'])
def delete(user_id):
	
	# Obtain the User based on the User ID (user_id).
	user = UserModel.query.get(user_id)

	# Delete the particular user from the UserModel.
	user.delete()

	# Successful deletion, return message with status code (204).
	return custom_response({'message':'deleted'}, 204)

# Attempts to login a user!
@user_api.route('/login',methods=['POST'])
def login():

	# Obtain JSON (serialize) and load into schema format.
	req_data = request.get_json()
	data,error = user_schema.load(req_data, partial=True)

	# Print the information received.
	print(data)

	# If error, return status code (400) and error.
	if error:
		return custom_response(error, 400)

	# Check that both fields were entered / not empty, return status code (400) if missing one.
	if not data.get('username') or not data.get('password'):
		return custom_response({'error':'username and password required to sign in'}, 400)
	
	# Try to match the inputted user with one in the UserModel.
	user = UserModel.query.filter_by(username=data['username']).first()

	# Check if user exists in the database (return status code (400) if not).
	if not user:
		return custom_response({'error':'user does not exist'},400)
	
	# Check the password against the stored hash password (return status code (400) if no matching).
	if not bcrypt.check_password_hash(user.password, data.get('password')):
		return custom_response({'error':'invalid credentials'}, 400)

	# Login was successful, return serialized JSON with status code (201).
	ser_data = user_schema.dump(user).data
	return custom_response({'message':'successfully logged in'}, 201)