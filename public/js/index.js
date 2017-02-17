/**
 * New node file
 */
$( document ).ready(function() {
 
    $('h1').css('color','#FF0000');
    $('.llenar').append('<p>Hola</p>');
    $.ajax({
    	  url: '/users',
    	  method: 'POST',
    	  contentType: 'application/json',
    	  data:JSON.stringify({"nombre":"David","correo":"elcorreo"}),
    	  success: function(data){
    		  if(data!=null){
    			  $('.llenar').append('<span>REgistro exitoso</span>');
    		  }else{
    			  
    		  }
    	  },
    	  dataType: 'text'
    	});
 
});