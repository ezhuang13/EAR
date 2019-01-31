# file to manage migrations
# which essentially initialize 
# the database and tables as needed

import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import create_app,db

# create our app
app = create_app()

migrate = Migrate(app=app,db=db)
manager = Manager(app=app)
# add migrate command to
# appropriately initialize
# the database
manager.add_command('db',MigrateCommand)

if __name__ == '__main__':
    # run the migration manager!
    manager.run()

