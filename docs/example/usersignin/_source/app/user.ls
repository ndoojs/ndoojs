"use strict"

_        = @[\_]
$        = @[\jQuery] || @[\Zepto]

@N = @ndoo ||= {}
_n = @ndoo

_vars    = _n.vars
_func    = _n.func
_stor    = _n.storage

_n.app \user,
  depend: [\service.user]
  signinAction: !->
    $ 'button.btn-modal' .on \click, ->
      user = _n.service \user
      if user.hasSignin()
        false

    $ 'form.form-signin .btn-signin' .on \click, ->
      $self = $ @
      user = _n.service \user
      if user.hasSignin()
        $self.parents \.modal .find \.close .trigger \click

      email = $ \#inputEmail
      password = $ \#inputPassword

      result = user.auth email.val!, password.val!
      if result
        $self.parents \.modal .find \.close .trigger \click
      else
        alert 'signin failer!'
