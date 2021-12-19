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

    if(valor == "precio"){

        urlenvi = 'http://144.22.228.170/api/accessory/price/'+$("#imprice").val();

        if($("#imprice").val() == ""){
            urlenvi = 'http://144.22.228.170/api/accessory/all';
        }



    }else if(valor == "descrip"){
        urlenvi = 'http://144.22.228.170/api/accessory/description/'+$("#imdescrip").val();

        if($("#imdescrip").val() == ""){
            urlenvi = 'http://144.22.228.170/api/accessory/all';
        }
    }else{
        urlenvi = 'http://144.22.228.170/api/accessory/all';
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
          
            miTarjeta += '<img src="'+ respuesta[i].photography +'" class="card-img-top" alt="...">'
            miTarjeta += '<div class="card-body">'
            miTarjeta += ' <h5 class="card-title">'+respuesta[i].brand+'</h5>'
            miTarjeta += '<p class="card-text">'+respuesta[i].description+'</p></div>'
            miTarjeta += '<ul class="list-group list-group-flush">'
            miTarjeta += '<li class="list-group-item">Material: '+respuesta[i].material+'</li>'
            miTarjeta += '<li class="list-group-item">Precio: '+respuesta[i].price+'</li>'
            miTarjeta += '<li class="list-group-item">Stock: '+respuesta[i].quantity+'</li>'
            if(respuesta[i].availability == true){
                disponibilidad = "SI";
            }else{
                disponibilidad = "NO";
            }	
            miTarjeta += '<li class="list-group-item">Disponible: '+disponibilidad+'</li>'
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