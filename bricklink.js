// ==UserScript==
// @name           Bricklink Tweaks
// @namespace      https://github.com/ksuquix/userscript-tweaks
// @version        0.0.2
// @description    Add tweaks / features to bricklink
// @include        http://www.bricklink.com/*
// @require        http://code.jquery.com/jquery-1.10.2.min.js
// @run-at         document-end
// ==/UserScript==

// Chrome extensions are sandboxed.   This lets me use jQuery from Console
$('title').after('<script type="text/javascript" language="javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>');

$('a[href*=catalogPG]').each(function() {
url = $(this).attr('href').replace(/catalogPG.asp\?P=/,'inventory_add.asp?a=p&itemID=').
	replace('/colorID=/','p_color=');
$(this).after('&nbsp;<a href="'+url+'">(Add)</a>');
});
