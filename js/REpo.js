/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de registrar
 */
 $(document).ready(function () {
    estadoInicial()
    
});

function estadoInicial(){
    $("#iduser").focus()
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

/**
 * Intenta autenticar al usuario en la aplicaciòn
 */
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
        url: "http://144.22.228.170/api/accessory/new",
        
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
        url: "http://144.22.228.170/api/accessory/"+ referencia,
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
       swal("ohh no!", "No fue posible agregar este producto!", "error");
       
    }
    else{
        sessionStorage.removeItem("valorepoPO");
        swal("Que bien!", "Producto agregado : "+ id, "success");
        
        limpiarcampos();
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