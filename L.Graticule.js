import 'leaflet-textpath' ;

/*
 Graticule plugin for Leaflet powered maps.
*/
L.Graticule = L.GeoJSON.extend({

    options: {
        style: {
            color: '#333',
            weight: 1
        },
        intervalLat: 10 ,
        intervalLng: 10 ,
        latBounds:[-90,90],
        lngBounds:[-180,180] ,
        centerLatLabels: true ,
        centerLonLabels: false ,
        zIndex: 99999,
        onEachFeature: function (feature, layer) {
			if (feature.properties.name.match('W')) {
				layer.setText(
					feature.properties.name,
					{offset:-3, orientation:0, center: layer.options.centerLonLabels}
				);
			} else if (feature.properties.name.match('E')) {
                layer.setText(
					feature.properties.name,
					{offset:-3, orientation:180, center: layer.options.centerLonLabels}
				);
            }
            else if (feature.properties.name.match('S')) {
				layer.setText(
					feature.properties.name,
					{offset:-3, center: layer.options.centerLatLabels}
				);
			} else if (feature.properties.name.match('N')) {
				layer.setText(
					feature.properties.name,
					{offset:-3, center: layer.options.centerLatLabels}
				);
			}
        }   

    },

    initialize: function (options) {

        L.Util.setOptions(this, options);
        this.options.style={...this.options.style, interactive:false}
        this._layers = {};

        this.addData(this._getGraticule());
    },

    _getGraticule: function () {
        var features = []; 

        //round the starting point to a multiple of the lng interval
        let lng = this.options.intervalLng*Math.round(this.options.lngBounds[0]/this.options.intervalLng)

        // Meridians
        for (lng ; lng < this.options.lngBounds[1]; lng += this.options.intervalLng) {
            if (lng >=0) {
                features.push(this._getFeature(this._getMeridian(lng), {
                "name": (lng) ? lng.toString() + "° E" : "0° E"
                })); 
            }
            else if (lng < 0) {
                features.push(this._getFeature(this._getMeridian(lng), {
                    "name": (-lng).toString() + "° W"
                }));
            }
        }

        //round the starting point to a multiple of the lat interval
        let lat = this.options.intervalLat*Math.round(this.options.latBounds[0]/this.options.intervalLat)

        // Parallels
        for (lat; lat < this.options.latBounds[1]; lat = lat + this.options.intervalLat) {
            if (lat>=0) {
                features.push(this._getFeature(this._getParallel(lat), {
                    "name": (lat) ? lat.toString() + "° N" : "0° N"
                }));
            }
            else if (lat < 0) {
                features.push(this._getFeature(this._getParallel(lat), {
                    "name": (-lat).toString() + "° S"
                }));
            }
        }

        return {
            "type": "FeatureCollection",
            "features": features
        };
    },

    _getMeridian: function (lng) {
        lng = this._lngFix(lng);
        var coords = [];

        // for convenience with labelling, we are going to draw lines towards the poles
        if (this.options.latBounds[0]<-this.options.latBounds[1]) {
            // lines start at max and go towards the min (e.g.. from -30 towards -90)
            for (var lat = this.options.latBounds[1]; lat >= this.options.latBounds[0]; lat--) {
                coords.push([lng, lat]);
            }
        } else {
            // lines start at min and go towards max (e.g. from 0 towards 90)
            for (var lat = this.options.latBounds[0]; lat <= this.options.latBounds[1]; lat++) {
                coords.push([lng, lat]);
            }
        }
        return coords;
    },

    _getParallel: function (lat) {
        var coords = [];
        for (var lng = this.options.lngBounds[0]; lng <= this.options.lngBounds[1]; lng++) {
            coords.push([this._lngFix(lng), lat]);
        }
        return coords;
    },

    _getFeature: function (coords, prop) {
        return {
            "type": "Feature",
            "geometry": {
                "type": "LineString",
                "coordinates": coords
            },
            "properties": prop
        };
    },

    _lngFix: function (lng) {
        if (lng >= 180) return 179.999999;
        if (lng <= -180) return -179.999999;
        return lng;
    },

});

L.graticule = function (options) {
    return new L.Graticule(options);
};
