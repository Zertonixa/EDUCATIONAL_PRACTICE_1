from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

DATABASE_NAME = "application.sqlite"

engine = create_engine(f"sqlite:///{DATABASE_NAME}", connect_args={'check_same_thread': False})
Session = sessionmaker(autocommit=False, autoflush=False, bind = engine)

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()