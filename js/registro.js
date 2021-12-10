/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de registrar
 */
 $(document).ready(function () {
    estadoInicial()
    
});

/**
 * Intenta autenticar al usuario en la aplicaciòn
 */
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
        url: "http://144.22.228.170/api/user/new",
        
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

function validarusuariodb(){
    //capturar los datos que ingreso el usuario en la pagina
    let email = $("#useremail").val()
    let password = $("#password").val()

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: "http://144.22.228.170/api/user/emailexist/"+ email,
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
            sessionStorage.removeItem("valorepo");
            sessionStorage.setItem("valorepo",respuesta);
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
    
    let valorepo = sessionStorage.getItem("valorepo");
    if (valorepo == "true"){
        
        sessionStorage.removeItem("valorepo");
       swal("ohh no!", "No fue posible crear su cuenta!\nya existe: " + email, "error");
       
    }
    else{
        sessionStorage.removeItem("valorepo");
        swal("Que bien!", "Cuenta creada, bienvenido : "+ id + " "+ nombre, "success");
        
        limpiarcampos();
    }
}

function estadoInicial(){
    $("#iduser").focus()
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);
   
    $("#navbarDropdown2").html(usuariojscript.name + '<img src="logo/icon.png" height="40" alt="" loading="lazy">');
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