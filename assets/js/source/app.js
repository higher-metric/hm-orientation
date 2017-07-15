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
            eventLocation: '9, 14', // Harris Center, University
            eventCategory: '6', // Orientation
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
