# app/config.py

import os

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        'DATABASE_URL').replace('postgres://', 'postgresql://')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = 'Content-Type'

    if os.getenv('FLASK_ENV') == 'development':
        DEBUG = True
        SQLALCHEMY_ECHO = True
    else:
        DEBUG = False
        SQLALCHEMY_ECHO = False