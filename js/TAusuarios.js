$(document).ready(function () {
    estadoInicial();  
    traerInformacion();
   
});

function estadoInicial(){
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);
    if(user1 == null){
        location.href="login.html";
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
    url : 'http://144.22.228.170/api/user/all',
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#table-box").empty();
        let miTabla = '<table class="table"><thead><th scope="col">Identificacion</th><th scope="col">Nombre</th><th scope="col">Direccion</th><th scope="col">Celular</th><th scope="col">Correo</th><th scope="col">Contraseña</th><th scope="col">Zona</th><th scope="col">Tipo</th></tr></thead><tbody>';
		for (i=0; i<respuesta.length; i++){
			miTabla += '<tr>';
              
	        miTabla += '<td>'+ respuesta[i].identification+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].name+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].address+ '</td>'; 	
			miTabla += '<td>'+ respuesta[i].cellPhone+ '</td>'; 		
	        miTabla += '<td>'+ respuesta[i].email+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].password+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].zone+ '</td>'; 
            let valortipo = "";
            if(respuesta[i].type == "ADM"){
                valortipo = "Administrador";
            }else if(respuesta[i].type == "COORD"){
                valortipo = "Coordinador de zona";
            }else{
                valortipo = "Asesor comercial";
            }
            miTabla += '<td>'+ valortipo+ '</td>'; 
			miTabla += '<td><button onclick="editarRegistro('+respuesta[i].id+' )">Editar</button>';		
			miTabla += '<td><button onclick="eliminarRegistro('+respuesta[i].id+' )">Borrar</button>';		
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

function editarRegistro (id){
    let iduser = document.getElementById("iduser");
    
    iduser.disabled = true;


	$.ajax({    
    url : 'http://144.22.228.170/api/user/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);


        $("#iduser").val(respuesta.id);
        $("#identiuser").val(respuesta.identification);
        $("#username").val(respuesta.name);
        $("#direcuser").val(respuesta.address);
        $("#celuuser").val(respuesta.cellPhone);
        $("#useremail").val(respuesta.email);
        $("#password").val(respuesta.password);
        $("#zonauser").val(respuesta.zone);
        $("#tipouser").val(respuesta.type);
        $("#passwordrepeat").val(respuesta.password);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema:'+ status);
    }
});
}

function registrar(){
    //capturar los datos que ingreso el usuario en la pagina
  
    validarusuariodb();

    if(validarClave() && validarEmail() &&(($("#useremail").val() != "") 
    && ($("#username").val() != "") && ($("#iduser").val() != "") && ($("#identiuser").val() != "")
     && ($("#direcuser").val() != "") && ($("#celuser").val() != "") && ($("#zonauser").val() != "") )){

       
    let datos={
        
        id : $("#iduser").val(),
        identification : $("#identiuser").val(),
        name : $("#username").val(),
        address : $("#direcuser").val(),
        cellPhone : $("#celuuser").val(),
        email : $("#useremail").val(),
        password : $("#password").val(),
        zone : $("#zonauser").val(),
        type : $("#tipouser").val()
    }

    let datosPeticion = JSON.stringify(datos)

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: "http://144.22.228.170/api/user/update",
        
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

function validarusuariodb(){
    //capturar los datos que ingreso el usuario en la pagina
    let id = $("#iduser").val()
   
    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: 'http://144.22.228.170/api/user/'+id,
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
            let userup ={

                id : respuesta.id,
                identification : respuesta.identification,
                name : respuesta.name,
                address : respuesta.address,
                cellPhone : respuesta.cellPhone,
                email : respuesta.email,
                password : respuesta.password,
                zone : respuesta.zone,
                type : respuesta.type
        
            }
            sessionStorage.removeItem("userup");
            sessionStorage.setItem("userup",JSON.stringify(userup));
           
     
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
    let id = respuesta.id
    let nombre= respuesta.name
    let email= respuesta.email
    let comprueba = false;
    validarusuariodb();
    let userup = sessionStorage.getItem("userup");
    let userupjscript = JSON.parse(userup);
    if(
    $("#iduser").val() == userupjscript.id &&
    $("#identiuser").val() == userupjscript.identification &&
    $("#username").val() == userupjscript.name &&
    $("#direcuser").val() == userupjscript.address &&
    $("#celuuser").val() == userupjscript.cellPhone &&
    $("#useremail").val() == userupjscript.email &&
    $("#password").val() == userupjscript.password &&
    $("#zonauser").val() == userupjscript.zone &&
    $("#tipouser").val() == userupjscript.type
    ){
        comprueba = true;
    }else{
        comprueba = false;
    }


    if (comprueba == false){
        
        sessionStorage.removeItem("userup");
       swal("ohh no!", "No fue posible editar esta cuenta! ", "error");
       
    }
    else{
        sessionStorage.removeItem("userup");
        swal("Que bien!", "Cuenta actualizada : "+ id + " "+ nombre, "success");
        traerInformacion()
        limpiarcampos();

        let iduser = document.getElementById("iduser");
        
        iduser.disabled = false;
       
    }
}


function validarClave(){
    
  let Password = $("#password").val()
  let passwordrepeat = $("#passwordrepeat").val()
 
  var div1 = document.querySelector("#ok");
  var div2 = document.querySelector("#error");


   if(Password == passwordrepeat && Password != "" && passwordrepeat != ""){
 
     div2.style.display = 'none';
    div1.style.display = 'block';

  
     return true
   }else{
    
    div2.style.display = 'block';
    div1.style.display = 'none';
     return false
   }

}

function validarEmail(){

    let texto = $("#useremail").val();
    let regex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    
    if (!regex.test(texto)) {
        swal("Correo invalido!", "Ingrese un correo en valido!\nEjemplo: name@example.com: ", "error");
        return false;
    } else {
     return true;
    }
  
}

function limpiarcampos(){

    $("#iduser").val("");
    $("#identiuser").val("");
    $("#username").val("");
    $("#direcuser").val("");
    $("#celuuser").val("");
    $("#useremail").val("");
    $("#password").val("");
    $("#zonauser").val("");
    $("#passwordrepeat").val("");
    
}

function eliminarRegistro(id){
	$.ajax({    
        url : 'http://144.22.228.170/api/user/'+id,
        type : 'DELETE',
        dataType : 'json',
        contentType: "application/json; charset=utf-8",
  
        success: function (respuesta) {
            //escribe en la consola del desarrollador para efectos de depuración
            console.log(respuesta);
            swal("Que bien!", "Cuenta eliminada  ", "success");
            traerInformacion();
        },
	});
    
}