from sqlalchemy.orm import DeclarativeBase
import sqlalchemy as sa


Base = DeclarativeBase()

class Operation(Base):

    __tablename__ = 'operations'

    id = sa.Column(sa.Integer, primary_key = True)
    experience = sa.Column(sa.String)
    employer = sa.Column(sa.Tuple)
    has_test = sa.Column(sa.Boolean)
    url = sa.Column(sa.String)
    area = sa.Column(sa.String)
    name = sa.Column(sa.String)
    premium = sa.Column(sa.Boolean)
    salary = sa.Column(sa.Integer)
    
