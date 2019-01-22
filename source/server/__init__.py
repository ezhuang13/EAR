# This is the Flask server for our web application!
import datetime
import json
import os
from flask import Flask, render_template

# Create our flask application
app = Flask(__name__)

# Create singular entry point for overall application
@app.route('/')
def index():
        return render_template('index.html')
