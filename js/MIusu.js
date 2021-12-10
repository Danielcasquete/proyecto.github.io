$(document).ready(function () {
    estadoInicial();
  
});

function estadoInicial(){
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);
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
        let miTabla = '<table class="table"><thead><tr><th scope="col">id</th><th scope="col">Nombre</th><th scope="col">Correo</th><th scope="col">Tipo</th></tr></thead><tbody>';
		
			miTabla += '<tr>';
            miTabla += '<th scope="row">'+respuesta.id+'</th>';       
	       		
	        miTabla += '<td>'+ respuesta.name+ '</td>'; 		
		
	        miTabla += '<td>'+ respuesta.email+ '</td>'; 
        
          
            miTabla += '<td>'+ respuesta.type+ '</td>'; 
	
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