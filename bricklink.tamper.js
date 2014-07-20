// ==UserScript==
// @name           Bricklink Tweaks
// @namespace      https://github.com/ksuquix/userscript-tweaks
// @version        0.1.36
// @description    Add tweaks / features to bricklink
// @include        http://www.bricklink.com/*
// @require        http://code.jquery.com/jquery-1.10.2.min.js
// @run-at         document-end
// ==/UserScript==

// Chrome extensions are sandboxed.   This lets me use jQuery from Console
// $('title').after('<script type="text/javascript" language="javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>');
// (bricklink seems to include jquery now)
// add functions we want both inside and outside the sandbox
//$('title').after('<script type="text/javascript" language="javascript" src="https://raw.github.com/ksuquix/userscript-tweaks/master/bricklink-subinclude.js"></script>');
var oHead = document.getElementsByTagName('HEAD').item(0);
var oScript= document.createElement("script");
oScript.type = "text/javascript";
oScript.src="https://rawgit.com/ksuquix/userscript-tweaks/master/bricklink-subinclude.js";
oHead.appendChild( oScript);


// On Part catalog entry, add an "(Add)" link next to price guide that goes into inventory add dialog with
//    part and color set
if(window.location.pathname.indexOf('catalogItem.asp')>0 || window.location.pathname.indexOf('catalogItemInv.asp')>0 || window.location.pathname.indexOf('catalogList.asp')>0) { 
    $('a[href*=catalogPG\\.asp\\?]').each(function() {
	url = $(this).attr('href').
	    replace(/catalogPG.asp\?P=/,'inventory_add.asp?a=p&itemID=').
	    replace(/catalogPG.asp\?M=/,'inventory_add.asp?a=m&itemID=').
	    replace(/colorID=/,'p_color=');
	$(this).after('&nbsp;<a href="'+url+'">(Add)</a><!-- 1 -->');
    });
    $('a[href*=catalogItemInv\\.asp\\?S]').each(function() {
	url = $(this).attr('href').
	    replace(/catalogItemInv.asp\?S=/,'inventory_add.asp?a=s&itemID=').
	    replace(/colorID=/,'p_color=');
	$(this).after('&nbsp;-&nbsp;<a href="'+url+'">Add</a><!-- 2 -->');
    });	
    $('a[href*=catalogItem\\.asp\\?P]').each(function() {
	url = $(this).attr('href').
	    replace(/catalogItem.asp\?P=/,'inventory_add.asp?a=p&itemID=').
	    replace(/colorID=/,'p_color=');
	burl = $(this).attr('href').
	    replace(/www.bricklink.com.*P=/,'www.basebrick.com/listdata2.php?userid=1228&partnumber=').
	    replace(/colorID=\d*/,'');
	$(this).after('&nbsp;<a href="'+url+'">(Add)</a>&nbsp;<a href="'+burl+'">(BB)</a><!-- 3 -->');
    });	
    $('a[href*=catalogItem\\.asp\\?M]').each(function() {
	url = $(this).attr('href').
	    replace(/catalogItem.asp\?M=/,'inventory_add.asp?a=m&itemID=').
	    replace(/colorID=/,'p_color=');
	burl = $(this).attr('href').
	    replace(/www.bricklink.com.*M=/,'www.basebrick.com/listdata2.php?userid=1228&partnumber=').
	    replace(/colorID=\d*/,'');
	$(this).after('&nbsp;<a href="'+url+'">(Add)</a>&nbsp;<a href="'+burl+'">(BB)</a><!-- 4 -->');
    });	
}

