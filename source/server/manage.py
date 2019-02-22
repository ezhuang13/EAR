# Manages the migrations (maps our local schemas to the remote database)
import os
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app import create_app, db

app = create_app()

# Perform the necessary migrations!
migrate = Migrate(app, db)
manager = Manager(app)
manager.add_command('db', MigrateCommand)

# Runs this thingy.
if __name__ == '__main__':
    manager.run()
