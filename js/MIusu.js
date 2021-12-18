$(document).ready(function () {
    estadoInicial();
  
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
    $('#navusuariosASE2').hide();
    $('#navusuariosCOORD').hide();
   }else if(usuariojscript.type == "COORD"){
    $('#navusuarios').hide();
    $('#navusuarios2').hide();
    $('#navusuarios3').hide();
    $('#navusuariosASE').hide();
    $('#navusuariosASE2').hide();
   }
    traerInformacion(usuariojscript.id);
    $("#navbarDropdown2").html(usuariojscript.name + '<img src="logo/icon.png" height="40" alt="" loading="lazy">');
 
}

function traerInformacion(id){


	$.ajax({    
    url : 'http://144.22.228.170/api/user/'+id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#table-box").empty();
        let miTabla = '<table class="table"><thead><tr><th scope="col">Identificacion</th><th scope="col">Nombre</th><th scope="col">Correo</th><th scope="col">Tipo</th><th scope="col">Zona</th></tr></thead><tbody>';
		
			miTabla += '<tr>';
            miTabla += '<th scope="row">'+respuesta.identification+'</th>';       
	       		
	        miTabla += '<td>'+ respuesta.name+ '</td>'; 		
		
	        miTabla += '<td>'+ respuesta.email+ '</td>'; 
            let valortipo = "";
            if(respuesta.type == "ADM"){
                valortipo = "Administrador";
            }else if(respuesta.type == "COORD"){
                valortipo = "Coordinador de zona";
            }else{
                valortipo = "Asesor comercial";
            }
          
            miTabla += '<td>'+ valortipo+ '</td>'; 
            miTabla += '<td>'+ respuesta.zone+ '</td>'; 
	
			miTabla += '</tr>';
	
		
        miTabla += '</tbody></table>';
	    $("#table-box").append(miTabla);    
       //pintarSelect();
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema: '+ status);
    }
});
}