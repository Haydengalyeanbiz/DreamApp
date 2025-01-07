from .db import db, environment, SCHEMA, add_prefix_for_prod

class Dream(db.Model):
    __tablename__ = 'dreams'
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(1200), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.now())

    user = db.relationship('User', back_populates='dreams')
    likes = db.relationship('Like', backref='dream', lazy='dynamic')
    comments = db.relationship('Comment', backref='dream', lazy='dynamic')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'username': self.user.username,
            'title': self.title,
            'description': self.description
        }