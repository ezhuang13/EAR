
<<<<<<< Updated upstream
# Create our flask application
app = Flask(__name__)
api = Api(app)

users = []
testz = []
# Create singular entry point for overall application
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
        return render_template('index.html')

# TODO: Write users to database
class User(Resource):
	def get(self, username):
		return users

	def post(self, username):
		data = request.get_json()
		users.append(data)
		return data
api.add_resource(User, '/user/<username>')

class Test(Resource):
	def get(self, username):
		return testz
	
	def post(self, username):
		data = request.get_json()
		testz.append(data)
		return data
api.add_resource(Test, '/test/<username>')

if __name__ == '__main__':
        app.run()
=======
>>>>>>> Stashed changes
