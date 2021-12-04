/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de login
 */
 $(document).ready(function () {
    estadoInicial()
});

/**
 * Intenta autenticar al usuario en la aplicaciòn
 */
function login(){
    //capturar los datos que ingreso el usuario en la pagina
    let email = $("#useremail").val()
    let password = $("#password").val()

    //utilizo la funcion de JQuery $.ajax para hacer un llamado asincrono
    //a un ws
    $.ajax({
        //url del servicio
        url: "http://144.22.228.170/api/user/"+ email + "/" + password,
        //tipo de peticion
        type: 'GET',

        //tipo de contenido
        dataType: 'json',

        //envio datos capturados por el usuario a la peticion

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

/**
 * valida si en el id viene un dato nulo, o viene el codigo del usuario
 * 
 * Configura mensaje de bienvenida o de error según el caso
 */
function resultado(respuesta){
    let id = respuesta.id
    let nombre= respuesta.name

    if (id==null){
     
        swal("ohh no!", "Este ususario no esta registrado!\no la contraseña es incorrecta", "error");
       
    }
    else{
        
       
        swal("Que bien!", "Bienvenido! "+ id + " "+ nombre, "success");
        limpiarcampos();
    }
}

function estadoInicial(){
    $("#useremail").focus()
}

function limpiarcampos(){
    $("#useremail").val("");
    $("#password").val("");
}
