(function($) {

	$.fn.babelTadpole = function(options) {

		var settings = $.extend({},$.fn.babelTadpole.default , options);

		if(settings.autogenerateCSS){
			var style = generateCSS(settings);
			$(style).appendTo("head");
		}

		//detect user language by http header
		var match = matchAcceptLanguageWithAviableLanguages(settings);

		if(match !== false){
			setLanguage(settings, match, true);
		}else if(isAvaiableLanguage(settings, getBrowserLanguage())){
		    setLanguage(settings, getBrowserLanguage(), true);
		}else{
			setLanguage(settings, settings.defaultLanguage, true);
		}

		//change language by menu
		$(settings.languageSelector).click(function(e){
			e.preventDefault();
			language = $(this).attr(settings.languageSelectorAttribute);
			if(isAvaiableLanguage(settings, language)){
				setLanguage(settings, language);
			}
		});

		return this; 
	};

	var generateCSS = function(settings){
		var style = '';
		var styleTemplate = 'span.LANG{display: none;transition: display 0s !important;}' +
							'body.LANG span.LANG{display: inline;}';

		for (i = 0; i < settings.aviableLanguages.length; i++) {
		    style = style + styleTemplate.replace(/LANG/g, settings.aviableLanguages[i]) + "\n";
		}

		style = "<style>" + style + "</style>";
		return style;
	}

	var isAvaiableLanguage = function(settings, language){
		var isAvaiable = false;
		if($.inArray(language , settings.aviableLanguages ) > -1){
		    isAvaiable = true;
		}

		return isAvaiable;
	}

	var setLanguage = function(settings, language, isAutoSelect = false){
		$("body").removeClass(settings.aviableLanguages.join(" ")).addClass(language);
		if(isAutoSelect){
			settings.onLanguageAutomaticSelection.call(this);
		}
		settings.onLanguageChange.call(this);
	}

	var matchAcceptLanguageWithAviableLanguages = function(settings){
		var flagLanguageAutoSelected = false;

		$.ajax({
		  url: settings.service, 
		  dataType: 'jsonp',
		  success: function(headers) {
		      headerLanguages = headers['Accept-Language'].split(",");
		      languages = [];
		      for (index in headerLanguages ){
		          language = headerLanguages[index].substring(0,2).toLowerCase();
		          if(isAvaiableLanguage(settings, language)){
		              flagLanguageAutoSelected = true;
		              break;
		          }
		      }
		  }
		});

		if(!flagLanguageAutoSelected){
			return false;
		}
		
		return language;
	}

	var getBrowserLanguage = function(){
		browserLanguages = window.navigator.userLanguage || window.navigator.language;
		return browserLanguages.substring(0,2).toLowerCase();
	}

	$.fn.babelTadpole.default = {
		'defaultLanguage' : '',
		'aviableLanguages': [],
		'autogenerateCSS': true,
		'languageSelector': '.language-selection li a',
		'languageSelectorAttribute' : 'data-lang',
		'service' : 'https://ajaxhttpheaders1.appspot.com',

		//callback
		'onLanguageAutomaticSelection' : function(){},
		'onLanguageChange' : function(){}
	};
})( jQuery );