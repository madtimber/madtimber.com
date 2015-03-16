/* jshint devel:true */
'use strict';

$(document).ready(function() {

  $('form').on('submit', function(e) {
    var form = $(this);
    $.post(form.attr('action'), {
      'name': form.find('#name').val(),
      'email': form.find('#email').val(),
      'message': form.find('#message').val(),
    }).done(function() {
      form.find('input[type!=submit], textarea').val('');
      form.find('button').text('Sent!').addClass('messageSent');
    }).error(function(err) {
      alert(err);
    });

    e.preventDefault();
  });

});