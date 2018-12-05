// Variables Globales

var indice = 0; //controla el slider del header

// function deslizarMenu() {

// 	var m = document.getElementById('menu');
// 	var btn = document.getElementById('btnMenu');

// 	if (m.className == 'abrir') {
// 		/*le quita la clase abrir*/
// 		m.className = '';
// 		btn.innerHTML = '<i><i class="fas fa-bars"></i></i>';
// 	} else {
// 		/*le agrega la clase abrir*/
// 		m.className = 'abrir';
// 		btn.innerHTML = '<i><i class="fas fa-times"></i><i>';
// 	}
// }

//función que mueve las imagenes del slider del header
//----------------------------------------------------------->
(function activarSlider() {
  var i;
  var x = document.getElementsByClassName("imgSlider");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  indice++;
  if (indice > x.length) {
    indice = 1;
  }
  x[indice - 1].style.display = "block";
  //define el tiempo que tarda cada imagen mostrandose en pantalla
  setTimeout(activarSlider, 9000);
})();

// <------------------------------------------------------------------------- funciones para el modal

var identificador = 0;

function mostrar(id) {
  // la función resive el id de la imagen que se le hizo clic
  // la imagen tiene como id img mas un numero del 1
  // hasta la cantidad de imagenes que tenga la pagina por esto
  // se concatena img+ el id que trae la función como argumento
  //la variable identificador va a guardar el valor que trae el id de la función mostrar
  //para usar ese valor en la funcion ocultar.
  var img = document.getElementById("img" + id);
  img.style.display = "block";
  identificador = id;
  var btnMostrar = document.getElementById("leerM");

  btnMostrar.style.display = "block";
}

function ocultar() {
  var img = document.getElementById("img" + identificador);
  img.style.display = "none";
  img.style.height = "100%";
}

function mostrarMas() {
  $(".texto_oculto").css("display", "block");
  $("#leerM").css("display", "none");
}
// <------------------------------------- funciones para el modal

// -------------------------------------------------------- Acordion
$(function() {
  $("#accordion").accordion();
});

$("#accordion").accordion({
  animate: 700
});
// -------------------------------------------------------- Acordion

//	PASAR EL MONTO QUE SE A COTIZADO ENTRE PAGINAS ----------------------->

function pasarVariables(pagina) {
  var t = $("#total").val(); //obtengo el monto que esta en el campo que me muestra el total de la cotización
  var total = t.split("¢"); //le quito el signo de colones porque en la url me da un codigo digicil de manejar

  pagina += "?monto=" + total; //le concateno el monto a la direccón con el signo de interrogación
  location.href = pagina; //redirigir a la pagina
}

//----------------------------------------------------->

function guardarContadores(id) {
  var idE = id.split("_");
  if (idE[0] == "btnE") {
    id = "btn_" + idE[1];
  }

  var valorInicial = 0;
  var url = location.href; //copio la direccion url en una variable
  var pagina = url.split("?"); //extaigo el nombre de la pagina

  url = pagina[0]; //en la que estoy ubicado actualmente
  var direccion = url.split("/");
  direccion = direccion[direccion.length-1];
  direccion = direccion.split(".");
  direccion = direccion[0];

  direccion = direccion + id; //sumo el nombre de la pagina con el id para crear el nombre e la variable de session
  var c = $("#" + id + "~.cont").text(); // obtengo lo que tiene el contador

  var s_storage = sessionStorage.getItem(direccion); //obtengo lo que trae la variable de session  

  if (s_storage != null) {
    valorInicial = s_storage;
  } else {
    valorInicial = 0;
  }

  if (c > valorInicial) {
    c = parseInt(c) - parseInt(valorInicial) + parseInt(valorInicial);
  }
  
  sessionStorage.setItem(direccion, c);
} // <------------------------------------------------------------

//MUESTRA LOS CONTADORES DE LOS PRODUCTOS CUANDO LA PAGINA CARGA
//-------------------------------------------------->

function mostrarContadores() {
  var url = location.href; //copio la direccion url en una variable
  var pagina = url.split("?"); //extaigo el nombre de la pagina

  url = pagina[0]; //en la que estoy ubicado actualmente
  var direccion = url.split("/");
  direccion = direccion[direccion.length-1];
  direccion = direccion.split(".");
  direccion = direccion[0];

  var id = "btn_";
  direccion = direccion + id;

  var prod = $(".cont").length; // obtengo la cantidad de productos que hay en la pagina

  var i = 1;
  //MUESTRA LOS CONTADORES DE LOS PRODUCTOS QUE HAY EN LA PAGINA SEGUN EL ID DEL BOTON SE OBTIENE EL HERMANO CON LA CLASE CONT
  while (i <= prod) {
    var a = sessionStorage.getItem(direccion + i);


    if (a !== null) {
      $("#" + id + i + "~.cont").text(a);
    
    } else {
      $("#" + id + i + "~.cont").text("0");
      
    }
    //MOSTRAR EL BTON DE ELIMINAR DE LA COTIZACIÓN
    if (parseInt($("#" + id + i + "~.cont").text()) > 0) {
      $("#" + id + i + "~.btnEliminarPrec").css({
        display: "block",
        float: "left"
      }); //se aumenta el contador en uno
    }

    i++;
  }
} //<----------------------------------------------------------

