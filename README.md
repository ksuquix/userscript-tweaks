userscript-tweaks
=================

userscript for various things


In Tampermonkey, here are some things you can do:

* Allow drag and drop
 + Set "Allow access to file URLs" in chrome::/extensions
* More config options (required for chrome sync, etc)
 + Tampermonkey->Settings->Config mode: Advanced
* Chrome sync
 + Tampermonkey->Settings->TESLA->chrome sync->save
 + settings->(bottom)->restart tampermonkey
 + click on the notification to enable sync
   
<a href="https://raw.github.com/ksuquix/userscript-tweaks/master/bricklink.tamper.js">Install</a>

* Setting up a clone to do dev:
 + git config filter.js.clean .git_filters/userscript-version
 + git config diff.js.clean .git_filters/userscript-version
* checking in
 + git commit ; git push ; git checkout HEAD .
* checking out
 + git pull ; git checkout HEAD

