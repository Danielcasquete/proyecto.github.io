$(document).ready(function () {
    $('#login2').hide();
    estadoInicial();
  
});

function estadoInicial(){
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);
    if(user1 == null){
        location.href="index.html";
    }
    traerInformacion();
    $("#navbarDropdown2").html(usuariojscript.name + '<img src="logo/icon.png" height="40" alt="" loading="lazy">');

}

function traerInformacion(){
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);

	$.ajax({    
    url : 'http://144.22.228.170/api/order/zona/'+usuariojscript.zone,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#table-box").empty();
        let miTabla = '<table class="table"><thead><tr><th scope="col">Identificacion</th><th scope="col">Nombre</th><th scope="col">Correo</th><th  scope="col">fecha</th><th scope="col">N°_Pedido</th><th scope="col">Estado</th></tr></thead><tbody>';
 
        
        for (i=0; i<respuesta.length; i++){
         
		
			miTabla += '<tr>';
            miTabla += '<th scope="row">'+respuesta[i].salesMan.identification+'</th>';       
	       		
	        miTabla += '<td>'+ respuesta[i].salesMan.name+ '</td>'; 		
		
	        miTabla += '<td>'+ respuesta[i].salesMan.email+ '</td>'; 

            let fecha =  new Date (respuesta[i].registerDay);

            miTabla += '<td>'+ fecha.toUTCString()+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].id+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].status+ '</td>'; 
            miTabla += '<td><button onclick="verorden('+respuesta[i].id+')">Ver pedido</button>';	
			miTabla += '</tr>';
            
        }
        miTabla += '</tbody></table>';
	    $("#table-box").append(miTabla);    
       //pintarSelect();
      
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema: '+ status);
    }
});
}

function verorden(id){


	$.ajax({    
    url : 'http://144.22.228.170/api/order/'+ id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#table-box2").empty();
        let miTabla = '<table class="table"><thead><tr><th scope="col">Fecha</th><th scope="col">N°_Pedido</th><th scope="col">Estado</th><th scope="col">Cambiar_Estado</th><th scope="col">Guardar</th></tr></thead><tbody>';
		
    
   
			miTabla += '<tr>';
            let fecha =  new Date (respuesta.registerDay);
            miTabla += '<td>'+fecha.toUTCString()+'</td>';       
	     
            miTabla += '<td>'+ respuesta.id+ '</td>'; 
            miTabla += '<td>'+ respuesta.status+ '</td>'; 

            if(respuesta.status == "Pendiente"){
                miTabla += '<td><div class="col form-floating"><select class="form-select" id="ACestado" name="select"><option selected value="Pendiente">Pendiente</option><option value="Aprobada">Aprobada</option><option value="Rechazada">Rechazada</option></select><label for="tipouser" class="form-label">(escoge una):</label></div></td>'; 
            } else if(respuesta.status == "Aprobada"){
                miTabla += '<td><div class="col form-floating"><select class="form-select" id="ACestado" name="select"><option value="Pendiente">Pendiente</option><option  selected value="Aprobada">Aprobada</option><option value="Rechazada">Rechazada</option></select><label for="tipouser" class="form-label">(escoge una):</label></div></td>'; 
            
            }else if (respuesta.status == "Rechazada"){
                miTabla += '<td><div class="col form-floating"><select class="form-select" id="ACestado" name="select"><option value="Pendiente">Pendiente</option><option value="Aprobada">Aprobada</option><option selected value="Rechazada">Rechazada</option></select><label for="tipouser" class="form-label">(escoge una):</label></div></td>'; 
            
            }
           
            miTabla += '<td><button onclick="ORactualizar('+respuesta.id+')">Guardar</button>';	
			miTabla += '</tr>';
	
        
        miTabla += '</tbody></table>';
	    $("#table-box2").append(miTabla);    
       //pintarSelect();
       $('#login2').show(1000);
       POorden(respuesta.products,respuesta.quantities);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema: '+ status);
    }
});


}

function POorden(products,quantities){


    
		console.log(products);
		$("#table-box3").empty();
        let miTabla = '<table class="table"><thead><tr><th scope="col">Foto</th><th scope="col">Nombre</th><th scope="col">Categoria</th><th scope="col">Descripcion</th><th scope="col">Precio</th><th scope="col">Cantidad</th><th scope="col">Stock</th></tr></thead><tbody>';
		
        let recorrer  = Object.keys(products);
        let recorrer2  = Object.keys(quantities);
        for (i=0; i<recorrer.length; i++){
   
			miTabla += '<tr>'; 

	        let valorobjeto = products[recorrer[i]];
            let valorobjeto2 = quantities[recorrer2[i]];

            miTabla += '<td><img src="'+valorobjeto.photography+'" height="60" alt="" loading="lazy" /></td>'; 
        
            miTabla += '<td>'+ valorobjeto.brand+ '</td>'; 
            miTabla += '<td>'+ valorobjeto.category+ '</td>'; 
            miTabla += '<td>'+ valorobjeto.description+ '</td>'; 
            miTabla += '<td>'+ valorobjeto.price+ '</td>'; 
            miTabla += '<td>'+ valorobjeto2+ '</td>';
            miTabla += '<td>'+ valorobjeto.quantity+ '</td>';
     	
			miTabla += '</tr>';
	
        }
        miTabla += '</tbody></table>';
	    $("#table-box3").append(miTabla);    
       //pintarSelect();
       

}

function ORactualizar(id){
    //capturar los datos que ingreso el usuario en la pagina
  
    let datos={
        
        id : id,
        status : $("#ACestado").val()
    }

    let datosPeticion = JSON.stringify(datos)

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: "http://144.22.228.170/api/order/update",
        
        //envio datos capturados por el usuario a la peticion
        data: datosPeticion,

        //tipo de peticion
        type: 'PUT',

        contentType: "application/JSON",

        //tipo de contenido
        dataType: 'json',

        //success: funcion con acciones si todo sale ok
        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            traerInformacion();
            console.log(respuesta);
            verorden(respuesta.id);
            swal("Que bien!", "Estado actualizado  ", "success");
            
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