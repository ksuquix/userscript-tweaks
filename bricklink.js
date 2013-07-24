// ==UserScript==
// @name           Bricklink Tweaks
// @namespace      https://github.com/ksuquix/userscript-tweaks
// @version        0.0.10
// @description    Add tweaks / features to bricklink
// @include        http://www.bricklink.com/*
// @require        http://code.jquery.com/jquery-1.10.2.min.js
// @run-at         document-end
// ==/UserScript==

// Chrome extensions are sandboxed.   This lets me use jQuery from Console
$('title').after('<script type="text/javascript" language="javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>');

// On Part catalog entry, add an "(Add)" link next to price guide that goes into inventory add dialog with
//    part and color set
if(window.location.pathname.indexOf('catalogItem.asp')) { 
    $('a[href*=catalogPG\\.asp\\?]').each(function() {
	url = $(this).attr('href').
	    replace(/catalogPG.asp\?P=/,'inventory_add.asp?a=p&itemID=').
	    replace(/colorID=/,'p_color=');
	$(this).after('&nbsp;<a href="'+url+'">(Add)</a>');
    });
}

// If inventory page, automatically trigger the price guide ajax pull
// also set a click rule on condition (new/used) to set it to the average value (new or used)
// also sets percentage to 10
// then focus to quantity
if(window.location.pathname.indexOf('inventory_add.asp')) { 
    ajaxGet('priceGuideSummary.asp?a=p&vcID=1&vatInc=N&ajView=Y&colorID='+document.getElementById('p_color').value+'&itemID='+window.document.cascade.elements['p_selecteditemID'].value,getPg,'Y',errPg);
    $('input:radio[name=invNew]').click(function() {
	avgn = $('table.ta tbody tr:eq(2) td:eq(4)').text().replace(/US \$/,'');
	avgu = $('table.ta tbody tr:eq(3) td:eq(4)').text().replace(/US \$/,'');
	if($('input:radio[name=invNew]:checked').val()=='N') {
	    $('input[name=p_price]').val(avgn);
	}
	if($('input:radio[name=invNew]:checked').val()=='U') {
	    $('input[name=p_price]').val(avgu);
	}
    });
    $('input[name=invSale]').val(10);
    $('input:radio[name=invNew]').focus();
    $('input[name=p_quantity]').focus();
}

// add change percentage for whole screen
$('title').after('<script type="text/javascript" language="javascript" src="https://raw.github.com/ksuquix/userscript-tweaks/master/bricklink-subinclude.js"></script>');

if(window.location.pathname.indexOf('inventory_detail.asp')>0) {
	  $('input[value="Submit Changes"]').after('<input type="text" name="quixblpercentages" id="quixblpercentages" value="" size="4" onchange="quixblsetpercentages();">');
}

