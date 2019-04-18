from marshmallow import fields, Schema
from . import db
import datetime
from .user import UserModel

# Defines the different schemas for PostgreSQL
# Each "class" represents a different schema (to be exported to routes)
class ProjectModel(db.Model):
    # Define the name of the table
    __tablename__ = 'project'

    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(128),nullable=False)
    dateCreated = db.Column(db.String(128), nullable=False)
    filetype = db.Column(db.String(128),nullable=False)
    username = db.Column(db.String(128),nullable=False)

    def __init__(self, data):
        self.user_id = UserModel.query.filter_by(username=data.get('username')).first().id
        self.name = data.get('name')
        self.dateCreated = data.get('dateCreated')
        self.filetype = data.get('filetype')
        self.username = data.get('username')

    def save(self):
        db.session.add(self)
        db.session.commit()
    
    @staticmethod
    def commit():
        db.session.commit()
    
    def __repr__self():
        return 'id {}>'.format(self.id)
    
class ProjectSchema(Schema):
    id = fields.Int(dump_only=True)
    user_id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    dateCreated = fields.Str(required=True)
    filetype = fields.Str(required=True)
    username = fields.Str(required=True)
