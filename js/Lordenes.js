

//$(document).ready(function () {
//carga la librería javascript de jquery cuando se carga la página barcos.html por completo
//cuando carga la página html se ejecuta la función: listar()
$(document).ready(function () {
    //configura el aspecto inicial de la pagina
    estadoInicial();
    //ejecuta función para enviar petición al ws
    listar();
});



function estadoInicial(){
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);
    if(user1 == null){
        location.href="index.html";
    }
    $("#navbarDropdown2").html(usuariojscript.name + '<img src="logo/icon.png" height="40" alt="" loading="lazy">');





   $('#login2').hide();
}




let productos = [];
let productosSeleccionados = [];
let cantidades = [];
let cantidadesProducto = [];


//Esta función ejecuta la petición asincrona al servidor de Oracle, envia una
//petición al ws de tipo GET
function listar() {
    $.ajax({
        // la URL para la petición (url: "url al recurso o endpoint")
        url: "http://144.22.228.170/api/accessory/all",
        
        // especifica el tipo de petición http: POST, GET, PUT, DELETE
        type: 'GET',

        // el tipo de información que se espera de respuesta
        dataType: 'json',

        // código a ejecutar si la petición es satisfactoria;
        // la respuesta es pasada como argumento a la función
        success: function (respuesta) {
            //recibe el arreglo 'items' de la respuesta a la petición
            listarProductos(respuesta);
        },

        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            console.log("algo fallo");
        },

        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            console.log("Todo super bien"  + status);
        }
    });
}

/* 
    Esta función se encarga de recorrer el listado de datos 'items' recibido como parametro,
    construir una tabla html en la variable javascript 'tabla',
    acceder al elemento elemento identificado con el id 'listado'
    y modificar su html agregando el contenido de la variable 'tabla'.
    
*/
function listarProductos(items){


    productos = items;

    let tabla = `<table class="table">
                <thead>
                  <tr>
                    <th>Referencia</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Descripción</th>
                    <th>Disponibilidad</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th>Fotografia</th>
                    <th colspan="2">Cantidad orden</th>
                  </tr>`;
    //escribe en la consola del desarrollador para efectos de depuración
    console.table(items);

    //recorrer el arreglo de items de producto para pintarlos en la tabla
    for (let index = 0; index < items.length; index++) {

        let texto = `<strong>Referencia:</strong> ${items[index].reference}</br><strong>Descripción:</strong> ${items[index].description}`;
        
        let availability = items[index].availability ? 'SI':'NO';
        tabla +=`<tr>
                  <th scope="row">${items[index].reference}</th>
                   <td>${items[index].category}</td>
                   <td>${items[index].brand}</td>
                   <td>${items[index].description}</td>
                   <td>${availability}</td>
                   <td>${items[index].price}</td>
                   <td>${items[index].quantity}</td>
                   <td><img src="${items[index].photography}" height="60" alt="" loading="lazy" /></td>
                   <td><input type="number" id="prod_${items[index].reference}"/></td>
                   <td><button id="bot_${items[index].reference}" onclick="registrarproducto('${index}')">Agregar</button></td>
                    </td>
                   </tr>`;     
    }

    //cierra tabla agregando el tag adecuado
    tabla +=`</thead></table>`;

    //accede al elemento con id 'listado' y adiciona la tabla de datos a su html
    $("#table-box").html(tabla);
   
}



/**
 * Se ejecuta al hacer clic sobre el boton agregar, y se encarga de adicionar productos y cantidades a los 
 * respectivos arreglos
 * @param {*} indice posición del elemento en el arreglo de productos (productos[])
 */
