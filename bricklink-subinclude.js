function quixblsetpercentages() { 
	var inputs = document.getElementsByTagName('input'); 
    var val = $('input[type=text]#quixblpercentages').val(); 
	for(var i = 0; i < inputs.length; i++) {    
        if(inputs[i].name.indexOf('newInvSale') == 0) {       
            inputs[i].value = val;    
        } 
    } 
} 