//OPTENER EL MONTO DESDE LA URL Y MOSTRARLO EN EL CAMPO "TOTAL"
//------------------------------------------------------------>

function muestraMonto() {
  var url = location.href; //copio la direccion url en una variable

  var monto = url.split(","); //extaigo el monto

  if (isNaN(parseFloat(monto[1]))) {
    //si no es un numero es porque no se a mandado ningun parametro

    $("#total").val("¢" + 0); //al monto le concateno el signo de colones
  } else {
    $("#total").val("¢" + monto[1]); //al monto le concateno el signo de colones
  }
  mostrarContadores();
} //<-----------------------------------------------------------

// OBTENER PRECIO Y SUMARLE EL DE LOS PRODUCTOS QUE ELIJA
// //--------------------------------------------------------->

function capturaPrecio(id) {
  var c = $("#" + id + "~.cont").text(); // obtengo lo que tiene el contador
  $("#" + id + "~.cont").text(+c + 1); //se aumenta el contador en uno

  var p = $("#" + id + "~ p>span").text(); // obtengo el precio que esta en la imagen del producto

  var t = $("#total").val(); //obtengo el monto que esta en el campo que me muestra el total de la cotización
  var monto = t.split("¢"); //le hago un split para quitarle el signo de colones

  monto = parseFloat(monto[1]) + parseFloat(p); //sumo ambos montos
  monto = parseFloat(monto).toFixed(2); //retorna el resultado con 3 decimales como maximo
  $("#total").val("¢" + monto); //en el espacio muestro el monto actual y le concateno el signo de colones

  // MOSTRAR EL BOTON DE CANCELAR LA COTIZACION DEL PRODUCTO
  if (parseInt($("#" + id + "~.cont").text()) > 0) {
    $("#" + id + "~.btnEliminarPrec").css({
      display: "block",
      float: "left"
    }); //se aumenta el contador en uno
  }

  guardarContadores(id); //se llama la funsion para guardar el contador en las variables de session
} //<--------------------------------------------------------------

//RESRTA AL MONTO TOTAL EL PRECIO DEL PRODUCTO QUE SE DESELECCIONA
//------------------------------------------------------------>

function eliminarPrecio(id) {
  var c = $("#" + id + "~.cont").text(); // obtengo lo que tiene el contador
  $("#" + id + "~.cont").text(+c - 1); //se disminuye el contador en uno

  var p = $("#" + id + "~ p>span").text(); // obtengo el precio que esta en la imagen del producto

  var t = $("#total").val(); //obtengo el monto que esta en el campo que me muestra el total de la cotización
  var monto = t.split("¢", t.length); //le hago un split para quitarle el signo de colones

  monto = parseFloat(monto[1]) - parseFloat(p); //sumo ambos montos
  monto = parseFloat(monto).toFixed(2); //retorna el resultado con 3 decimales como maximo
  $("#total").val("¢" + monto); //en el espacio muestro el monto actual y le concateno el signo de colones

  if (parseInt($("#" + id + "~.cont").text()) == 0) {
    $("#" + id).css("display", "none"); //se aumenta el contador en uno
  }

  guardarContadores(id);
}

//	<------------------- PASAR EL MONTO QUE SE A COTIZADO ENTRE PAGINAS

//funcion para cambiar el color del menu de cotización
// (function color() {

// 	if (estado == false) {
// 		$('aside').css('background', 'linear-gradient(-90deg, orange, red)');
// 		estado = true;
// 	} else {
// 		$('aside').css('background', 'linear-gradient(90deg, orange, red)');
// 		estado = false;
// 	}
// 	setTimeout(color, 3000);
// })();

// (function colorFuente() {

// 	switch (contador) {
// 		case 0:
// 			$('.tituloCot').css('color', 'rgb(78, 62, 62)')
// 			.css('font-size','30px');
// 			contador++;
// 			break;
// 		case 1:
// 			$('.tituloCot').css('color', 'rgb(77, 2, 252)')
// 			.css('font-size','20px');

// 			contador++;
// 			break;
// 		case 2:
// 			$('.tituloCot').css('color', 'rgb(0, 130, 0)')
// 			.css('font-size','30px');
// 			contador++;
// 			break;
// 		case 3:
// 			$('.tituloCot').css('color', 'rgb(230, 11, 138)')
// 			.css('font-size','20px');
// 			contador++;
// 			break;

// 		default:
// 			break;
// 	}

// 	if (contador >3) {
// 		contador = 0;
// 	}
// 	setTimeout(colorFuente, 1000);
// })();