function registrarproducto(indice) {
    let referencia = productos[indice].reference;
    let idCaja = `prod_${referencia}`;
    let index = 0;
    let encontro = false;
    cantidadProducto = parseInt(document.getElementById(idCaja).value);
    if (isNaN(cantidadProducto) || cantidadProducto <= 0) {
        swal("ohh no!", "EL campo esta vacio o es cero\nescribe una cantidad, por favor", "error");
    } else{ 
       


        //Valido si previamente existe el producto en el arreglo de cantidades, obtiene la cantidad previa y suma la nueva cantidad
        for (index = 0; index < productosSeleccionados.length; index++) {
            if (productosSeleccionados[index].reference == referencia) {
                encontro = true;
                break;
            }
        }

        if (encontro) {
            cantidades[index] = cantidades[index] + cantidadProducto;
        } else {
            cantidades.push(cantidadProducto);
            productosSeleccionados.push(productos[indice]);
        }





        //limpio cantidad de producto y asigno el cursor sobre el campo
        document.getElementById(idCaja).value = "";
        document.getElementById(idCaja).focus();

        swal("Que bien!", "Producto agregado...! ", "success");
        traerInformacion();
        $('#login2').show(1000);
    
    }
}


function traerInformacion(){


		$("#table-box2").empty();
        let subtotal=0;

        let miTabla = '<table class="table"><thead><tr><th scope="col">Referencia</th><th scope="col">Disponibilidad</th><th scope="col">Precio</th><th scope="col">Cantidad ORDEN</th><th scope="col">Subtotal</th></tr></thead><tbody>';
		for (i=0; i<productosSeleccionados.length; i++){
			miTabla += '<tr>';
            miTabla += '<th scope="row">'+productosSeleccionados[i].reference+'</th>';       
		
		
            let disponibilidad = false;
            if(productosSeleccionados[i].availability == true){
                disponibilidad = "SI";
            }else{
                disponibilidad = "NO";
            }		
	        miTabla += '<td>'+ disponibilidad+ '</td>'; 
            miTabla += '<td>'+ productosSeleccionados[i].price+ '</td>'; 
            miTabla += '<td>'+ cantidades[i]+ '</td>';

            precio = parseInt(productosSeleccionados[i].price);
            cantidad = parseInt(cantidades[i]);
            miTabla += '<td>'+ (precio *cantidad)+ ' $</td>';



	
			miTabla += '<td><button onclick="eliminarRegistro('+i+')">Borrar</button>';		
			miTabla += '</tr>';
            subtotal = subtotal + precio * cantidad;
		}
        miTabla += '</tbody></table>';
	    $("#table-box2").append(miTabla);    
        let cuadroTexto=document.getElementById('textototal');
        cuadroTexto.innerText = 'TOTAL = ' + subtotal +' $';  

}

function registrarorden(){



    //capturar los datos que ingreso el usuario en la pagina
    let user1 = sessionStorage.getItem("user");
    let hoy = new Date(Date.now());
 

    let productos = {};
    let quantities ={};


    for (let i = 0; i < productosSeleccionados.length; i++) {
        productos[productosSeleccionados[i].reference]=productosSeleccionados[i]; 
        quantities[productosSeleccionados[i].reference]=cantidades[i];  
    }
    
    let datos={
        
       
        registerDay : hoy.toISOString(),
        status : "Pendiente",
        salesMan : JSON.parse(user1),
        products : productos,
        quantities : quantities,
    }

    let datosPeticion = JSON.stringify(datos)

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: "http://144.22.228.170/api/order/new",
        
        //envio datos capturados por el usuario a la peticion
        data: datosPeticion,

        //tipo de peticion
        type: 'POST',

        contentType: "application/JSON",

        //tipo de contenido
        dataType: 'json',

        //success: funcion con acciones si todo sale ok
        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            
                productosSeleccionados= [];
                cantidades= [];
        
            traerInformacion();
            console.log(respuesta);
            swal("Que bien!", "Orden generada! ", "success");
           
            $('#login2').hide(1000);


            
        },

        //error: funcion con acciones si hay error
        // código a ejecutar si la petición falla;
        // son pasados como argumentos a la función
        // el objeto de la petición en crudo y código de estatus de la petición
        error: function (xhr, status) {
            //$("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);		
            console.log("algo fallo");	
        },
        //complete: funcion con al final de la petición
        // código a ejecutar sin importar si la petición falló o no
        complete: function (xhr, status) {
            console.log("Todo super bien"  + status);
        }
    });

    


}

function eliminarRegistro(index){


    productosSeleccionados.splice(index, 1);
    cantidades.splice(index, 1);
    swal("Que bien!", "Borrado :)! ", "success");
    
    if( productosSeleccionados.length == 0){

        $('#login2').hide(1000);
       
    }
    traerInformacion();
}