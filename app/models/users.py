from .db import db , environment, SCHEMA
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(150), nullable=False, unique=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String(128), nullable=False)
    #* -------future profile upgrades-------
    # profile_pic = db.Column(db.String(3000))
    # cover_pic = db.Column(db.String(3000))

    dreams = db.relationship('Dream', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        return self.hashed_password
    
    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id, 
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name
            }