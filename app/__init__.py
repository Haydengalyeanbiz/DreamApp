import os
from flask import Flask, request, redirect
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_cors import CORS
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')

app.config['SECRET_KEY'] = 'your_secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
login_manager = LoginManager(app)
login_manager.login_view = 'auth.login'  # specify the endpoint for login
csrf = CSRFProtect(app)
cors = CORS(app)

@app.before_request
def https_redirect():
    if os.environ.get('FLASK_ENV') == 'production':
        if request.headers.get('X-Forwarded-Proto') == 'http':
            url = request.url.replace('http://', 'https://', 1)
            code = 301
            return redirect(url, code=code)

# After request to set CSRF token
@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') == 'production' else None,
        httponly=True)
    return response

# API documentation route
@app.route("/api/docs")
def api_help():
    acceptable_methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
    route_list = {
        rule.rule: [[method for method in rule.methods if method in acceptable_methods],
                    app.view_functions[rule.endpoint].__doc__]
        for rule in app.url_map.iter_rules() if rule.endpoint != 'static'
    }
    return route_list

# Serve React application
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    if path == 'favicon.ico':
        return app.send_from_directory(app.static_folder, 'favicon.ico')
    return app.send_static_file('index.html')

# Error handler for 404 not found
@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')