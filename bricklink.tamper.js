// ==UserScript==
// @name           Bricklink Tweaks
// @namespace      https://github.com/ksuquix/userscript-tweaks
// @version        0.0.13
// @description    Add tweaks / features to bricklink
// @include        http://www.bricklink.com/*
// @require        http://code.jquery.com/jquery-1.10.2.min.js
// @run-at         document-end
// ==/UserScript==

// Chrome extensions are sandboxed.   This lets me use jQuery from Console
$('title').after('<script type="text/javascript" language="javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>');

// On Part catalog entry, add an "(Add)" link next to price guide that goes into inventory add dialog with
//    part and color set
if(window.location.pathname.indexOf('catalogItem.asp')>0) { 
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
if(window.location.pathname.indexOf('inventory_add.asp')>0) { 
    // function to set values
    $('input:radio[name=invNew]').click(function() { quixblpriceguideavgset(); });
    $('input[name=invSale]').val(10);
    $('input:radio[name=invNew]').focus(); // focus down the screen first, so we can focus up and get interesting stuff in the screen
    if($('select#p_color').val()>0) {   // only query ajax if color set
	ajaxGet('priceGuideSummary.asp?a=p&vcID=1&vatInc=N&ajView=Y&colorID='+document.getElementById('p_color').value+'&itemID='+window.document.cascade.elements['p_selecteditemID'].value,getPg,'Y',errPg);
	$('input[name=p_quantity]').focus();
    } else {
//	window.setTimeout(function() {
//  this gets toasted and rewritten, grr
	    $('select#p_color').focus();
	    $('select#p_color').select();
//	}, 300);
    }
    // reload ajax when color changes
    $('select#p_color').change(function() {ajaxGet('priceGuideSummary.asp?a=p&vcID=1&vatInc=N&ajView=Y&colorID='+document.getElementById('p_color').value+'&itemID='+window.document.cascade.elements['p_selecteditemID'].value,getPg,'Y',errPg);});
}

// add change percentage for whole screen
$('title').after('<script type="text/javascript" language="javascript" src="https://raw.github.com/ksuquix/userscript-tweaks/master/bricklink-subinclude.js"></script>');

if(window.location.pathname.indexOf('inventory_detail.asp')>0) {
    // trigger percentage change
    $('input[value="Submit Changes"]').after('<input type="text" name="quixblpercentages" id="quixblpercentages" value="" size="4" onchange="quixblsetpercentages();">');
    
    // add clicky to add another of this type dialog
    $('a[href*="catalogItem.asp\?P="]').each(function(){
	part = $(this).attr('href').match(/P=(\d+)/);
	if(part) {
	    $(this).after('&nbsp;<a href="/inventory_add.asp?a=p&itemID='+part[1]+'">(Add)</a>');
	}
    });
}

