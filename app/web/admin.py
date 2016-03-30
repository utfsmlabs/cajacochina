#encoding: utf-8

import functools
from flask import (render_template, session,
                  redirect, url_for, request, flash)
from cerberus import Validator
import ldap
from . import app
import peewee as p
import models as m

_login_schema = {
  'username': {
    'required': True,
    'empty': False
  },
  'password': {
    'required': True,
    'empty': False
  },
  '_csrf_token': {
    'required': True,
    'empty': False
  }
}

_add_user_schema = {
  'handle': {
    'required': True,
    'empty': False
  },
  'name': {
    'required': True,
    'empty': False
  },
  '_csrf_token': {
    'required': True,
    'empty': False
  }
}

lv = Validator(_login_schema)
new_user_validation = Validator(_add_user_schema)

# User login.

def requires_admin(f):
  @functools.wraps(f)
  def wrapper(*args, **kwargs):
    admin = session._get_current_object().get('admin', None)
    if admin is None or admin not in app.config['ADMINISTRATORS']:
      return redirect(url_for('admin_login'))
    return f(*args, **kwargs)
  return wrapper

@app.route(u'/admin/login')
def admin_login():
  if session.get('admin', None) in app.config['ADMINISTRATORS']:
    return redirect(url_for('admin_index'))
  return render_template('admin/login.html')

@app.route(u'/admin/login', methods=['POST'])
def check_login():
  if not lv.validate(request.form):
    flash(u'Formulario inválido, intente de nuevo', 'danger')
    return render_template('admin/login.html')

  if session.get('admin', None) in app.config['ADMINISTRATORS']:
    return redirect(url_for('admin_index'))

  username = request.form.get('username', None)
  if username not in app.config['ADMINISTRATORS']:
    flash(u'Usuario no es administrador', 'danger')
    return render_template('admin/login.html')

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
      session['admin'] = username
      return redirect(url_for('admin_index'))
    else:
      raise ldap.INVALID_CREDENTIALS
  except ldap.INVALID_CREDENTIALS:
    c.unbind()
    flash(u'Usuario y/o contraseña invalidos', 'danger')
    return render_template('admin/login.html')
  except (ldap.SERVER_DOWN, ldap.UNWILLING_TO_PERFORM):
    flash(u'No se pudo realizar conexión con el servidor LDAP', 'warning')
    return render_template('admin/login.html')

@app.route('/admin/logout')
def admin_logout():
  del session['admin']
  return redirect(url_for('index'))

#Index
@app.route(u'/admin/')
@requires_admin
def admin_index():
  total_loaned = (m.Outcome
          .select(p.fn.SUM(m.Outcome.amount).alias('total'))
          .scalar()) or 0
  total_paid = (m.Income
          .select(p.fn.SUM(m.Income.amount).alias('total'))
          .scalar()) or 0

  last_paid = (m.Income.select(m.Income.amount,
               m.User.name, m.Income.created_at)
              .join(m.User).order_by(m.Income.created_at.desc()).limit(10))
  last_loaned = (m.Outcome.select(m.Outcome.amount,
               m.User.name, m.Outcome.created_at)
              .join(m.User).order_by(m.Outcome.created_at.desc()).limit(10))

  total_loans = (m.Outcome
                .select(m.Outcome.user, p.fn.SUM(m.Outcome.amount).alias('debt'))
                .group_by(m.Outcome.user).alias('total_loans')
                )

  total_payments = (m.Income
                .select(m.Income.user, p.fn.SUM(m.Income.amount).alias('paid'))
                .group_by(m.Income.user).alias('total_payments')
                )

  top_five = (m.User
              .select(m.User.name,
                (total_loans.c.debt - total_payments.c.paid)
                .alias('total_debt'))
              .join(total_loans, on=(m.User.id == total_loans.c.user_id))
              .switch(m.User)
              .join(total_payments, on=(m.User.id == total_payments.c.user_id))
              .limit(5))

  return render_template('admin/index.html',
        loaned=total_loaned,
        paid=total_paid,
        last_loaned=last_loaned,
        last_paid=last_paid,
        top_five=top_five)

#Deudas
@app.route(u'/admin/debts/<int:page>')
@app.route(u'/admin/debts', defaults={'page': 1})
@requires_admin
def debts_index(page=1):
  debts_per_page = app.config['ADMIN_ENTRIES_PER_PAGE']
  total_pages = (m.Outcome
      .select((p.fn.COUNT('*') / debts_per_page)
      .alias('total_pages')).scalar())
  debts = (m.Outcome.select().join(m.User)
    .order_by(m.Outcome.id).paginate(page, debts_per_page))
  if page > total_pages + 1:
    return redirect(url_for('debts_index'))
  return render_template('admin/list_debts.html',
    debts=debts, total_pages=total_pages,
    page=page, last_page=(page == total_pages + 1))

@app.route(u'/admin/debts/forget/<int:debt_id>')
@requires_admin
def forget_debt(debt_id):
  query = m.Outcome.delete().where(m.Outcome.id == debt_id)
  if query.execute() == 1:
    flash(u'Deuda eliminada del sistema.', 'info')
  else:
    flash(u'No se eliminó deuda dado que no existía.', 'warning')
  return redirect(url_for('debts_index'))


#Pagos
@app.route(u'/admin/payments/<int:page>')
@app.route(u'/admin/payments', defaults={'page': 1})
@requires_admin
def payments_index(page=1):
  debts_per_page = app.config['ADMIN_ENTRIES_PER_PAGE']
  total_pages = (m.Income
      .select((p.fn.COUNT('*') / debts_per_page)
      .alias('total_pages')).scalar())
  payments = (m.Income.select().join(m.User)
    .order_by(m.Income.id).paginate(page, debts_per_page))
  if page > total_pages + 1:
    return redirect(url_for('debts_index'))
  return render_template('admin/list_payments.html',
    payments=payments, total_pages=total_pages,
    page=page, last_page=(page == total_pages + 1))

@app.route(u'/admin/payments/forget/<int:payment_id>')
@requires_admin
def forget_payment(payment_id):
  query = m.Income.delete().where(m.Income.id == payment_id)
  if query.execute() == 1:
    flash(u'Pago eliminado del sistema.', 'info')
  else:
    flash(u'No se eliminó pago dado que no existía.', 'warning')
  return redirect(url_for('payments_index'))


#Usuarios
@app.route(u'/admin/users')
@requires_admin
def admin_users():
  users = m.User.select().order_by(m.User.id)
  return render_template('admin/users.html', users=users)

@app.route(u'/admin/users/create')
@requires_admin
def admin_create_user():
  return render_template('admin/user_create.html')

@app.route(u'/admin/users/create', methods=['POST'])
@requires_admin
def admin_add_user():
  if not new_user_validation.validate(request.form):
    flash(u'Formulario incorrecto, favor intentar de nuevo', 'danger')
    return render_template('admin/user_create.html')
  try:
    user = m.User.create(handle=request.form['handle'], name=request.form['name'])
    flash(u'Usuario creado con éxito', 'info')
    return redirect(url_for('admin_users'))
  except p.IntegrityError:
    flash(u'El usuario con dicho login LDAP ya existe', 'danger')
    return render_template('admin/user_create.html')