/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de login
 */
 $(document).ready(function () {
    estadoInicial()
});

function estadoInicial(){

    let user1 = sessionStorage.getItem("user");
    let sabersi = sessionStorage.getItem("sabersi");
    
    let usuariojscript = JSON.parse(user1);
    if(sabersi != null && user1 != null){
        swal("Que bien!", "Bienvenido : "+usuariojscript.name, "success");
        sessionStorage.removeItem("sabersi");
    }

    if(user1 == null){
        $('#navusuarios').hide();
        $('#navusuarios2').hide();
        $('#navusuarios3').hide();
        $('#navusuariosASE').hide();
        $('#navusuariosASE2').hide();
        $('#navlogueado').hide();
        $('#navusuariosCOORD').hide();
        $('#navcumpleaños').hide();
        traerInformacion("todos");
       
        
    }else if(usuariojscript.type == "ASE"){
  
    $('#navusuarios').hide();
    $('#navusuarios2').hide();
    $('#navusuarios3').hide();
    $('#navusuariosCOORD').hide();
    $('#navinicios').hide();
    $("#navbarDropdown2").html(usuariojscript.name + '<img src="logo/icon.png" height="40" alt="" loading="lazy">');

   }else if(usuariojscript.type == "ADM"){
    $('#navusuariosASE').hide();
    $('#navusuariosASE2').hide();
    $('#navusuariosCOORD').hide();
    $('#navinicios').hide();
    $("#navbarDropdown2").html(usuariojscript.name + '<img src="logo/icon.png" height="40" alt="" loading="lazy">');

   }else if(usuariojscript.type == "COORD"){
    $('#navusuarios').hide();
    $('#navusuarios2').hide();
    $('#navusuarios3').hide();
    $('#navusuariosASE').hide();
    $('#navusuariosASE2').hide();
    $('#navinicios').hide();
    $("#navbarDropdown2").html(usuariojscript.name + '<img src="logo/icon.png" height="40" alt="" loading="lazy">');

   }


    traerInformacion("todos");
    
}

function traerInformacion(valor){

    $("#tarjetas").hide(500);

    let cumples = Number($("#imcumple").val())
    if(cumples != 12 && cumples != 11 && cumples != 10){
        cumples = '0' + cumples ;
    }


    if(valor == "cumple"){

        urlenvi = 'http://144.22.228.170/api/user/birthday/'+cumples;

        if($("#imcumple").val() == ""){
            urlenvi = 'http://144.22.228.170/api/user/all';
        }

    }else{
        urlenvi = 'http://144.22.228.170/api/user/all';
    }


	$.ajax({    
    url : urlenvi,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#tarjetas").empty();

        let miTarjeta ='';
        for (i=0; i<respuesta.length; i++){

            miTarjeta += '<div class="col"><div class="card h-100">'
          
            miTarjeta += '<img src="logo/logoc.png" class="card-img-top" alt="...">'
            miTarjeta += '<div class="card-body">'
            miTarjeta += ' <h5 class="card-title">'+respuesta[i].name+'</h5>'
            miTarjeta += '<p class="card-text">'+respuesta[i].email+'</p></div>'
            miTarjeta += '<ul class="list-group list-group-flush">'

            let fecha =  new Date (respuesta[i].birthtDay);
            const months = ["ENE", "FEB", "MAR","ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DiC"];
    

            miTarjeta += '<li class="list-group-item">Cumpleaños: '+fecha.getDate() + "-" + months[fecha.getMonth()]+'</li>'
            miTarjeta += '<li class="list-group-item">Zona: '+respuesta[i].zone+'</li>'
            miTarjeta += '</ul></div></div>'
		}
	    $("#tarjetas").html(miTarjeta);   
        $("#tarjetas").show(500); 
       //pintarSelect();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema: '+ status);
    }
});
}