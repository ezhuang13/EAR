# This is the Flask server for our web application!
import datetime
import json
import os
from flask import Flask, render_template, request
from flask_restful import Resource, Api

# Create our flask application
app = Flask(__name__)
api = Api(app)

# Create singular entry point for overall application
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
        return render_template('index.html')

# TODO: Write users to database
class User(Resource):
	def post(self, username):
		data = request.get_json()
		return data
api.add_resource(User, '/user/<username>')

if __name__ == '__main__':
        app.run()
