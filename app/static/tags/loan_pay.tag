<loan-pay-form>
<form method="post" autocomplete="off" class="form-horizontal" id="loan_pay_form">
  <div class="form-group">
    <div class="col-md-6">
      <div class="input-group">
        <span class="input-group-addon">Quiero</span>
        <select name="action" class="form-control">
          <option disabled="disabled" selected="selected">Elegir una opción</option>
          <option value="view">Ver Deudas</option>
          <option value="withdraw">Sacar Plata</option>
          <option value="pay">Pagar Deuda</option>
        </select>
      </div>
    </div>

    <div class="col-md-6" if={showAmount}>
      <div class="input-group">
        <span class="input-group-addon">$</span>
        <input type="text" name="amount" placeholder="Ingresar monto" class="form-control">
      </div>
    </div>
  </div>

  <div class="well well-sm" if={showUserLogin}>
    <div class="form-group">
      <label for="username" class="col-md-2 col-md-offset-3 control-label">Usuario</label>
      <div class="col-md-4">
        <input class="form-control" type="text" name="username">
      </div>
    </div>
    <div class="form-group">
      <label for="password" class="col-md-2 col-md-offset-3 control-label">Contraseña</label>
      <div class="col-md-4">
        <input class="form-control" type="password" name="password">
      </div>
    </div>
    <div class="form-group">
      <div class="col-md-6 col-md-offset-3">
      <button type="submit" class="btn btn-primary btn-block">Realizar Acción</button>
      </div>
    </div>
  </div>
  <input type="hidden" name="_csrf_token">
</form>
<script>

var self = this;
self.showAmount = false;
self.showUserLogin = false;

self.loan_pay_form.addEventListener("submit", function(e){
  if(!self.showUserLogin)
    e.preventDefault();
});

self.action.addEventListener("change", function(e) {
  self.amount.value = '';
  self.showAmount = e.target.selectedIndex > 1;
  self.showUserLogin = e.target.selectedIndex == 1;
  self.update();
});

self.amount.addEventListener("keyup", function(e) {
  var parsedValue = parseInt(e.target.value, 10)
  self.showUserLogin = !isNaN(parsedValue) && parsedValue > 0;
  self.update();
});

self.on('mount', function() {
  self._csrf_token.value = $('meta[name="csrf"]').getAttribute("value");
});

</script>
</loan-pay-form>