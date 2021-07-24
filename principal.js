 express = require('express');
 app = express();
function loginvalido(){
	var nome = document.getElementById('nome').value;
	var senha = document.getElementById('senha').value;


    
	if (nome == "admin" && senha == 12345){
       
		app.get('principal', async (request, response) => {
			response.render('principal')
		
		});      
	}
	else if((nome == "admin" && senha != 12345)){
		
           alert("Senha incorreta" )
           
           

           
	    }
         else {
            alert("Usuário inválido")
           
          


          
          
            
            
            
        }
        

    
}



