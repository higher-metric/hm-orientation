/**
 * App.js
 *
 * @since 1.0.0
 */
(function () {
	var bodyEl   = document.body,
	    content  = document.querySelector( '.content-wrap' ),
	    openbtn  = document.getElementById( 'open-button' ),
	    closebtn = document.getElementById( 'close-button' ),
	    isOpen   = false,
	    apiURL   = '/wp-json/wp/v2/events/?_embed&per_page=6';

	var events = new Vue( {
		el  : '#app',
		data: {
			eventLocation: '9, 14', // Harris Center, University
			eventCategory: '6', // Orientation
			eventsCount  : null,
			events       : null
		},

		created: function () {
			this.fetchData();
		},

		filters: {
			encode: function ( v ) {
				return v;
			}
		},

		methods: {
			fetchData: function () {
				var xhr  = new XMLHttpRequest();
				var self = this;
				var url  = apiURL;

				if ( self.eventLocation ) {
					url += '&event-location=' + self.eventLocation;
				}

				if ( self.eventCategory ) {
					url += '&event-category=' + self.eventCategory;
				}

				xhr.open( 'GET', url )
				xhr.onload = function () {
					self.events = JSON.parse( xhr.responseText );
					self.eventsCount = self.events.length;
				}
				xhr.send();
			}
		}
	} );

	function init() {
		initEvents();
	}

	function initEvents() {
		console.log( openbtn );
		console.log( closebtn );
		openbtn.addEventListener( 'click', toggleMenu );
		if ( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function ( ev ) {
			var target = ev.target;
			if ( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if ( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
			classie.remove( openbtn, 'is-active' );
		}
		else {
			classie.add( openbtn, 'is-active' );
			classie.add( bodyEl, 'show-menu' );
		}
		isOpen = !isOpen;
	}

	init();

})();


