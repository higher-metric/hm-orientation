/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

	'use strict';

	// class helper functions from bonzo https://github.com/ded/bonzo

	function classReg( className ) {
		return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
	}

	// classList support for class management
	// altho to be fair, the api sucks because it won't accept multiple classes at once
	var hasClass, addClass, removeClass;

	if ( 'classList' in document.documentElement ) {
		hasClass = function( elem, c ) {
			return elem.classList.contains( c );
		};
		addClass = function( elem, c ) {
			elem.classList.add( c );
		};
		removeClass = function( elem, c ) {
			elem.classList.remove( c );
		};
	}
	else {
		hasClass = function( elem, c ) {
			return classReg( c ).test( elem.className );
		};
		addClass = function( elem, c ) {
			if ( !hasClass( elem, c ) ) {
				elem.className = elem.className + ' ' + c;
			}
		};
		removeClass = function( elem, c ) {
			elem.className = elem.className.replace( classReg( c ), ' ' );
		};
	}

	function toggleClass( elem, c ) {
		var fn = hasClass( elem, c ) ? removeClass : addClass;
		fn( elem, c );
	}

	var classie = {
		// full names
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		toggleClass: toggleClass,
		// short names
		has: hasClass,
		add: addClass,
		remove: removeClass,
		toggle: toggleClass
	};

	// transport
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( classie );
	} else {
		// browser global
		window.classie = classie;
	}

})( window );

/**
 * App.js
 *
 * @since 1.0.0
 */
(function() {
    var eventsApiURL = '/wp-json/wp/v2/events/?_embed&per_page=6';

    var events = new Vue({
        el: '#app',
        data: {
            eventLocation: '14', // University
            eventCategory: '5, 6', // Orientation, Student Ambassadors
            eventsCount: null,
            events: null
        },

        created: function() {
            this.fetchEventData();
        },

        filters: {
            encode: function(v) {
                return v;
            }
        },

        methods: {
            fetchEventData: function() {
                var xhr = new XMLHttpRequest();
                var self = this;
                var url = eventsApiURL;

                if (self.eventLocation) {
                    url += '&event-location=' + self.eventLocation;
                }

                if (self.eventCategory) {
                    url += '&event-category=' + self.eventCategory;
                }

                xhr.open('GET', url)
                xhr.onload = function() {
                    var events = JSON.parse(xhr.responseText);

                    for (i = 0; i < events.length; i++) {
                        var locations = events[i]._embedded['wp:term'][0],
                            categories = events[i]._embedded['wp:term'][1];

                        if (locations[0]) {
                            events[i].location = locations[0].name;
                        }

                        if (categories[0]) {
                            events[i].category = categories[0].name;
                        }
                    }

                    self.events = events;

                    self.eventsCount = self.events.length;
                }
                xhr.send();
            },
        }
    });

})();
