$(document).ready(function () {
    estadoInicial();
    traerInformacion();
});

function estadoInicial(){
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);
    if(user1 == null){
        location.href="index.html";
    }else if(usuariojscript.type == "ASE"){
  
    $('#navusuarios').hide();
    $('#navusuarios2').hide();
    $('#navusuarios3').hide();
    $('#navusuariosCOORD').hide();
   }else if(usuariojscript.type == "ADM"){
    $('#navusuariosASE').hide();
    $('#navusuariosCOORD').hide();
   }else if(usuariojscript.type == "COORD"){
    $('#navusuarios').hide();
    $('#navusuarios2').hide();
    $('#navusuarios3').hide();
    $('#navusuariosASE').hide();
   }
    $("#navbarDropdown2").html(usuariojscript.name + '<img src="logo/icon.png" height="40" alt="" loading="lazy">');

}

function traerInformacion(){
	$.ajax({    
    url : 'http://localhost/api/accessory/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#table-box").empty();

        let miTabla = '<table class="table"><thead><tr><th scope="col">Referencia</th><th scope="col">Marca</th><th scope="col">Categoria</th><th scope="col">Material</th><th scope="col">Descripcion</th><th scope="col">Disponibilidad</th><th scope="col">Precio</th><th scope="col">Cantidad</th><th scope="col">Fotografia</th></tr></thead><tbody>';
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
            miTabla += '<th scope="row">'+respuesta[i].reference+'</th>';       
	        miTabla += '<td>'+ respuesta[i].brand+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].category+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].material+ '</td>'; 	
			miTabla += '<td>'+ respuesta[i].description+ '</td>'; 
            let disponibilidad = false;
            if(respuesta[i].availability == true){
                disponibilidad = "SI";
            }else{
                disponibilidad = "NO";
            }		
	        miTabla += '<td>'+ disponibilidad+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].price+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].quantity+ '</td>'; 
            miTabla += '<td><img src="'+respuesta[i].photography+'" height="60" alt="" loading="lazy" /></td>'; 


			miTabla += '<td><button onclick="editarRegistro(\''+respuesta[i].reference+'\')">Editar</button>';		
			miTabla += '<td><button onclick="eliminarRegistro(\''+respuesta[i].reference+'\')">Borrar</button>';		
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

function editarRegistro (ididreference){
    let idreference = document.getElementById("POreference");
    
    idreference.disabled = true;
	$.ajax({    
    url : 'http://localhost/api/accessory/'+ididreference,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);

        $("#POreference").val(respuesta.reference);
        $("#PObrand").val(respuesta.brand);
        $("#POcategory").val(respuesta.category);
        $("#Pomaterial").val(respuesta.material);
        $("#Podescription").val(respuesta.description);
        $("#POprice").val(respuesta.price);
        $("#POquantity").val(respuesta.quantity);
        $("#POphotography").val(respuesta.photography);
        let disponibilidad = false;
        if(respuesta.availability == true){
            disponibilidad = "true";
        }else{
            disponibilidad = "false";
        }	
        $("#POavailability").val(disponibilidad);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function registrar(){
    //capturar los datos que ingreso el usuario en la pagina
  

    if(($("#POreference").val() != "") 
    && ($("#PObrand").val() != "") && ($("#POcategory").val() != "") && ($("#Pomaterial").val() != "")
     && ($("#POprice").val() != "") && ($("#POquantity").val() != "") && ($("#Podescription").val() != "") 
     && ($("#POphotography").val() != "") ){

       
    let datos={
        
        reference : $("#POreference").val(),
        brand : $("#PObrand").val(),
        category : $("#POcategory").val(),
        material : $("#Pomaterial").val(),
        description : $("#Podescription").val(),
        availability : $("#POavailability").val(),
        price : $("#POprice").val(),
        quantity : $("#POquantity").val(),
       photography : $("#POphotography").val()
    }

    let datosPeticion = JSON.stringify(datos)

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: "http://localhost/api/accessory/update",
        
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
            
            console.log(respuesta);
            
            resultado(respuesta);
            
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


}



function validarPO(){
    //capturar los datos que ingreso el usuario en la pagina
    let referencia = $("#POreference").val()
    

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: "http://localhost/api/accessory/"+ referencia,
        //tipo de peticion
        type: 'GET',
        async: false,
        //tipo de contenido
        dataType: 'json',

        //envio datos capturados por el usuario a la peticion
        
        //success: funcion con acciones si todo sale ok
        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);
            let POre ={

                reference : respuesta.reference,
                brand : respuesta.brand,
                category : respuesta.category,
                material : respuesta.material,
                description : respuesta.description,
                availability : respuesta.availability,
                price : respuesta.price,
                quantity : respuesta.quantity,
               photography : respuesta.photography
        
            }
            sessionStorage.removeItem("valorepoPO");
            sessionStorage.setItem("valorepoPO",JSON.stringify(POre));

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



function resultado(respuesta){
    let id = respuesta.reference

    validarPO();

    let valorepoPO = sessionStorage.getItem("valorepoPO");
    let userupjscript = JSON.parse(valorepoPO);
    if (userupjscript.reference == null){
        
        sessionStorage.removeItem("valorepoPO");
       swal("ohh no!", "No fue posible actualizar este producto!", "error");
       
    }
    else{
        sessionStorage.removeItem("valorepoPO");
        swal("Que bien!", "Producto actualizado : "+ id, "success");
        
        limpiarcampos();
        traerInformacion();
        let idreference = document.getElementById("POreference");
    
        idreference.disabled = false;
    }
}



function limpiarcampos(){

    $("#POreference").val("");
    $("#PObrand").val("");
    $("#POcategory").val("");
    $("#Pomaterial").val("");
    $("#Podescription").val("");
    $("#POprice").val("");
    $("#POquantity").val("");
    $("#POphotography").val("");
   
}

function eliminarRegistro(reference){
	$.ajax({    
        url : 'http://localhost/api/accessory/'+reference,
        type : 'DELETE',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
  
        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);
            swal("Que bien!", "Producto eliminado : ", "success");
            traerInformacion();
        },
	});
    
}