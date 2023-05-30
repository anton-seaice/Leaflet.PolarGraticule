Leaflet.Graticule
=================

[![npm](https://img.shields.io/npm/v/leaflet-polar-graticule.svg)](https://www.npmjs.com/package/leaflet-polar-graticule)

Generate a graticule grid of latitude and longitude lines. The graticule inclues labels by default, and support for maps in polar projections.

<a href="http://blog.thematicmapping.org/2013/07/creating-graticule-with-leaflet.html">This is heavily based on the original L.Graticule plugin</a> and labels are provided using the <a href="https://github.com/makinacorpus/Leaflet.TextPath"> Leaflet Textpath</a> plugin.

## Usage

### `L.graticule(options)`

Create a new Graticule layer which inherits from `L.GeoJSON`. The following options have been added:

* `intervalLat`: the gap between each line of latitude, in degrees
* `intervalLon`: the gap between each line of longtitude, in degrees
* `latBounds`: the latitudes to draw the graticule over (default: [-90,90])
* `lngBounds`: the longitudes to draw the graitcule over (default: [-180,180])
* `centerLatLabels`: center labels along the graticule (default: true) 
* `centerLngLabels`: center labels along the graticule (default: false) 
* `style`: [path options](http://leafletjs.com/reference.html#path-options) for
  the generated lines

### Example

```js
// Add a basic graticule with divisions every 20 degrees
// as a layer on a map
L.graticule().addTo(map);

// Specify divisions every 10 degrees
L.graticule({ intervalLat: 10, intervalLng: 10 }).addTo(map);

// Specify bold red lines instead of thin grey lines
L.graticule({
    style: {
        color: '#f00',
        weight: 10
    }
}).addTo(map);
```

### Styling text labels
Text labels can be styled through css using the classname "grat-labels". These are <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element/text">SVG `<text>` elements</a>, so the styling is slightly different to normal `<p>` elements.

e.g., in your css file, to change the labels to grey:
```
.grat-labels {
  fill:gray
}
```

## Demos

For <a href="https://anton-seaice.github.io/Leaflet.PolarGraticule/examples/antarctic.html"> Antarctica</a>

For <a href="https://anton-seaice.github.io/Leaflet.PolarGraticule/examples/arctic.html"> Arctic</a>

## Installation

If you are using npm:

`npm install leaflet-polar-graticule`

Otherwise, its available through unpkg. In your html, add:

`<script src="https://unpkg.com/leaflet-polar-graticule@0.1.3/L.Graticule.min.js" integrity="sha384-1fxJBA/Bv+18dZEiq5gGATLItj7ivCqXGZkYTv9wAtP7ECoHY69fyFMc+YUcJkrk" crossorigin="anonymous"></script>`

## Advanced Use

If you don't like how the labels are displayed, you can specify a custom display function. (See onEachFeature in [L.Graticule.js](L.Graticule.js))

