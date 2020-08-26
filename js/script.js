//GOAL: replicare quanto visto a lezione sulla todo-list permettendo all'utente di leggere tutti i task inseriti, inserirne di nuovi, eliminare quelli vecchi

function addListeners() {
  $('#btn').click(insertTask);
  $('#input').keyup(sendKeyup);
  $(document).on('click', '.fa-times-circle', deleteTask);
}

function sendKeyup(event) {

  var task = $('#input').val();

  var keyWhich = event.which;
  var keyCode = event.keyCode;
  if ((keyWhich == 13 || keyCode == 13) && task) {
    insertTask ();
  }
}

function insertTask () {

  var target = $('input');
  var task = target.val();
  target.val('');

  $.ajax ({
    url: 'http://157.230.17.132:3001/todos',
    method: 'POST',
    data: {
      text: task
    },
    success: function (data) {
      getTasks();
    },
    error: function (err) {
      console.log('err', err);
    }
  });

}

function deleteTask () {

  var id = $(this).data('id');

  $.ajax ({
    url: `http://157.230.17.132:3001/todos/${id}`,
    method: 'DELETE',
    success: function (data) {
      getTasks();
    },
    error: function (err) {
      console.log('err', err);
    }
  });
}

function getTasks () {

  $('#list').html('');

  $.ajax ({
    url: 'http://157.230.17.132:3001/todos',
    method: 'GET',
    success: function (data) {
      printTasks(data);
    },
    error: function (err) {
      console.log('err', err);
    }
  });
}

function printTasks (tasks) {
  var target = $('#list');
  for (var i = 0; i < tasks.length; i++) {
    var task = tasks[i].text;
    var id = tasks[i].id;
    target.append(`<li><i class="fas fa-times-circle" data-id="${id}"></i>${task}</li>`);
  }
}

function init() {
  addListeners();
  getTasks();
}

$(document).ready(init);
