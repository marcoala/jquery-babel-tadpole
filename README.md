# babel-tadpole

babel-tadpole is a small jQuery plugin that let you translate a webpage client side.  

The idea is to have all the translations in the DOM, and then use CSS to show only one at time, babel-tadpole will detect the prefered language and manage language change, it will only add/remove a class to the body element, the show/hide part is totally managed by the CSS, there are no loop through every elements of the page and this made the plugin realy light.  

This plugin is designed to have the smaller configuration possible, it will works only spcecifyng the language list and the default language. But with some other small operation you can make it work better, see best practise below.

## Automate language selection

When the page is loaded babel-tadpole use HTTP Accept-Language header to identified the preferred languages of the user, javascript can't read the http header by himself, so babel-tadpole call via ajax a service that returns a json with the http headers, then match it with the list of available language and chose the best one. If the ajax call don't produce an answer, or there aren't any of the accepted language in the available language list, babel-tadpole try to identify the browser interface language or will use the defaultLanguage option.  

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jquerybabel-tadpole.js"></script>
```

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.

## Basic Usage

Just install and set up the default language and the list of available language.  

```html
<script>
    $(function() {
        $().babelTadpole(
            {
                'defaultLanguage' : 'en',
                'aviableLanguages': [ 'en', 'it']
            }
        );
    });
</script>
```

To insert different translation into the page use span elements and mark it with the class attribute.

```html
<h1>
	<span class="it">Titolo</span>
	<span class="en">Title</span>
</h1>
```

To allow manually change of the language you can built a menu, the default one is an `ul` which contain an `a` element with the `data-lang` attribute that specify the new language, but you can build your own menu, see `languageSelector` and `languageSelectorAttribute` in the Options section below.  

```html
<ul class="language-selection">
    <li>
        <a href="#" data-lang="en">English</a>
    </li>
    <li>
        <a href="#" data-lang="it">Italiano</a>
    </li>
</ul>
```


## Options

key | default | description
----|---------|------------
`defaultLanguage` | `""` | The default language, use [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1)
`aviableLanguages` | `[]` | An array of available languages, use [ISO 639-1](http://en.wikipedia.org/wiki/ISO_639-1)
`autogenerateCSS` | true | Activate/deactivate the generation of the CSS needed to the plug in, (see best practise below)
`languageSelector` | `".language-selection li a"` | The selector of the elements that will change language when clicked
`languageSelectorAttribute` | `data-lang` | The attribute name of the previous element that contains the value of the new language
`service` | `"https://ajaxhttpheaders1.appspot.com"` | The service that will be called to have the content of the HTTP Accept-Language header

## Best Practise

### Deactivate the autogenerateCSS
This option was included to have a very simple configuration, on the other hand you should use the SASS or the LESS templates to generate the style needed and integrate it in your own CSS.  

### Add the defaultLanguage to your body as class
In the standard behavior the page will not show any translation until a language is detected, this time is usually very short, and a human will don't notice, but still exist, you can fix that simply adding to the body of your document the class relative to your default language, for the english:

```html
<body class="en">
```

## Limitation

In the context of web localization having a different page for different language is usually better than having all the text in the same page and than change it by js/css, but sadly isn't always possible, babel-tadpole can help you when you can't have a page for every translation.  
When you want to adapt a website to different countries is better speak of localization o internationalization instead of translation (you can find more information on wikipedia [Website localization](http://en.wikipedia.org/wiki/Website_localization) ); to select the initial language babel-tadpole use the HTTP Accept-Language header, this header use always the ISO-639 language abbreviation (eg.: en, es, de, it) and often the ISO-3166 two letter country code (eg.: US, GB, ES, DE, IT), since country isn't always available babel-tadpole actually ignore everything after the second character, so it can't distinguish between from UK and US.
In a future release maybe will offer a system that can manage country code when specified.  


## The name

Is a reference to the Babel fish from the [The Hitchhiker's Guide to the Galaxy](http://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy).  

## Support

If you have any problem or want to suggest a new feature open an Issue, if you want to contribute fork, modify it and make a pull request.  