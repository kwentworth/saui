/* SITE AVENGER USER INTERFACE (SAUI) - JAVASCRIPT AND JQUERY UTILITY LIBRARY 
 * http://www.siteavenger.com/
 * 
 * 
 * Authored by: Saco Design, Inc.
 * License: MIT
 * 
 * 
 * */
/* REQUIRES - 
 * 
 * 
 * pjax
 * jQuery 
 * 
 * 
 * */

var sauiLib = function(){
	this.lastUpdate = 0;	//last update made by the user/mouse move
	this.checkInterval = null;
	this.timeOutInterval = null;
	this._sauiLoggedOutDialogShown = false; // only want to show one at a time ever
	this.continueworkingPrompt = true;
	
	
    this.uiSettings = {};//{imageOverlay : '/dddtheme/avenger-classic/img/loadingAnimationBig.gif'};	// result of /avenger/users/settings/
    
    this.attach();
}


sauiLib.prototype = {
    /**
     * Wrapper function for console.log that doesn't blow up IE
     */
	trimSpaces : function(str) {
		// Strips leading and trailing white space
		return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
	},
    
	attach : function() {
    	var self = this;
    	jQuery(document).ready(function() {
    		
    	});
    	
    	
     	
	}
}; // end of prototype


jQuery.fn.loadWith = function( url, callback ) {
    var toLoad = $(this);
    $.get(url, function( data ) {
        toLoad.replaceWith( data );
        if (callback != null && callback != undefined) {
            callback();
        }
    });
    
    return this;
}

/**
 * SAUI AJAX LOADER
 * Loads the specified url into a div, iframe, etc.
 */
jQuery.fn.sauiAjaxLoader = function (options) {
	var defaultOptions = {'image' : true, 'ignorePreloaded' : false};
	var options = $.extend(true, {}, defaultOptions, options); 
	
	if(sauiTools.isJqFormIframe()) {
		return this;
	}
	
	var $thisLoader = this;
	$thisLoader.addClass('saui-ajax-loading');

	var meta = this.metadata();
	if(typeof meta.preloaded != "undefined" && meta.preloaded && !options.ignorePreloaded) {
		//don't need to load... already loaded... now only update when forms submitted, etc.
		return this;
	}
	
	if(options.image == true) {
		var leftCoordinate = Math.floor(($thisLoader.outerWidth() - 220) /2) +'px';	//account for width of loading image (220px wide)
		var topCoordinate = Math.floor(($thisLoader.outerHeight() - 19) /2);	//account for width of loading image (19px high)
		if(topCoordinate < 10) {
			topCoordinate = 10;
		} else if (topCoordinate > 200) {
			topCoordinate = 200;
		}
		topCoordinate += 'px';
		sauiTools.$_loadingImage.css({'left': leftCoordinate, 'top': topCoordinate, 'position': 'absolute'});
		this.append(sauiTools.$_loadingImage);
	}
	
	if (typeof meta.source != "undefined" && meta.source.length && this.hasClass('saui-ajax-loader')) {
		var newDate = new Date().getTime();
		var actionUrl = meta.source + '?rnd_='+ newDate; ;
		this.load(actionUrl, function(responseText, textStatus, XMLHttpRequest) {
			if(textStatus == 'error') {
				//error, remove from dom.
				$thisLoader.html(responseText);
				sauiTools.fadeMessages();
			} else {
				sauiReloaderAttach($thisLoader);
				$('.saui-loader-hide', $thisLoader).hide();
				_sauiLoader({scope: $thisLoader});	
			}
			
			// update loading status via class for styling of UI
			$thisLoader.removeClass('saui-ajax-loading');
			$thisLoader.addClass('saui-ajax-loaded');
		});
	}
	
   return this;
}

jQuery.fn.center = function () {
    this.css("position","absolute");
    this.css("top", (($(window).height() - this.outerHeight()) / 2) + $(window).scrollTop() + "px");
    this.css("left", (($(window).width() - this.outerWidth()) / 2) + $(window).scrollLeft() + "px");
    return this;
}