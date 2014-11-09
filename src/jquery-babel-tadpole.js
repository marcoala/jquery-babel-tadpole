(function($) {
	$.fn.babelTadpole = function(options) {

		var settings = $.extend( {
			'defaultLanguage' : '',
			'aviableLanguages': [],
			'autogenerateCSS': true,
			'languageSelector': '.language-selection li a',
			'languageSelectorAttribute' : 'data-lang',
			'service' : 'https://ajaxhttpheaders1.appspot.com',

			//callback
			'onLanguageAutomaticSelection' : function(){},
			'onLanguageChange' : function(){}
		}, options);

		var flagLanguageAutoSelected = false;

		if(settings.autogenerateCSS){
			var style = '';
			var styleTemplate = 'span.LANG{display: none;transition: display 0s !important;}' +
								'body.LANG span.LANG{display: inline;}';

			for (i = 0; i < settings.aviableLanguages.length; i++) {
			    style = style + styleTemplate.replace(/LANG/g, settings.aviableLanguages[i]) + "\n";
			}

			style = "<style>" + style + "</style>";
			$(style).appendTo("head");
		}


		//detect user language by http header
		$.ajax({
		  url: settings.service, 
		  dataType: 'jsonp',
		  success: function(headers) {
		      headerLanguages = headers['Accept-Language'].split(",");
		      languages = [];
		      for (index in headerLanguages ){
		          language = headerLanguages[index].substring(0,2).toLowerCase();
		          if($.inArray(language , settings.aviableLanguages ) > -1){
		              $("body").removeClass(settings.aviableLanguages.join(" ")).addClass(language);
		              flagLanguageAutoSelected = true;
		              settings.onLanguageAutomaticSelection.call( this );
		              break;
		          }
		      }
		  }
		});

		//if http header method fails use browser language
		if(!flagLanguageAutoSelected){
			browserLanguages = window.navigator.userLanguage || window.navigator.language;
			language = browserLanguages.substring(0,2).toLowerCase();

			if($.inArray(language , settings.aviableLanguages ) > -1){
			    $("body").removeClass(settings.aviableLanguages.join(" ")).addClass(language);
			     settings.onLanguageAutomaticSelection.call( this );
			}
		}

		//change language by menu
		$(settings.languageSelector).click(function(e){
			e.preventDefault();
			language = $(this).attr(settings.languageSelectorAttribute);
			$("body").removeClass(settings.aviableLanguages.join(" ")).addClass(language);
			 settings.onLanguageChange.call( this );
		});

		return this; 
	};
})( jQuery );