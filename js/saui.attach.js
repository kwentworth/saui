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
 * meta   ****
 * 
 *  
 *  TODO: Load needed files
 * 
 * 
 * */

var sauiLib = function(){
	
    this.uiSettings = {};
    
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
	
	ajaxLoader : function(element, options) {
		var self = this;
		var defaultOptions = {'image' : false, 'ignorePreloaded' : false};
		var options = $.extend(true, {}, defaultOptions, options); 
	
		var $thisLoader = jQuery(element);
		$thisLoader.addClass('saui-ajax-loading');

		var meta = $thisLoader.metadata();
		if(typeof meta.preloaded != "undefined" && meta.preloaded && !options.ignorePreloaded) {
			//don't need to load... already loaded... now only update when forms submitted, etc.
			return;
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
			//sauiTools.$_loadingImage.css({'left': leftCoordinate, 'top': topCoordinate, 'position': 'absolute'});
			//$thisLoader.append(sauiTools.$_loadingImage);
		}
		
		if (typeof meta.source != "undefined" && meta.source.length && $thisLoader.hasClass('saui-ajax-loader')) {
			var newDate = new Date().getTime();
			var actionUrl = meta.source + '?rnd_='+ newDate; ;
			
			$thisLoader.load(actionUrl, function(responseText, textStatus, XMLHttpRequest) {
				if(textStatus == 'error') {
					//error, remove from dom.
					$thisLoader.html(responseText);
					sauiTools.fadeMessages();
				} else {
					//sauiReloaderAttach($thisLoader);
					$('.saui-loader-hide', $thisLoader).hide();
					self.loader({scope: $thisLoader});	
				}
				
				// update loading status via class for styling of UI
				$thisLoader.removeClass('saui-ajax-loading');
				$thisLoader.addClass('saui-ajax-loaded');
			});
		}
	},
	
	loader : function(options) {
		var self = this;
    	var defaultOptions = {'scope' : document, 'ignoreScope' : false};
        var options = jQuery.extend(true, {}, defaultOptions, options); 
        
        jQuery('.saui-ajax-loader', options.scope).each(function() {
        	self.ajaxLoader(this);
	    });
    	
    	// trigger an event so we know that reloaded has happened
    	// todo: migrate to this approach instead of _sauiLoader()
        jQuery(options.scope).trigger('sauiTools:loader');
    },
    
	attach : function() {
    	var self = this;
    	jQuery(document).ready(function() {
    		
    		// fire off the first loader at the 
    		self.loader(document);
    		
    	});
    	
    	
   	
   }
}; // end of prototype




var saui = new sauiLib();


