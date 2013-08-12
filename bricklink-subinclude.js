function quixblsetpercentages() { 
	var inputs = document.getElementsByTagName('input'); 
    var val = $('input[type=text]#quixblpercentages').val(); 
	for(var i = 0; i < inputs.length; i++) {    
        if(inputs[i].name.indexOf('newInvSale') == 0) {       
            inputs[i].value = val;    
        } 
    } 
} 

function quixblsetpercentagespartout() { 
	var inputs = document.getElementsByTagName('input'); 
    var val = $('input[type=text]#quixblpercentages').val(); 
	for(var i = 0; i < inputs.length; i++) {    
        if(inputs[i].name.indexOf('nS') == 0) {       
            inputs[i].value = val;    
        } 
    } 
} 

function quixblpriceguideavgset() {
    avgn = '';
    avgu = '';
    if($('table.ta tbody tr:eq(2) td:eq(0)').text().match(/new:/i)) {
	avgn = $('table.ta tbody tr:eq(2) td:eq(4)').text().replace(/US \$/,'');
	avgu = $('table.ta tbody tr:eq(3) td:eq(4)').text().replace(/US \$/,'');
    } else if($('table.ta tbody tr:eq(2) td:eq(0)').text().match(/used:/i)) {
	avgu = $('table.ta tbody tr:eq(2) td:eq(4)').text().replace(/US \$/,'');
    }
    if($('input:radio[name=invNew]:checked').val()=='N') {
	$('input[name=p_price]').val(avgn);
    }
    if($('input:radio[name=invNew]:checked').val()=='U') {
	$('input[name=p_price]').val(avgu);
    }
}
