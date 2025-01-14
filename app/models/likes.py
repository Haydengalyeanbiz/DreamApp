# models/like.py
from .db import db, environment, SCHEMA, add_prefix_for_prod

class Like(db.Model):
    __tablename__ = 'likes'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    dream_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('dreams.id')), nullable=False)

    user = db.relationship('User', backref=db.backref('likes', lazy=True))