// If inventory page, automatically trigger the price guide ajax pull
// also set a click rule on condition (new/used) to set it to the average value (new or used)
// also sets percentage to 10
// then focus to quantity
if(window.location.pathname.indexOf('inventory_add.asp')>0) { 


    // hide crap
$(document).ready(function() {

    // function to set values
    $('input:radio[name=invNew]').click(function() { quixblpriceguideavgset(); });
    if($('select#p_color').val()>0 || $('#p_color').attr('type')=='Hidden') {   // only query ajax if color set or if color hidden instead of selector (sets, minifigs)
	ajaxGet('priceGuideSummary.asp?a='+$('*[name=itemType]').val()+'&vcID=1&vatInc=N&ajView=Y&colorID='+document.getElementById('p_color').value+'&itemID='+window.document.cascade.elements['p_selecteditemID'].value,function(arf) {setTimeout('quixblpriceguideavgset()',100); getPg(arf);},'Y',errPg);
//	setTimeout('quixblpriceguideavgset()',1200);
    } 
    // reload ajax when color changes
    $('select#p_color').change(function() {
	ajaxGet('priceGuideSummary.asp?a='+$('*[name=itemType]').val()+'&vcID=1&vatInc=N&ajView=Y&colorID='+document.getElementById('p_color').value+'&itemID='+window.document.cascade.elements['p_selecteditemID'].value,function(arf) {setTimeout('quixblpriceguideavgset()',100); getPg(arf);},'Y',errPg);
//	setTimeout('quixblpriceguideavgset()',1200);
    });

$('p:contains(If you select a Part)').hide();
$('p:contains(The remarks field is only vis)').hide();
$('p:contains(You can switch back to the radio button)').hide();

$('font:contains(Select this option if you want)').hide();
$('font:contains(If you select to reserve)').hide();
$('font:contains(optional):not(:contains(Remarks))').hide();
$('table[cellpadding=0]:contains(Reserved For):not(:contains(Retain))').hide();
$('tr:contains(Stockroom):not(:contains(Retain))').hide();
$('table[cellpadding=0]:contains(Bind to Super):not(:contains(Category))').hide();

$('font:contains(Edit My Default)').hide();
$('p:contains(Please make sure)').hide();

$('font:contains(Select a category)').hide();
$('p:contains(Custom Item)').hide();
$('table:contains(Step 1):not(:contains(Category:))').hide();
$('table:contains(Sell Item):not(:contains(Category:))').hide();
$('table:contains(Category:):not(:contains(Number:))').hide();
$('td:contains(View Image):not(:contains(Number:))').hide();

$('tr:contains(Tiered):not(:contains(Price))').hide();
$('tr:contains(Bulk):not(:contains(Quantity))').hide();

$('font:contains(Read our ):not(:contains(Extended))').hide();

$('td').filter(function() { return $(this).html() === '&nbsp;'; }).hide();

$('textarea').attr('rows',1);

$('input[value="Reset Form"]').after(
'<a style="border: solid black 1px;" onclick="$(\'p\').show();$(\'font\').show();$(\'table\').show();$(\'tr\').show();$(\'td\').show();"> Show all stuff </a>');

    $('input[name=invSale]').val(10);
    $('input:radio[name=invNew]').focus(); // focus down the screen first, so we can focus up and get interesting stuff in the screen

    if($('select#p_color').val()<1) {   // no color set, try to set color first
	setTimeout(function() {
	    $('select#p_color').focus();
	    $('select#p_color').select();
	}, 200);
    } else {
	$('input[name=p_quantity]').focus();
    }
});

}

if(window.location.pathname.indexOf('inventory_detail.asp')>0) {
    // trigger percentage change
    $('input[value="Submit Changes"]').after('<input type="text" name="quixblpercentages" id="quixblpercentages" value="" size="4" onchange="quixblsetpercentages();">');
    // add clicky to add another of this type dialog
    $('a[href*="catalogItem.asp\?P="]').each(function(){
	part = $(this).attr('href').match(/P=(\d+)/);
	if(part) {
	    $(this).after('&nbsp;<a href="/inventory_add.asp?a=p&itemID='+part[1]+'">(Add)</a><!-- 5 -->');
	}
    });
}

if(window.location.pathname.indexOf('invSetEdit.asp')>0) {
    // trigger percentage change
    $('input[value="Verify Items"]').after('<input type="text" name="quixblpercentages" id="quixblpercentages" value="" size="4" onchange="quixblsetpercentagespartout();">');
}

if(window.location.pathname.indexOf('inventory_verify.asp')>0) {
    $('input[value="Add to Inventory"]').focus();
}
