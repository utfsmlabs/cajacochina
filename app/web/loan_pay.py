#encoding: utf-8

from . import app
from flask import render_template, request, flash, redirect, url_for
from cerberus import Validator
from datetime import datetime
import ldap

import models as m

_schema = {
  'action': {
    'required': True,
    'allowed': [u'view', u'withdraw', u'pay']
  },
  'username': {
    'required': True,
    'type': 'string',
    'empty': False
  },
  'password': {
    'required': True,
    'type': 'string',
    'empty': False
  },
  'amount': {
    'type': 'string',
    'regex': '^[1-9][0-9]*$'
  },
  '_csrf_token': {
    'required': True,
    'type': 'string',
    'empty': False
  }
}

fv = Validator(_schema)

@app.route(u'/')
def index():
  app.logger.info(u'Serving index.html')
  return render_template('index.html')

@app.route(u'/', methods=['POST'])
def check():
  if fv.validate(request.form):
    username = request.form.get('username', '')
    try:
      c = ldap.initialize(app.config['LDAP_SERVER'])
      c.set_option(ldap.OPT_REFERRALS, 0)
      res = c.search_ext_s(
        app.config['LDAP_BASE_DN'],
         ldap.SCOPE_SUBTREE,
         '(uid={})'.format(username))
      if len(res) == 1:
        c.simple_bind_s(res[0][0],
          request.form.get('password', ''))
        c.unbind()
      else:
        raise ldap.INVALID_CREDENTIALS
    except ldap.INVALID_CREDENTIALS:
      c.unbind()
      flash(u'Usuario y/o contraseña invalidos', 'danger')
      return redirect(url_for('index'))
    except (ldap.SERVER_DOWN, ldap.UNWILLING_TO_PERFORM):
      flash(u'No se pudo realizar conexión con el servidor LDAP', 'warning')
      return redirect(url_for('index'))

    try:
      user = m.User.get(m.User.handle == username,
        m.User.is_active == True)
    except m.User.DoesNotExist:
      flash(u'El usuario no se encuentra en el sistema', 'warning')
      return redirect(url_for('index'))

    if request.form['action'] == 'view':
      loaned = (m.Outcome.select()
        .where(m.Outcome.user == user)
        .order_by(-m.Outcome.created_at))
      paid = (m.Income.select()
        .where(m.Income.user == user)
        .order_by(-m.Income.created_at))
      return render_template('user_status.html',
        loaned=loaned, paid=paid, user=user)
    elif request.form['action'] == 'withdraw':
      loaned = (m.Outcome.create(
        amount=request.form['amount'],
        user=user, reason='', created_at=datetime.now()))
      flash(
        (u'Transacción recibida, proceda a retirar ${} de la caja.'
          .format(request.form['amount'])), 'info')
      return redirect(url_for('index'))
    elif request.form['action'] == 'pay':
      paid = (m.Income.create(
        amount = request.form['amount'],
        user=user, reason='', created_at=datetime.now()))
      flash((u'Transacción recibida, gracias por devolver ${} a la caja.'
        .format(request.form['amount'])),'info')
      return redirect(url_for('index'))

  flash('Datos invalidos, favor ingresar de nuevo.', 'danger')
  return render_template('index.html')