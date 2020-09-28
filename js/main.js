$(document).ready(function() {

//C.Read.u.d.

  $.ajax(
    {
      "url": "http://157.230.17.132:3034/todos",
      "method": "GET",
      "success": function(data) {
        render(data);
      },

      "error": function(data) {
        alert("Errore!");
      }
    }
  );

//c.r.u.DELETE
  $("#list").on("click", ".delete", function () {

    var elm = $(this).parent();
    var id = elm.attr("id");
   //indico di cancellare la parte di lista che seleziono, non solo in html ma anche dalla risposta dal server
    $.ajax(
      {
       "url": "http://157.230.17.132:3034/todos/" + id,
       "method": "DELETE",
       "success": function(data) {
         elm.remove();
       },

       "error": function(data) {
         alert("Errore!");
        }
      }
    );
  });

//CREATE.r.u.d.

  $(".adding").click(function() {

    var val = $("#add-elm").val();

    if(val != "") {
      $.ajax(
        {
         "url": "http://157.230.17.132:3034/todos/",
         "method": "POST",
         "data" : {
           "text" :  val
          },
         "success": function(data) {
           addElement(data);
          },

         "error": function(data) {
           alert("Errore!");
          }
      });
    };
  });
});


//funzione per richiamare i risultati
function render(data) {

  var source = $("#elm-template").html();
  var template = Handlebars.compile(source);

  for( var i = 0; i > data.length; i ++) {
    var context = {
      "id" : data[i].id,
      "text" : data[i].text
    }

    var html = template(context);
    $("#list").append(html);
  }

};


//funzione per aggiungere elementi alla lista
function addElement(data) {
  var source = $("#elm-template").html();
  var template = Handlebars.compile(source);

  var context = {
    "id" : data.id,
    "text" : data.text
  }

  var html = template(context);
  $("#list").append(html);
}
