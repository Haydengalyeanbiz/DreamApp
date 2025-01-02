from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text
import os

def seed_users():
    demo_user = User(
        email = 'demo@user.com',
        username = 'demolition',
        password = 'password',
        first_name = 'Demo',
        last_name = 'Lition'
    )

    db.session.add(demo_user)
    db.session.commit()

def undo_users():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))
        
    db.session.commit()