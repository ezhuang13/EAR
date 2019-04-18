# Import Project model and schema
from flask import request, Response, json, Blueprint, g, send_file
from models.project import ProjectModel, ProjectSchema
from models.user import UserModel, UserSchema
from minio import Minio
from . import custom_response
import os

minioClient = Minio(os.environ['BRIDGE_IP'] + ':' + os.environ['MINIO_PORT'],
                  access_key='minio',
                  secret_key='minio123',
				  secure=False)

# Save Project REST API as a Blueprint
project_api = Blueprint('project_api',__name__)

# Instantiate a local project schema
project_schema = ProjectSchema()

#################### Project API Routes ####################

# Creates a Project and adds it to the Database
# Validation of uniqueness done on the front end
	# URL: /project/
	# Method: POST
@project_api.route('/',methods=['POST'])
def create():
	# Process data
	dataJSON = json.loads(request.form['data'])
	audio = request.files['audio']
	data, error = project_schema.load(dataJSON)

	# If an error, return status code (400).
	if error:
		return custom_response(error, 400)
	
	# Add audio to bucket
	if minioClient.bucket_exists(data['username']):
		minioClient.put_object(data['username'], data['name'], audio, dataJSON['audioSize'])
	else:
		return custom_response('User does not exist for the project you are creating!', 400)
	
	# Save the model
	project = ProjectModel(data)
	user = UserModel.query.filter_by(username=project.username).first()
	user.projects.append(project)
	project.save()
	UserModel.commit()

	# Send a successful response to the client.
	return custom_response(data, 201)
	

# Obtains all projects currently created.
	# URL: /project/
	# Method: GET	
@project_api.route('/', methods=['GET'])
def get_all():
	# Obtain all projects.
	projects = ProjectModel.query.all()

	# Serialize the JSON for the client.
	ser_project = project_schema.dump(projects,many=True).data

	# Return a successful custom response with status code (201).
	return custom_response(ser_project, 201)


# Obtains all projects currently created by a specific user
	# URL: /project/<username>
	# Method: GET	
@project_api.route('/<username>', methods=['GET'])
def get_user_projects(username):
	# Obtain all projects.
	projects = UserModel.query.filter_by(username=username).first().projects

	# Serialize the JSON for the client.
	ser_project = project_schema.dump(projects, many=True).data

	# Return a successful custom response with status code (201).
	return custom_response(ser_project, 201)

# Obtain a specific user's project
	# URL: /project/<username>/<name>
	# Method: GET	
@project_api.route('/<username>/<name>', methods=['GET'])
def get_user_project(username, name):
	minioClient.fget_object(username, name, '/tmp/' + username + '/' + name)
	return send_file('/tmp/' + username + '/' + name)


# Delete a specific user's project
	# URL: /project/<username>/<name>
	# Method: GET	
@project_api.route('/<username>/<name>', methods=['DELETE'])
def delete_user_project(username, name):
	UserModel.query.filter_by(username=username).first().projects.filter_by(name=name).delete()
	ProjectModel.commit()
	minioClient.remove_object(username, name)
	return Response(status=201)
