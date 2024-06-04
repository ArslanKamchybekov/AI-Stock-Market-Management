from flask import Flask
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config.from_pyfile('config.py')

mongo = PyMongo(app)

#issue with import
from controllers.user_controller import user_bp
app.register_blueprint(user_bp, url_prefix='/api/v1')

if __name__ == '__main__':
    app.run(debug=True)
