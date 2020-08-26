// Dare all'utente, attraverso un input la possibilità di inserire una data con questo formato DD/MM/YYYY.
// Rispondere all'utente con il giorno della settimana della data specificata.

function addListeners() {
  $('#btn').click(insertTask);
}

function insertTask () {

}

function deleteTask () {

}

function getTasks () {

  $.ajax ({
    url: 'http://157.230.17.132:3001/todos',
    method: 'GET',
    success: function (data) {
      console.log('data', data);
    },
    error: function (err) {
      console.log('err', err);
    }
  });
}

function init() {
  addListeners();
  getTasks();
}

$(document).ready(init);
