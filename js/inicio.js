/**
 * Cargar la libreria de Jquery y ubicar el cursor en el campo de login
 */
 $(document).ready(function () {
  
    estadoInicial()
  
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
    swal("Que bien!", "Bienvenido! "+ usuariojscript.name, "success");



}


