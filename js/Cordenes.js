$(document).ready(function () {
    $('#login2').hide();
    $('#login3').hide();
    $('#login4').hide();
    
    estadoInicial();
  
});

function estadoInicial(){
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);
    if(user1 == null){
        location.href="index.html";
    }
    
    $("#navbarDropdown2").html(usuariojscript.name + '<img src="logo/icon.png" height="40" alt="" loading="lazy">');

}

function traerInformacion(){
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);
    $('#valoresorden').hide(1000); 
    
    $('#login3').hide();
    $('#login4').hide();
	$.ajax({    
    url : 'http://localhost/api/order/salesman/'+usuariojscript.id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#table-box2").empty();
        let miTabla = '<table class="table"><thead><tr><th  scope="col">fecha</th><th scope="col">N°_Pedido</th><th scope="col">Estado</th></tr></thead><tbody>';
 
        
        for (i=0; i<respuesta.length; i++){
         
		
			miTabla += '<tr>';


            let fecha =  new Date (respuesta[i].registerDay);

            miTabla += '<td>'+ fecha.toLocaleString()+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].id+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].status+ '</td>'; 
            miTabla += '<td><button onclick="verorden('+respuesta[i].id+')">Ver pedido</button>';	
			miTabla += '</tr>';
            
        }
        miTabla += '</tbody></table>';
	    $("#table-box2").append(miTabla);    
       //pintarSelect();
       $('#login2').show(1000);

	},
    error : function(xhr, status) {
        alert('ha sucedido un problema: '+ status);
    }
});
}

//ver orden por estado

function traerInformacionporestado(){
    $('#log3valoresorden').hide(1000); 
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);
    
    $("#log3table-box2").hide(500);  
    $('#login2').hide();
    
    $('#login4').hide();
    let zonasearch = $('#log3ACestado').val();
    
	$.ajax({    
    url : 'http://localhost/api/order/state/'+zonasearch+'/'+usuariojscript.id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#log3table-box2").empty();


        let miTabla = '<table class="table"><thead>    <tr><th  scope="col">fecha</th><th scope="col">N°_Pedido</th><th scope="col">Estado</th></tr></thead><tbody>';
 
        
        for (i=0; i<respuesta.length; i++){
         
		
			miTabla += '<tr>';


            let fecha =  new Date (respuesta[i].registerDay);

            miTabla += '<td>'+ fecha.toLocaleString()+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].id+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].status+ '</td>'; 
            miTabla += '<td><button onclick="verorden('+respuesta[i].id+')">Ver pedido</button>';	
			miTabla += '</tr>';
            
        }
        miTabla += '</tbody></table>';
	    $("#log3table-box2").append(miTabla); 
        $("#log3table-box2").show(500);    
       //pintarSelect();
       $('#login3').show(1000);
      
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema: '+ status);
    }
});
}

//traer informacion por fecha

function traerInformacionporfecha(){
    $('#log3valoresorden').hide(1000); 
    $('#log4valoresorden').hide(1000); 
    let user1 = sessionStorage.getItem("user");
    let usuariojscript = JSON.parse(user1);
    let urlenvi;

    $("#log3table-box2").hide(500);  
    $("#log4table-box2").hide(500); 
    $('#login2').hide();
    $('#login3').hide();
    


    let fechasearch = $('#dateorden').val();

    if(fechasearch == ""){
        urlenvi = 'http://localhost/api/order/salesman/'+usuariojscript.id;

    }else{
        urlenvi = 'http://localhost/api/order/date/'+fechasearch+'/'+usuariojscript.id;
    }
    
	$.ajax({    
    url : urlenvi,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#log4table-box2").empty();


        let miTabla = '<table class="table"><thead>    <tr><th  scope="col">fecha</th><th scope="col">N°_Pedido</th><th scope="col">Estado</th></tr></thead><tbody>';
 
        
        for (i=0; i<respuesta.length; i++){
         
		
			miTabla += '<tr>';


            let fecha =  new Date (respuesta[i].registerDay);

            miTabla += '<td>'+ fecha.toLocaleString()+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].id+ '</td>'; 
            miTabla += '<td>'+ respuesta[i].status+ '</td>'; 
            miTabla += '<td><button onclick="verorden('+respuesta[i].id+')">Ver pedido</button>';	
			miTabla += '</tr>';
            
        }
        miTabla += '</tbody></table>';
	    $("#log4table-box2").append(miTabla); 
        $("#log4table-box2").show(500);    
       //pintarSelect();
       $('#login4').show(1000);
      
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema: '+ status);
    }
});
}










function verorden(id){
    $('#valoresorden').hide(600); 
    $('#valoresorden').show(600); 

    $('#log3valoresorden').hide(600); 
    $('#log3valoresorden').show(600); 

    $('#log4valoresorden').hide(600); 
    $('#log4valoresorden').show(600); 

	$.ajax({    
    url : 'http://localhost/api/order/'+ id,
    type : 'GET',
    dataType : 'json',
    contentType: "application/json; charset=utf-8",
  
    success : function(respuesta) {
		console.log(respuesta);
		$("#table-box3").empty();
        $("#log3table-box3").empty();  
        $("#log4table-box3").empty(); 
        let miTabla = '<table class="table"><thead><tr><th scope="col">Fecha</th><th scope="col">N°_Pedido</th><th scope="col">Estado</th></tr></thead><tbody>';
		
    
   
			miTabla += '<tr>';
            let fecha =  new Date (respuesta.registerDay);
            miTabla += '<td>'+fecha.toLocaleString()+'</td>';       
	     
            miTabla += '<td>'+ respuesta.id+ '</td>'; 
            miTabla += '<td>'+ respuesta.status+ '</td>'; 


			miTabla += '</tr>';
	
        
        miTabla += '</tbody></table>';
	    $("#table-box3").append(miTabla);   
        $("#log3table-box3").append(miTabla);  
        $("#log4table-box3").append(miTabla);
       //pintarSelect();
       
       POorden(respuesta.products,respuesta.quantities);
	},
    error : function(xhr, status) {
        alert('ha sucedido un problema: '+ status);
    }
});


}

function POorden(products,quantities){


    
		console.log(products);
		$("#table-box4").empty();
        $("#log3table-box4").empty();
        $("#log4table-box4").empty();
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
	    $("#table-box4").append(miTabla);   
        $("#log3table-box4").append(miTabla);   
        $("#log4table-box4").append(miTabla); 
       //pintarSelect();
       

}



