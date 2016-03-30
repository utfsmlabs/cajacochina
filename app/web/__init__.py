# encoding: utf-8
from gevent import monkey; monkey.patch_all()
from flask import Flask
from flask.ext.seasurf import SeaSurf
from peewee import SqliteDatabase
from playhouse.db_url import connect

app = Flask(__name__, static_folder='../static', template_folder='../templates')
csrf = SeaSurf(app)

import config
from models import proxy
app.config.from_object(config.Parameters)

if app.debug is True:
  db = SqliteDatabase(app.config['DB_DEBUG_LOCATION'])
  proxy.initialize(db)
else:
  db = connect(app.config['DB_PROD_LOCATION'])
  proxy.initialize(db)

@app.before_request
def open_database():
  proxy.connect()

@app.teardown_request
def close_database(exc):
  proxy.close()

import admin
import loan_pay

if app.debug is True:
  import logging
  logger = logging.getLogger('peewee')
  logger.setLevel(logging.DEBUG)
  logger.addHandler(logging.StreamHandler())