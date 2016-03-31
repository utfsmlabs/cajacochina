# encoding: utf-8

import peewee as p
import ldap
from datetime import datetime
import config

proxy = p.Proxy()

class Base(p.Model):
  class Meta:
    database = proxy

class User(Base):
  handle = p.CharField(unique=True)
  name = p.CharField()
  created_at = p.DateTimeField()
  is_active = p.BooleanField(default=True)

  def get_income_sum(self):
    return Income.select(p.fn.SUM(Income.amount)).where(Income.user == self).scalar() or 0

  def get_outcome_sum(self):
    return Outcome.select(p.fn.SUM(Outcome.amount)).where(Outcome.user == self).scalar() or 0

class Income(Base):
  amount = p.DecimalField()
  reason = p.CharField()
  user = p.ForeignKeyField(User, related_name=u'amounts_paid', on_delete='CASCADE')
  created_at = p.DateTimeField()

class Outcome(Base):
  amount = p.DecimalField()
  reason = p.CharField()
  user = p.ForeignKeyField(User, related_name=u'amounts_loaned', on_delete='CASCADE')
  created_at = p.DateTimeField()

if __name__ == '__main__':
  if config.Parameters.DEBUG is True:
    db = p.SqliteDatabase(config.Parameters.DB_DEBUG_LOCATION)
    proxy.initialize(db)
  else:
    from playhouse.db_url import connect
    db = connect(config.Parameters.DB_PROD_LOCATION)
    proxy.initialize(db)

  proxy.connect()
  proxy.create_tables([User, Income, Outcome], safe=True)
  proxy.close()