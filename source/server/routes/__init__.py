from flask_bcrypt import Bcrypt
from flask import Response, json

bcrypt = Bcrypt()

# Custom Response Function
	# Param -- res: Response to be sent (i.e. a JSON Object)
	# Param -- status_code: The status code to be sent in the response
def custom_response(res, status_code):
  return Response(
    mimetype="application/json",
    response=json.dumps(res),
    status=status_code
  )
