# babel-tadpole

babel-tadpole is a small jQuery plugin that let you translate a webpage client side.  

## Install

## Automate language selection

When the page is loaded babel-tadpole use HTTP Accept-Language header to identified the prefered languages of the user, javascript can't read the http header by themself, so babel-tadpole call via ajax a service that returns a json with the http headers, thant match it against the list of avaible language and chose the best one. If the ajax call don't produce an answer, or there are any of the accept language in the avaible language list, babel-tadpole use the defaultLanguage option.  

## Limitation

In the context of web localization having a different page for different language is often better than having all the text in the same page and than change it by js/css, but sadly isn't always possible, babel-tadpole can help you when you can't have a page for every translation.    
When you want to adapt a website to different countries is better speak of localization o internationalization instead of translation (you can find more information on wikipedia [Website localization](http://en.wikipedia.org/wiki/Website_localization) ); to select the initial language babel-tadpole use the HTTP Accept-Language header, this header use always the ISO-639 language abbreviation (eg.: en, es, de, it) and often the ISO-3166 two letter country code (eg.: US, GB, ES, DE, IT), since country isn't always available babel-tadpole actually ignore everything after the second character, in a future release maybe will offer a system that can manage country code when specified.  


## The name

Is a reference to the Babel fish from the [The Hitchhiker's Guide to the Galaxy](http://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy).  